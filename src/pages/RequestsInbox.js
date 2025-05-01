import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingRequestId, setProcessingRequestId] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchRequests = async () => {
      try {
        setLoading(true);
        const requestCollection = collection(db, "requests");
        const q = query(
          requestCollection,
          where("receiver", "==", user.email),
          where("status", "==", "sent")
        );
        const snapshot = await getDocs(q);
        setRequests(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  const handleAccept = async (request) => {
    if (!user) return;
    setProcessingRequestId(request.id);

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

      await addDoc(collection(db, "notifications"), {
        sender: user.email,
        receiver: request.sender,
        message: `Your collaboration request for "${request.postTitle}" has been accepted! 🎉`,
        timestamp: new Date(),
      });

      setRequests((prev) => prev.filter((r) => r.id !== request.id));
    } catch (error) {
      console.error("Error accepting request:", error);
    } finally {
      setProcessingRequestId(null);
    }
  };

  const handleDecline = async (request) => {
    if (!user) return;
    setProcessingRequestId(request.id);

    try {
      await updateDoc(doc(db, "requests", request.id), { status: "declined" });

      await addDoc(collection(db, "notifications"), {
        sender: user.email,
        receiver: request.sender,
        message: `Your collaboration request for "${request.postTitle}" has been declined. ❌`,
        timestamp: new Date(),
      });

      setRequests((prev) => prev.filter((r) => r.id !== request.id));
    } catch (error) {
      console.error("Error declining request:", error);
    } finally {
      setProcessingRequestId(null);
    }
  };

  return (
    <div className="total-container">
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
                  <strong
                    className="clickable-sender"
                    onClick={() => navigate(`/team-member/${req.sender}`)}
                  >
                    {req.sender}
                  </strong>{" "}
                  wants to collaborate on <strong>{req.postTitle}</strong>
                </p>
                <div className="request-actions">
                  <button
                    className="accept-btn"
                    onClick={() => handleAccept(req)}
                    disabled={processingRequestId === req.id}
                  >
                    {processingRequestId === req.id
                      ? "Processing..."
                      : "Accept"}
                  </button>
                  <button
                    className="decline-btn"
                    onClick={() => handleDecline(req)}
                    disabled={processingRequestId === req.id}
                  >
                    {processingRequestId === req.id
                      ? "Processing..."
                      : "Decline"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsInbox;
