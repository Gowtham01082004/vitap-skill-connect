import React, { useEffect, useState } from "react";
import "./DiscussionForum.css";
import AskQuestionModal from "../components/DiscussionForum/AskQuestionModal";
import { useAuth } from "../context/AuthContext";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
  increment,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const DiscussionForum = () => {
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const { user } = useAuth();

  const fetchQuestions = async () => {
    const q = query(
      collection(db, "discussionPosts"),
      orderBy("postedAt", "desc")
    );
    const snapshot = await getDocs(q);

    const data = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const repliesSnap = await getDocs(
          collection(db, "discussionPosts", docSnap.id, "replies")
        );
        const repliesList = repliesSnap.docs.map((r) => ({
          id: r.id,
          ...r.data(),
        }));
        return { id: docSnap.id, ...docSnap.data(), repliesList };
      })
    );

    setQuestions(data);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handlePostQuestion = async (question) => {
    await addDoc(collection(db, "discussionPosts"), {
      ...question,
      email: user.email,
      userId: user.uid,
      username: user.username || "Anonymous",
      postedAt: serverTimestamp(),
      upvotes: 0,
      downvotes: 0,
      replies: 0,
    });
    fetchQuestions();
  };

  const handleVote = async (postId, type) => {
    const postRef = doc(db, "discussionPosts", postId);
    await updateDoc(postRef, { [type]: increment(1) });
    fetchQuestions();
  };

  const handleReplyVote = async (postId, replyId, type) => {
    const replyRef = doc(db, "discussionPosts", postId, "replies", replyId);
    await updateDoc(replyRef, { [type]: increment(1) });
    fetchQuestions();
  };

  const handleReply = async (postId) => {
    const replyData = {
      postId,
      content: replyText,
      repliedBy: user.username || "Anonymous",
      userId: user.uid,
      upvotes: 0,
      downvotes: 0,
      repliedAt: serverTimestamp(),
    };

    await addDoc(
      collection(db, "discussionPosts", postId, "replies"),
      replyData
    );

    const postRef = doc(db, "discussionPosts", postId);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      await updateDoc(postRef, { replies: increment(1) });
    }

    setReplyingTo(null);
    setReplyText("");
    fetchQuestions();
  };

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
          <input type="text" placeholder="Search discussions..." />
        </div>

        <div className="filter-tabs">
          <div className="filter-tab active">All</div>
          <div className="filter-tab">Answered</div>
          <div className="filter-tab">Unanswered</div>
          <div className="filter-tab">My Posts</div>
          <div className="filter-tab">Starred</div>
          <div
            className="filter-tab ask-btn"
            onClick={() => setShowModal(true)}
          >
            Ask
          </div>
        </div>

        <h2 className="section-title">Recent Discussions</h2>
        <div className="discussion-list">
          {questions.map((q) => (
            <div key={q.id} className="discussion-card visible">
              <div className="discussion-avatar">{q.username?.[0]}</div>
              <div className="discussion-content">
                <div className="tag-container">
                  <div className="tag red">{q.questionType}</div>
                  <div className="tag orange">{q.subTitle}</div>
                </div>
                <h3 className="discussion-title">{q.title}</h3>
                <p className="discussion-text">{q.summary}</p>
                <div className="discussion-meta">
                  Posted by {q.username} • {q.replies} replies
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
                    onClick={() => setReplyingTo(q.id)}
                  >
                    REPLY
                  </button>
                </div>

                {replyingTo === q.id && (
                  <div className="reply-input">
                    <textarea
                      placeholder="Write your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button onClick={() => handleReply(q.id)}>
                      Submit Reply
                    </button>
                  </div>
                )}

                <div className="replies-section">
                  {q.repliesList?.map((r) => (
                    <div key={r.id} className="reply-card">
                      <p className="reply-content">{r.content}</p>
                      <div className="reply-meta">
                        — {r.repliedBy} •{" "}
                        {r.repliedAt?.seconds
                          ? new Date(
                              r.repliedAt.seconds * 1000
                            ).toLocaleString()
                          : ""}
                      </div>
                      <div className="discussion-actions reply-actions">
                        <div
                          className="action-btn"
                          onClick={() => handleReplyVote(q.id, r.id, "upvotes")}
                        >
                          <div className="action-icon">↑</div>
                          <div className="action-text">{r.upvotes}</div>
                        </div>
                        <div
                          className="action-btn"
                          onClick={() =>
                            handleReplyVote(q.id, r.id, "downvotes")
                          }
                        >
                          <div className="action-icon">↓</div>
                          <div className="action-text">{r.downvotes}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fab visible" onClick={() => setShowModal(true)}>
          +
        </div>
      </div>

      {showModal && (
        <AskQuestionModal
          onClose={() => setShowModal(false)}
          onSubmit={handlePostQuestion}
          username={user.username}
        />
      )}
    </div>
  );
};

export default DiscussionForum;
