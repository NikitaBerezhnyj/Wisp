import React, { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import { Container } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { FaEdit } from "react-icons/fa";
import { RiUserFollowLine } from "react-icons/ri";
import { RiUserUnfollowLine } from "react-icons/ri";
import Post from "./Post";
import ProfileEdit from "./ProfileEdit";
import { getUserProfile, followUser, unfollowUser } from "../api/userApi";
import { getUserPosts } from "../api/postApi";
import { useLocation } from "react-router-dom";
import "../styles/components/Profile.css";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isAnotherUser, setIsAnotherUser] = useState(false);
  const [isOpenProfileEdit, setIsOpenProfileEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);
  const location = useLocation();
  const [isFollowingUser, setIsFollowingUser] = useState(false);

  const fetchUserPosts = async (userId, pageNumber) => {
    if (loadingRef.current) return; // Якщо вже триває завантаження
    loadingRef.current = true; // Встановлюємо, що триває завантаження

    try {
      const newPosts = await getUserPosts(userId, pageNumber);
      setUserPosts(prevPosts => [...prevPosts, ...newPosts]);
      setHasMore(newPosts.length > 0); // Перевірка, чи є ще пости
    } catch (error) {
      console.error("Error fetching user posts:", error);
    } finally {
      loadingRef.current = false; // Завантаження завершено
    }
  };

  const fetchUserProfileAndPosts = async usernameFromUrl => {
    try {
      const data = await getUserProfile(usernameFromUrl);

      // Отримуємо id поточного користувача (залегенованого)
      const currentUserId = getUserIdFromToken(); // Функція, яка повертає ID поточного користувача
      // Встановлюємо значення isFollowingUser в залежності від перевірки
      setIsFollowingUser(
        data.followers.some(followerId => followerId === currentUserId)
      );

      setProfileData(data);
      await fetchUserPosts(data.id, 1); // Завантажуємо лише першу сторінку постів
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const getUsernameFromUrl = () => {
    const url = window.location.href;
    const username = url.substring(url.lastIndexOf("/") + 1);
    return username;
  };

  const getUsernameFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.username;
    }
    return null;
  };

  useEffect(() => {
    const usernameFromToken = getUsernameFromToken();
    const usernameFromUrl = getUsernameFromUrl();
    setIsAnotherUser(usernameFromUrl !== usernameFromToken); // Перевірка, чи це інший користувач

    // Завантаження профілю та постів при зміні URL
    fetchUserProfileAndPosts(usernameFromUrl);
  }, [location.pathname]); // Залежність - зміна шляху

  useEffect(() => {
    if (profileData) {
      fetchUserPosts(profileData.id, page); // Завантажуємо пости при зміні сторінки
    }
  }, [page, profileData]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !loadingRef.current &&
        hasMore
      ) {
        setPage(prevPage => prevPage + 1); // Збільшуємо номер сторінки
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore]);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded._id; // Замість цього використовуйте ключ, який відповідає імені користувача в токені
    }
    return null;
  };

  const handleFollowUser = async () => {
    try {
      const userId = getUserIdFromToken();
      if (isFollowingUser == false) {
        await followUser(profileData.id, userId);
      } else {
        await unfollowUser(profileData.id, userId);
      }
      setIsFollowingUser(!isFollowingUser);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleEditClick = () => {
    setIsOpenProfileEdit(true); // Відкриття форми редагування
  };

  const handleCloseEdit = () => {
    setIsOpenProfileEdit(false); // Закриття форми редагування
  };

  const updateProfileData = updatedData => {
    setProfileData(prevData => ({
      ...prevData,
      ...updatedData
    }));
  };

  if (!profileData) {
    return <p>Loading profile...</p>;
  }

  return (
    <Container className="profile-container">
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
            <button
              className="profile-button-follow"
              onClick={handleFollowUser}
            >
              {!isFollowingUser ? (
                <>
                  Follow <RiUserFollowLine />
                </>
              ) : (
                <>
                  You following <RiUserUnfollowLine />
                </>
              )}
            </button>
          ) : (
            <button className="profile-button-edit" onClick={handleEditClick}>
              Edit Profile <FaEdit />
            </button>
          )}
        </div>
      </div>

      {isOpenProfileEdit && (
        <ProfileEdit
          profileData={profileData}
          onClose={handleCloseEdit}
          onUpdateProfile={updateProfileData}
        />
      )}

      <hr />
      <div className="profile-posts">
        <h2>Posts</h2>
        {userPosts && userPosts.length > 0 ? (
          userPosts.map((post, index) => <Post key={index} post={post} />)
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
