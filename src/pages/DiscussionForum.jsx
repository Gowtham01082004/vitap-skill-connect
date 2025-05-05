import React, { useEffect, useState } from "react";
import "./DiscussionForum.css";
import AskQuestionModal from "../components/DiscussionForum/AskQuestionModal";
import { useAuth } from "../context/AuthContext";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  where,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { v4 as uuidv4 } from "uuid";

const DiscussionForum = () => {
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [openReplies, setOpenReplies] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubOption, setSelectedSubOption] = useState("");
  const [loading, setLoading] = useState(true); // ✅ loader state
  const { user } = useAuth();

  const subOptions = {
    "Academic Issue": ["Course Registration", "Grading Queries"],
    "Technical Help": ["GitHub Issues", "VITAssist Portal"],
    "Career & Placement": ["Internships", "Certificates"],
  };

  const fetchQuestions = async () => {
    setLoading(true); // ✅ show loader
    try {
      const q = query(
        collection(db, "discussionQuestions"),
        orderBy("timestamp", "desc")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setQuestions(data);
    } catch (err) {
      console.error("Error fetching questions:", err);
    } finally {
      setLoading(false); // ✅ hide loader
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handlePostQuestion = async (question) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      let usernameToUse = "Anonymous";

      if (userSnap.exists()) {
        const userData = userSnap.data();
        usernameToUse = userData.username || userData.name || user.email;
      }

      const questionId = uuidv4();

      await addDoc(collection(db, "discussionQuestions"), {
        questionId: questionId,
        ...question,
        email: user.email,
        userId: user.uid,
        postedBy: usernameToUse,
        timestamp: serverTimestamp(),
        upvotes: 0,
        downvotes: 0,
      });

      fetchQuestions();
    } catch (err) {
      console.error("Error posting question:", err);
    }
  };

  const handleVote = async (docId, type) => {
    try {
      const postRef = doc(db, "discussionQuestions", docId);
      await updateDoc(postRef, { [type]: increment(1) });
      fetchQuestions();
    } catch (err) {
      console.error("Error voting on question:", err);
    }
  };

  const handleReplyVote = async (replyId, type) => {
    try {
      const replyRef = doc(db, "discussionAnswers", replyId);
      const voteRef = doc(db, "discussionAnswers", replyId, "votes", user.uid);

      const voteSnap = await getDoc(voteRef);
      if (voteSnap.exists()) {
        alert("You have already voted on this reply.");
        return;
      }

      await updateDoc(replyRef, { [type]: increment(1) });

      await setDoc(voteRef, {
        userId: user.uid,
        voteType: type,
        timestamp: serverTimestamp(),
      });

      const questionId = Object.keys(openReplies).find((key) =>
        openReplies[key].some((r) => r.id === replyId)
      );
      if (questionId) {
        loadReplies(questionId);
      }
    } catch (err) {
      console.error("Error voting on reply:", err);
    }
  };

  const handleReply = async (question) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      let repliedByToUse = "Anonymous";

      if (userSnap.exists()) {
        const userData = userSnap.data();
        repliedByToUse = userData.username || userData.name || user.email;
      }

      const replyData = {
        questionId: question.questionId,
        reply: replyText,
        repliedBy: repliedByToUse,
        userId: user.uid,
        upvotes: 0,
        downvotes: 0,
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, "discussionAnswers"), replyData);

      setReplyingTo(null);
      setReplyText("");
      await loadReplies(question.questionId);
    } catch (err) {
      console.error("Error submitting reply:", err);
    }
  };

  const loadReplies = async (questionId) => {
    try {
      if (openReplies[questionId]) {
        setOpenReplies((prev) => {
          const updated = { ...prev };
          delete updated[questionId];
          return updated;
        });
      } else {
        const q = query(
          collection(db, "discussionAnswers"),
          where("questionId", "==", questionId),
          orderBy("timestamp", "asc")
        );
        const snapshot = await getDocs(q);
        const repliesList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOpenReplies((prev) => ({ ...prev, [questionId]: repliesList }));
      }
    } catch (err) {
      console.error("Error loading replies:", err);
    }
  };

  const filteredQuestions = questions.filter((q) => {
    const lowerSearch = searchTerm.toLowerCase();

    if (searchTerm) {
      return (
        q.title?.toLowerCase().includes(lowerSearch) ||
        q.subTitle?.toLowerCase().includes(lowerSearch)
      );
    }

    if (selectedCategory && selectedSubOption) {
      return (
        q.questionType === selectedCategory && q.subTitle === selectedSubOption
      );
    }

    if (selectedCategory && !selectedSubOption) {
      return q.questionType === selectedCategory;
    }

    return true;
  });

  return (
    <div className="app-container">
      <div className="forum-container">
        <div className="forum-header">
          <h1>Discussion Forum</h1>
          <p>
            Ask questions, share knowledge, and collaborate with your peers.
          </p>
        </div>

        <div className="forum-search-bar">
          <div className="search-icon">🔍</div>
          <input
            type="text"
            placeholder="Search by title or subtitle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="dropdown-filters">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubOption("");
            }}
          >
            <option value="">Filter by Category</option>
            {Object.keys(subOptions).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {selectedCategory && (
            <select
              value={selectedSubOption}
              onChange={(e) => setSelectedSubOption(e.target.value)}
            >
              <option value="">All Sub-Options</option>
              {subOptions[selectedCategory].map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          )}
        </div>

        <h2 className="section-title">Recent Discussions</h2>
        <div className="discussion-list">
          {loading ? (
            <div className="loader">
              <div className="spinner"></div>
              <p>Loading discussions...</p>
            </div>
          ) : filteredQuestions.length === 0 ? (
            <p className="no-discussions">No discussions found.</p>
          ) : (
            filteredQuestions.map((q) => (
              <div key={q.id} className="discussion-card visible">
                <div className="discussion-avatar">{q.postedBy?.[0]}</div>
                <div className="discussion-content">
                  <div className="tag-container">
                    <div className="tag red">{q.questionType}</div>
                    <div className="tag orange">{q.subTitle}</div>
                  </div>
                  <h3 className="discussion-title">{q.title}</h3>
                  <p className="discussion-text">{q.summary}</p>
                  <div className="discussion-meta">
                    Posted by {q.postedBy} •{" "}
                    {q.timestamp?.seconds
                      ? new Date(q.timestamp.seconds * 1000).toLocaleString()
                      : ""}
                  </div>

                  <div className="discussion-actions">
                    <div
                      className="action-btn"
                      onClick={() => handleVote(q.id, "upvotes")}
                    >
                      <div className="action-icon">↑</div>
                      <div className="action-text">{q.upvotes}</div>
                    </div>
                    <div
                      className="action-btn"
                      onClick={() => handleVote(q.id, "downvotes")}
                    >
                      <div className="action-icon">↓</div>
                      <div className="action-text">{q.downvotes}</div>
                    </div>
                    <button
                      className="reply-btn"
                      onClick={() => setReplyingTo(q)}
                    >
                      REPLY
                    </button>
                    <button
                      className="reply-btn"
                      onClick={() => loadReplies(q.questionId)}
                    >
                      {openReplies[q.questionId]
                        ? "Hide Replies"
                        : "Show Replies"}
                    </button>
                  </div>

                  {replyingTo?.id === q.id && (
                    <div className="reply-input">
                      <textarea
                        placeholder="Write your reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <button onClick={() => handleReply(q)}>
                        Submit Reply
                      </button>
                    </div>
                  )}

                  {openReplies[q.questionId] && (
                    <div className="replies-section">
                      {openReplies[q.questionId].map((r) => (
                        <div key={r.id} className="reply-card">
                          <p className="reply-content">{r.reply}</p>
                          <div className="reply-meta">
                            — {r.repliedBy} •{" "}
                            {r.timestamp?.seconds
                              ? new Date(
                                  r.timestamp.seconds * 1000
                                ).toLocaleString()
                              : ""}
                          </div>
                          <div className="discussion-actions reply-actions">
                            <div
                              className="action-btn"
                              onClick={() => handleReplyVote(r.id, "upvotes")}
                            >
                              <div className="action-icon">↑</div>
                              <div className="action-text">{r.upvotes}</div>
                            </div>
                            <div
                              className="action-btn"
                              onClick={() => handleReplyVote(r.id, "downvotes")}
                            >
                              <div className="action-icon">↓</div>
                              <div className="action-text">{r.downvotes}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="fab visible" onClick={() => setShowModal(true)}>
          +
        </div>
      </div>

      {showModal && (
        <AskQuestionModal
          onClose={() => setShowModal(false)}
          onSubmit={handlePostQuestion}
        />
      )}
    </div>
  );
};

export default DiscussionForum;
