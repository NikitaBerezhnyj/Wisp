import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { FaEdit } from "react-icons/fa";
import { RiUserFollowLine } from "react-icons/ri";
import Post from "./Post";
import { getUserProfile } from "../api/userApi";
import "../styles/components/Profile.css";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [isAnotherUser, setIsAnotherUser] = useState(false);

  const getUsernameFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.username;
    }
    return null;
  };

  const getUsernameFromUrl = () => {
    const url = window.location.href;
    const username = url.substring(url.lastIndexOf("/") + 1);
    return username;
  };

  // Отримання username з токена та URL
  const usernameFromToken = getUsernameFromToken();
  const usernameFromUrl = getUsernameFromUrl();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (usernameFromUrl) {
          const data = await getUserProfile(usernameFromUrl);
          setProfileData(data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchUserProfile();

    // Перевірка, чи є користувач іншого типу
    setIsAnotherUser(usernameFromUrl !== usernameFromToken);
  }, [usernameFromUrl, usernameFromToken]);

  if (!profileData) {
    return <p>Loading profile...</p>;
  }

  return (
    <Container className="profile">
      <div className="profile-header">
        <div className="profile-avatar-container">
          <img
            src={profileData.avatarImage || "/img/portrait.jpg"}
            alt="User Avatar"
            className="profile-avatar"
          />
        </div>
        <div className="profile-details">
          <div className="profile-username">
            <h2>{profileData.username}</h2>
          </div>
          <div className="profile-stats">
            <p>
              <strong>{profileData.postsCount} </strong>Posts
            </p>
            <p>
              <strong>{profileData.followersCount} </strong>Followers
            </p>
            <p>
              <strong>{profileData.followingCount} </strong>Following
            </p>
          </div>
          <div className="profile-about">
            <p>{profileData.about || "No bio available"}</p>
          </div>
        </div>
        <div className="profile-actions">
          {isAnotherUser ? (
            <button className="profile-button-follow">
              Follow <RiUserFollowLine />
            </button>
          ) : (
            <button className="profile-button-edit">
              Edit Profile <FaEdit />
            </button>
          )}
        </div>
      </div>
      <hr />
      <div className="profile-posts">
        <h2>Posts</h2>
        {profileData.posts && profileData.posts.length > 0 ? (
          profileData.posts.map((post, index) => (
            <Post key={index} post={post} />
          ))
        ) : (
          <h3 className="profile-post-no-post">
            There are no posts yet. <br />
            {isAnotherUser
              ? "You just have to wait :("
              : "You can create the first one ;)"}
          </h3>
        )}
      </div>
    </Container>
  );
}
