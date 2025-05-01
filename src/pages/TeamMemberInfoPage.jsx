import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import "./TeamMemberInfoPage.css";

const TeamMemberInfoPage = () => {
  const { email } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [createdProjects, setCreatedProjects] = useState([]);
  const [joinedProjects, setJoinedProjects] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const userQuery = await getDocs(collection(db, "users"));
      const userDoc = userQuery.docs.find((doc) => doc.data().email === email);
      if (userDoc) {
        setUserData({ id: userDoc.id, ...userDoc.data() });
      }
    };

    const fetchProjects = async () => {
      const postsSnapshot = await getDocs(collection(db, "posts"));
      const posts = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCreatedProjects(posts.filter((post) => post.userEmail === email));
      setJoinedProjects(
        posts.filter((post) => post.collaborators?.includes(email))
      );
    };

    const checkFollowStatus = async () => {
      if (user && user.email !== email) {
        const userDocs = await getDocs(collection(db, "users"));
        const currentUser = userDocs.docs.find(
          (doc) => doc.data().email === user.email
        );
        const profileUser = userDocs.docs.find(
          (doc) => doc.data().email === email
        );
        if (currentUser && profileUser) {
          const followingDocRef = doc(
            db,
            "users",
            currentUser.id,
            "following",
            profileUser.id
          );
          const followingDoc = await getDoc(followingDocRef);
          setIsFollowing(followingDoc.exists());
        }
      }
    };

    const fetchFollowerFollowingCounts = async () => {
      const userQuery = await getDocs(collection(db, "users"));
      const profileUser = userQuery.docs.find(
        (doc) => doc.data().email === email
      );
      if (profileUser) {
        const followersSnapshot = await getDocs(
          collection(db, "users", profileUser.id, "followers")
        );
        const followingSnapshot = await getDocs(
          collection(db, "users", profileUser.id, "following")
        );
        setFollowerCount(followersSnapshot.size);
        setFollowingCount(followingSnapshot.size);
      }
    };

    fetchUserData();
    fetchProjects();
    checkFollowStatus();
    fetchFollowerFollowingCounts();
  }, [email, user]);

  const handleFollowToggle = async () => {
    const userQuery = await getDocs(collection(db, "users"));
    const currentUserDoc = userQuery.docs.find(
      (doc) => doc.data().email === user.email
    );
    const profileUserDoc = userQuery.docs.find(
      (doc) => doc.data().email === email
    );

    if (currentUserDoc && profileUserDoc) {
      const followingRef = doc(
        db,
        "users",
        currentUserDoc.id,
        "following",
        profileUserDoc.id
      );
      const followerRef = doc(
        db,
        "users",
        profileUserDoc.id,
        "followers",
        currentUserDoc.id
      );

      if (isFollowing) {
        await deleteDoc(followingRef);
        await deleteDoc(followerRef);
        setIsFollowing(false);
        setFollowerCount((prev) => prev - 1);
      } else {
        await setDoc(followingRef, { email: profileUserDoc.data().email });
        await setDoc(followerRef, { email: currentUserDoc.data().email });
        setIsFollowing(true);
        setFollowerCount((prev) => prev + 1);
      }
    }
  };

  const handleProjectClick = (project) => {
    const isJoined =
      project.userEmail === user.email ||
      (project.collaborators || []).includes(user.email);
    navigate(
      isJoined
        ? `/complete_accept_project/${project.id}`
        : `/post/${project.id}`
    );
  };

  if (!userData) return <div className="member-info-container">Loading...</div>;

  return (
    <div className="container">
      <div className="profile-header">
        <div className="avatar">
          {userData.name
            ? userData.name[0].toUpperCase()
            : email[0].toUpperCase()}
        </div>
        <div className="profile-info">
          <h2 className="username">{userData.name || email.split("@")[0]}</h2>
          <p className="email">{userData.email}</p>
        </div>
        {user && user.email !== email && (
          <button className="action-button" onClick={handleFollowToggle}>
            {isFollowing ? "Following" : "Follow"}
          </button>
        )}
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat-value">{createdProjects.length}</div>
          <div className="stat-label">Projects</div>
        </div>
        <div className="stat">
          <div className="stat-value">{followerCount}</div>
          <div className="stat-label">Followers</div>
        </div>
        <div className="stat">
          <div className="stat-value">{followingCount}</div>
          <div className="stat-label">Following</div>
        </div>
      </div>

      <div className="profile-details">
        <div className="detail">
          <div className="detail-label">Department:</div>
          <div className="detail-value">{userData.department}</div>
        </div>
        <div className="detail">
          <div className="detail-label">Year:</div>
          <div className="detail-value">{userData.year}</div>
        </div>
        <div className="detail">
          <div className="detail-label">Primary Skills:</div>
          <div className="detail-value">
            {Array.isArray(userData.primarySkills)
              ? userData.primarySkills.map((s, i) => (
                  <span key={i} className="tag">
                    {s}
                  </span>
                ))
              : userData.primarySkills || "N/A"}
          </div>
        </div>
        <div className="detail">
          <div className="detail-label">Preferred Categories:</div>
          <div className="detail-value">
            {Array.isArray(userData.projectCategories)
              ? userData.projectCategories.map((cat, i) => (
                  <span key={i} className="tag">
                    {cat}
                  </span>
                ))
              : userData.projectCategories || "N/A"}
          </div>
        </div>
      </div>

      <div className="project-list">
        <h2 className="section-title">Created Projects</h2>
        {createdProjects.length > 0 ? (
          createdProjects.map((proj) => (
            <div
              key={proj.id}
              className="project-card"
              onClick={() => handleProjectClick(proj)}
            >
              <h3 className="project-title">{proj.title}</h3>
            </div>
          ))
        ) : (
          <div className="empty-state">No created projects.</div>
        )}
      </div>

      <div className="project-list">
        <h2 className="section-title">Joined Projects</h2>
        {joinedProjects.length > 0 ? (
          joinedProjects.map((proj) => (
            <div
              key={proj.id}
              className="project-card"
              onClick={() => handleProjectClick(proj)}
            >
              <h3 className="project-title">{proj.title}</h3>
            </div>
          ))
        ) : (
          <div className="empty-state">No joined projects.</div>
        )}
      </div>
    </div>
  );
};

export default TeamMemberInfoPage;
