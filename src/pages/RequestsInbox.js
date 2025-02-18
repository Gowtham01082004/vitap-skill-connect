import React, { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  addDoc,
  where,
  query,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import "./RequestsInbox.css";

const RequestsInbox = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingRequestId, setProcessingRequestId] = useState(null);

  useEffect(() => {
    let isMounted = true; // ✅ Prevents updates on unmounted component

    const fetchRequests = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const requestCollection = collection(db, "requests");
        const q = query(requestCollection, where("receiver", "==", user.email));
        const snapshot = await getDocs(q);

        if (isMounted) {
          setRequests(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRequests();

    return () => {
      isMounted = false; // ✅ Cleanup function to prevent memory leaks
    };
  }, [user]);

  // 🔹 Accept Request & Send Notification
  const handleAccept = async (request) => {
    if (!user) return;
    setProcessingRequestId(request.id); // ✅ Prevent multiple clicks

    try {
      const postRef = doc(db, "posts", request.postId);
      const postDoc = await getDoc(postRef);

      if (postDoc.exists()) {
        const postData = postDoc.data();
        await updateDoc(postRef, {
          collaborators: [...(postData.collaborators || []), request.sender],
        });
      }

      await updateDoc(doc(db, "requests", request.id), { status: "accepted" });

      // ✅ Send Notification to Requesting User
      await addDoc(collection(db, "notifications"), {
        sender: user.email, // Post owner
        receiver: request.sender, // Requesting user
        message: `Your collaboration request for "${request.postTitle}" has been accepted! 🎉`,
        timestamp: new Date(),
      });

      // ✅ Update UI
      setRequests((prevRequests) =>
        prevRequests.filter((r) => r.id !== request.id)
      );
    } catch (error) {
      console.error("Error accepting request:", error);
    } finally {
      setProcessingRequestId(null);
    }
  };

  // 🔹 Decline Request & Send Notification
  const handleDecline = async (request) => {
    if (!user) return;
    setProcessingRequestId(request.id); // ✅ Prevent multiple clicks

    try {
      await updateDoc(doc(db, "requests", request.id), { status: "declined" });

      // ✅ Send Notification to Requesting User
      await addDoc(collection(db, "notifications"), {
        sender: user.email,
        receiver: request.sender,
        message: `Your collaboration request for "${request.postTitle}" has been declined. ❌`,
        timestamp: new Date(),
      });

      // ✅ Update UI
      setRequests((prevRequests) =>
        prevRequests.filter((r) => r.id !== request.id)
      );
    } catch (error) {
      console.error("Error declining request:", error);
    } finally {
      setProcessingRequestId(null);
    }
  };

  return (
    <div className="requests-inbox-container">
      <h2>Requests Inbox</h2>

      {loading ? (
        <p>Loading requests...</p>
      ) : requests.length === 0 ? (
        <p>No new collaboration requests.</p>
      ) : (
        <div className="requests-list">
          {requests.map((req) => (
            <div key={req.id} className="request-card">
              <p>
                <strong>{req.sender}</strong> wants to collaborate on{" "}
                <strong>{req.postTitle}</strong>
              </p>
              <div className="request-actions">
                <button
                  className="accept-btn"
                  onClick={() => handleAccept(req)}
                  disabled={processingRequestId === req.id}
                >
                  {processingRequestId === req.id ? "Processing..." : "Accept"}
                </button>
                <button
                  className="decline-btn"
                  onClick={() => handleDecline(req)}
                  disabled={processingRequestId === req.id}
                >
                  {processingRequestId === req.id ? "Processing..." : "Decline"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestsInbox;
