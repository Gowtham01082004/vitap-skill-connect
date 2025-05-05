import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import "./CompleteProjectView.css";
import LoadingScreen from "../components/LoadingScreen";

const CompleteProjectView = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [projectLoading, setProjectLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setProjectLoading(true);
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProject({ id: docSnap.id, ...docSnap.data() });
      }
      setProjectLoading(false);
    };

    fetchProject();
  }, [id]);

  useEffect(() => {
    const q = query(
      collection(db, "posts", id, "chat"),
      orderBy("timestamp", "asc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, [id]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    await addDoc(collection(db, "posts", id, "chat"), {
      text: newMessage,
      sender: user.email,
      timestamp: serverTimestamp(),
    });
    setNewMessage("");
  };

  const isAllowed =
    project &&
    user &&
    (project.userEmail === user.email ||
      (project.collaborators || []).includes(user.email));

  if (projectLoading) return <LoadingScreen />;

  return (
    <main className="cpv-container">
      <div className="cpv-card">
        <h2 className="cpv-title">{project.title}</h2>
        <p className="cpv-description">{project.fullDescription}</p>

        <div className="cpv-meta">
          <div>
            <label>📅 Duration:</label> <span>{project.duration}</span>
          </div>
          <div>
            <label>📂 Domain:</label>{" "}
            {project.domain.map((d, i) => (
              <span className="cpv-badge" key={i}>
                {d}
              </span>
            ))}
          </div>
          <div>
            <label>👥 Team Size:</label> <span>{project.teamSize}</span>
          </div>
        </div>
      </div>

      <div className="cpv-roles">
        <h3 className="cpv-section-title">Roles</h3>
        {project.roles.map((role, index) => (
          <div className="cpv-role-card" key={index}>
            <span className="cpv-role-icon">🛠️</span>
            <div>
              <div className="cpv-role-name">{role.title}</div>
              <div className="cpv-role-count">Required: {role.count}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="cpv-team">
        <h3 className="cpv-section-title">Team Members</h3>
        {[project.userEmail, ...(project.collaborators || [])].map(
          (email, i) => (
            <Link
              to={`/team-member/${encodeURIComponent(email)}`}
              key={i}
              className="cpv-member"
            >
              <div className="cpv-member-avatar">
                {email.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="cpv-member-email">{email}</div>
                <div className="cpv-member-role">Contributor</div>
              </div>
            </Link>
          )
        )}
      </div>

      <div className="cpv-chat">
        <h3 className="cpv-section-title">💬 Group Chat</h3>
        {isAllowed ? (
          <>
            <div className="cpv-chat-box">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`cpv-message ${
                    msg.sender === user.email ? "cpv-sent" : "cpv-received"
                  }`}
                >
                  <div className="cpv-message-meta">
                    <span>{msg.sender}</span>
                    <span>
                      {msg.timestamp?.toDate().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="cpv-message-text">{msg.text}</div>
                </div>
              ))}
            </div>
            <div className="cpv-chat-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        ) : (
          <p className="cpv-note">
            Only collaborators and the creator can view the chat.
          </p>
        )}
      </div>
    </main>
  );
};

export default CompleteProjectView;
