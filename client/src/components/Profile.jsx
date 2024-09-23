// // // // // import React, { useState, useEffect } from "react";
// // // // // import { Container } from "react-bootstrap";
// // // // // import { jwtDecode } from "jwt-decode";
// // // // // import { FaEdit } from "react-icons/fa";
// // // // // import { RiUserFollowLine } from "react-icons/ri";
// // // // // import Post from "./Post";
// // // // // import ProfileEdit from "./ProfileEdit";
// // // // // import { getUserProfile, getUserPosts } from "../api/userApi";
// // // // // import "../styles/components/Profile.css";

// // // // // export default function Profile() {
// // // // //   const [profileData, setProfileData] = useState(null);
// // // // //   const [isAnotherUser, setIsAnotherUser] = useState(false);
// // // // //   const [isOpenProfileEdit, setIsOpenProfileEdit] = useState(false);

// // // // //   const handleEditClick = () => {
// // // // //     setIsOpenProfileEdit(true); // Відкриття форми редагування
// // // // //   };

// // // // //   const handleCloseEdit = () => {
// // // // //     setIsOpenProfileEdit(false); // Закриття форми редагування
// // // // //   };

// // // // //   const getUsernameFromToken = () => {
// // // // //     const token = localStorage.getItem("token");
// // // // //     if (token) {
// // // // //       const decoded = jwtDecode(token);
// // // // //       return decoded.username;
// // // // //     }
// // // // //     return null;
// // // // //   };

// // // // //   const getIdFromToken = () => {
// // // // //     const token = localStorage.getItem("token");
// // // // //     if (token) {
// // // // //       const decoded = jwtDecode(token);
// // // // //       return decoded._id;
// // // // //     }
// // // // //     return null;
// // // // //   };

// // // // //   const getUsernameFromUrl = () => {
// // // // //     const url = window.location.href;
// // // // //     const username = url.substring(url.lastIndexOf("/") + 1);
// // // // //     return username;
// // // // //   };

// // // // //   const usernameFromToken = getUsernameFromToken();
// // // // //   const usernameFromUrl = getUsernameFromUrl();

// // // // //   useEffect(() => {
// // // // //     const fetchUserProfile = async () => {
// // // // //       try {
// // // // //         if (usernameFromUrl) {
// // // // //           const data = await getUserProfile(usernameFromUrl);
// // // // //           setProfileData(data);
// // // // //         }
// // // // //       } catch (error) {
// // // // //         console.error("Error fetching profile data:", error);
// // // // //       }
// // // // //     };

// // // // //     fetchUserProfile();
// // // // //     setIsAnotherUser(usernameFromUrl !== usernameFromToken);
// // // // //   }, [usernameFromUrl, usernameFromToken]);

// // // // //   const updateProfileData = updatedData => {
// // // // //     setProfileData(prevData => ({
// // // // //       ...prevData,
// // // // //       ...updatedData
// // // // //     }));
// // // // //   };

// // // // //   if (!profileData) {
// // // // //     return <p>Loading profile...</p>;
// // // // //   }

// // // // //   return (
// // // // //     <Container className="profile">
// // // // //       <div className="profile-header">
// // // // //         <div className="profile-avatar-container">
// // // // //           <img
// // // // //             src={profileData.avatarImage || "/img/portrait.jpg"}
// // // // //             alt="User Avatar"
// // // // //             className="profile-avatar"
// // // // //           />
// // // // //         </div>
// // // // //         <div className="profile-details">
// // // // //           <div className="profile-username">
// // // // //             <h2>{profileData.username}</h2>
// // // // //           </div>
// // // // //           <div className="profile-stats">
// // // // //             <p>
// // // // //               <strong>{profileData.postsCount} </strong>Posts
// // // // //             </p>
// // // // //             <p>
// // // // //               <strong>{profileData.followersCount} </strong>Followers
// // // // //             </p>
// // // // //             <p>
// // // // //               <strong>{profileData.followingCount} </strong>Following
// // // // //             </p>
// // // // //           </div>
// // // // //           <div className="profile-about">
// // // // //             <p>{profileData.about || "No bio available"}</p>
// // // // //           </div>
// // // // //         </div>
// // // // //         <div className="profile-actions">
// // // // //           {isAnotherUser ? (
// // // // //             <button className="profile-button-follow">
// // // // //               Follow <RiUserFollowLine />
// // // // //             </button>
// // // // //           ) : (
// // // // //             <button className="profile-button-edit" onClick={handleEditClick}>
// // // // //               Edit Profile <FaEdit />
// // // // //             </button>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>

// // // // //       {isOpenProfileEdit && (
// // // // //         <ProfileEdit
// // // // //           profileData={profileData}
// // // // //           onClose={handleCloseEdit}
// // // // //           onUpdateProfile={updateProfileData} // Передаємо функцію оновлення
// // // // //         />
// // // // //       )}

// // // // //       <hr />
// // // // //       <div className="profile-posts">
// // // // //         <h2>Posts</h2>
// // // // //         {profileData.posts && profileData.posts.length > 0 ? (
// // // // //           profileData.posts.map((post, index) => (
// // // // //             <Post key={index} post={post} />
// // // // //           ))
// // // // //         ) : (
// // // // //           <h3 className="profile-post-no-post">
// // // // //             There are no posts yet. <br />
// // // // //             {isAnotherUser
// // // // //               ? "You just have to wait :("
// // // // //               : "You can create the first one ;)"}
// // // // //           </h3>
// // // // //         )}
// // // // //       </div>
// // // // //     </Container>
// // // // //   );
// // // // // }

// // // // import React, { useState, useEffect, useRef } from "react";
// // // // import { debounce } from "lodash";
// // // // import { Container } from "react-bootstrap";
// // // // import { jwtDecode } from "jwt-decode";
// // // // import { FaEdit } from "react-icons/fa";
// // // // import { RiUserFollowLine } from "react-icons/ri";
// // // // import Post from "./Post";
// // // // import ProfileEdit from "./ProfileEdit";
// // // // import { getUserProfile } from "../api/userApi";
// // // // import { getUserPosts } from "../api/postApi";
// // // // import "../styles/components/Profile.css";

// // // // export default function Profile() {
// // // //   const [profileData, setProfileData] = useState(null);
// // // //   const [userPosts, setUserPosts] = useState([]);
// // // //   const [isAnotherUser, setIsAnotherUser] = useState(false);
// // // //   const [isOpenProfileEdit, setIsOpenProfileEdit] = useState(false);
// // // //   const [page, setPage] = useState(1);
// // // //   const [hasMore, setHasMore] = useState(true);
// // // //   const loadingRef = useRef(false);

// // // //   const fetchUserPosts = async pageNumber => {
// // // //     if (loadingRef.current) return; // Якщо вже триває завантаження
// // // //     loadingRef.current = true; // Встановлюємо, що триває завантаження

// // // //     try {
// // // //       const userId = profileData.id;
// // // //       const newPosts = await getUserPosts(userId, pageNumber);
// // // //       setUserPosts(prevPosts => [...prevPosts, ...newPosts]);
// // // //       setHasMore(newPosts.length > 0); // Перевірка, чи є ще пости
// // // //     } catch (error) {
// // // //       console.error("Error fetching user posts:", error);
// // // //     } finally {
// // // //       loadingRef.current = false; // Завантаження завершено
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     const fetchUserProfileAndPosts = async () => {
// // // //       try {
// // // //         const usernameFromUrl = getUsernameFromUrl(); // Отримання username з URL
// // // //         if (usernameFromUrl) {
// // // //           const data = await getUserProfile(usernameFromUrl);
// // // //           setProfileData(data);

// // // //           const userId = getIdFromToken(); // Отримуємо ID користувача з токена
// // // //           const posts = await getUserPosts(userId, 1); // Завантажуємо лише першу сторінку постів
// // // //           setUserPosts(posts);
// // // //         }
// // // //       } catch (error) {
// // // //         console.error("Error fetching profile data:", error);
// // // //       }
// // // //     };

// // // //     fetchUserProfileAndPosts();
// // // //   }, []); // Залежність порожня, виконується один раз

// // // //   useEffect(() => {
// // // //     fetchUserPosts(page); // Завантажуємо пости при зміні сторінки
// // // //   }, [page]);

// // // //   useEffect(() => {
// // // //     const handleScroll = debounce(() => {
// // // //       if (
// // // //         window.innerHeight + window.scrollY >= document.body.offsetHeight &&
// // // //         !loadingRef.current &&
// // // //         hasMore
// // // //       ) {
// // // //         setPage(prevPage => prevPage + 1); // Збільшуємо номер сторінки
// // // //       }
// // // //     }, 200);

// // // //     window.addEventListener("scroll", handleScroll);
// // // //     return () => {
// // // //       window.removeEventListener("scroll", handleScroll);
// // // //     };
// // // //   }, [hasMore]);

// // // //   const handleEditClick = () => {
// // // //     setIsOpenProfileEdit(true); // Відкриття форми редагування
// // // //   };

// // // //   const handleCloseEdit = () => {
// // // //     setIsOpenProfileEdit(false); // Закриття форми редагування
// // // //   };

// // // //   const getUsernameFromToken = () => {
// // // //     const token = localStorage.getItem("token");
// // // //     if (token) {
// // // //       const decoded = jwtDecode(token);
// // // //       return decoded.username;
// // // //     }
// // // //     return null;
// // // //   };

// // // //   const getIdFromToken = () => {
// // // //     const token = localStorage.getItem("token");
// // // //     if (token) {
// // // //       const decoded = jwtDecode(token);
// // // //       return decoded._id;
// // // //     }
// // // //     return null;
// // // //   };

// // // //   const getUsernameFromUrl = () => {
// // // //     const url = window.location.href;
// // // //     const username = url.substring(url.lastIndexOf("/") + 1);
// // // //     return username;
// // // //   };

// // // //   const usernameFromToken = getUsernameFromToken();
// // // //   const usernameFromUrl = getUsernameFromUrl();

// // // //   useEffect(() => {
// // // //     setIsAnotherUser(usernameFromUrl !== usernameFromToken); // Перевірка, чи це інший користувач
// // // //   }, [usernameFromUrl, usernameFromToken]);

// // // //   const updateProfileData = updatedData => {
// // // //     setProfileData(prevData => ({
// // // //       ...prevData,
// // // //       ...updatedData
// // // //     }));
// // // //   };

// // // //   if (!profileData) {
// // // //     return <p>Loading profile...</p>;
// // // //   }

// // // //   return (
// // // //     <Container className="profile">
// // // //       <div className="profile-header">
// // // //         <div className="profile-avatar-container">
// // // //           <img
// // // //             src={profileData.avatarImage || "/img/portrait.jpg"}
// // // //             alt="User Avatar"
// // // //             className="profile-avatar"
// // // //           />
// // // //         </div>
// // // //         <div className="profile-details">
// // // //           <div className="profile-username">
// // // //             <h2>{profileData.username}</h2>
// // // //           </div>
// // // //           <div className="profile-stats">
// // // //             <p>
// // // //               <strong>{profileData.postsCount} </strong>Posts
// // // //             </p>
// // // //             <p>
// // // //               <strong>{profileData.followersCount} </strong>Followers
// // // //             </p>
// // // //             <p>
// // // //               <strong>{profileData.followingCount} </strong>Following
// // // //             </p>
// // // //           </div>
// // // //           <div className="profile-about">
// // // //             <p>{profileData.about || "No bio available"}</p>
// // // //           </div>
// // // //         </div>
// // // //         <div className="profile-actions">
// // // //           {isAnotherUser ? (
// // // //             <button className="profile-button-follow">
// // // //               Follow <RiUserFollowLine />
// // // //             </button>
// // // //           ) : (
// // // //             <button className="profile-button-edit" onClick={handleEditClick}>
// // // //               Edit Profile <FaEdit />
// // // //             </button>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       {isOpenProfileEdit && (
// // // //         <ProfileEdit
// // // //           profileData={profileData}
// // // //           onClose={handleCloseEdit}
// // // //           onUpdateProfile={updateProfileData}
// // // //         />
// // // //       )}

// // // //       <hr />
// // // //       <div className="profile-posts">
// // // //         <h2>Posts</h2>
// // // //         {userPosts && userPosts.length > 0 ? (
// // // //           userPosts.map((post, index) => <Post key={index} post={post} />)
// // // //         ) : (
// // // //           <h3 className="profile-post-no-post">
// // // //             There are no posts yet. <br />
// // // //             {isAnotherUser
// // // //               ? "You just have to wait :("
// // // //               : "You can create the first one ;)"}
// // // //           </h3>
// // // //         )}
// // // //       </div>
// // // //     </Container>
// // // //   );
// // // // }

// // // import React, { useState, useEffect, useRef } from "react";
// // // import { debounce } from "lodash";
// // // import { Container } from "react-bootstrap";
// // // import { jwtDecode } from "jwt-decode";
// // // import { FaEdit } from "react-icons/fa";
// // // import { RiUserFollowLine } from "react-icons/ri";
// // // import Post from "./Post";
// // // import ProfileEdit from "./ProfileEdit";
// // // import { getUserProfile } from "../api/userApi";
// // // import { getUserPosts } from "../api/postApi";
// // // import "../styles/components/Profile.css";

// // // export default function Profile() {
// // //   const [profileData, setProfileData] = useState(null);
// // //   const [userPosts, setUserPosts] = useState([]);
// // //   const [isAnotherUser, setIsAnotherUser] = useState(false);
// // //   const [isOpenProfileEdit, setIsOpenProfileEdit] = useState(false);
// // //   const [page, setPage] = useState(1);
// // //   const [hasMore, setHasMore] = useState(true);
// // //   const loadingRef = useRef(false);

// // //   const fetchUserPosts = async (userId, pageNumber) => {
// // //     if (loadingRef.current) return; // Якщо вже триває завантаження
// // //     loadingRef.current = true; // Встановлюємо, що триває завантаження

// // //     try {
// // //       const newPosts = await getUserPosts(userId, pageNumber);
// // //       setUserPosts(prevPosts => [...prevPosts, ...newPosts]);
// // //       setHasMore(newPosts.length > 0); // Перевірка, чи є ще пости
// // //     } catch (error) {
// // //       console.error("Error fetching user posts:", error);
// // //     } finally {
// // //       loadingRef.current = false; // Завантаження завершено
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     const fetchUserProfileAndPosts = async () => {
// // //       try {
// // //         const usernameFromUrl = getUsernameFromUrl(); // Отримання username з URL
// // //         if (usernameFromUrl) {
// // //           const data = await getUserProfile(usernameFromUrl);
// // //           setProfileData(data);

// // //           // Використовуємо profileData.id для отримання постів
// // //           await fetchUserPosts(data.id, 1); // Завантажуємо лише першу сторінку постів
// // //         }
// // //       } catch (error) {
// // //         console.error("Error fetching profile data:", error);
// // //       }
// // //     };

// // //     fetchUserProfileAndPosts();
// // //   }, []); // Залежність порожня, виконується один раз

// // //   useEffect(() => {
// // //     if (profileData) {
// // //       fetchUserPosts(profileData.id, page); // Завантажуємо пости при зміні сторінки
// // //     }
// // //   }, [page, profileData]);

// // //   useEffect(() => {
// // //     const handleScroll = debounce(() => {
// // //       if (
// // //         window.innerHeight + window.scrollY >= document.body.offsetHeight &&
// // //         !loadingRef.current &&
// // //         hasMore
// // //       ) {
// // //         setPage(prevPage => prevPage + 1); // Збільшуємо номер сторінки
// // //       }
// // //     }, 200);

// // //     window.addEventListener("scroll", handleScroll);
// // //     return () => {
// // //       window.removeEventListener("scroll", handleScroll);
// // //     };
// // //   }, [hasMore]);

// // // const handleEditClick = () => {
// // //   setIsOpenProfileEdit(true); // Відкриття форми редагування
// // // };

// // // const handleCloseEdit = () => {
// // //   setIsOpenProfileEdit(false); // Закриття форми редагування
// // // };

// // //   const getUsernameFromToken = () => {
// // //     const token = localStorage.getItem("token");
// // //     if (token) {
// // //       const decoded = jwtDecode(token);
// // //       return decoded.username;
// // //     }
// // //     return null;
// // //   };

// // //   const getUsernameFromUrl = () => {
// // //     const url = window.location.href;
// // //     const username = url.substring(url.lastIndexOf("/") + 1);
// // //     return username;
// // //   };

// // //   const usernameFromToken = getUsernameFromToken();
// // //   const usernameFromUrl = getUsernameFromUrl();

// // //   useEffect(() => {
// // //     setIsAnotherUser(usernameFromUrl !== usernameFromToken); // Перевірка, чи це інший користувач
// // //   }, [usernameFromUrl, usernameFromToken]);

// // //   const updateProfileData = updatedData => {
// // //     setProfileData(prevData => ({
// // //       ...prevData,
// // //       ...updatedData
// // //     }));
// // //   };

// // //   if (!profileData) {
// // //     return <p>Loading profile...</p>;
// // //   }

// // //   return (
// // //     <Container className="profile">
// // //       <div className="profile-header">
// // //         <div className="profile-avatar-container">
// // //           <img
// // //             src={profileData.avatarImage || "/img/portrait.jpg"}
// // //             alt="User Avatar"
// // //             className="profile-avatar"
// // //           />
// // //         </div>
// // //         <div className="profile-details">
// // //           <div className="profile-username">
// // //             <h2>{profileData.username}</h2>
// // //           </div>
// // //           <div className="profile-stats">
// // //             <p>
// // //               <strong>{profileData.postsCount} </strong>Posts
// // //             </p>
// // //             <p>
// // //               <strong>{profileData.followersCount} </strong>Followers
// // //             </p>
// // //             <p>
// // //               <strong>{profileData.followingCount} </strong>Following
// // //             </p>
// // //           </div>
// // //           <div className="profile-about">
// // //             <p>{profileData.about || "No bio available"}</p>
// // //           </div>
// // //         </div>
// // //         <div className="profile-actions">
// // //           {isAnotherUser ? (
// // //             <button className="profile-button-follow">
// // //               Follow <RiUserFollowLine />
// // //             </button>
// // //           ) : (
// // //             <button className="profile-button-edit" onClick={handleEditClick}>
// // //               Edit Profile <FaEdit />
// // //             </button>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {isOpenProfileEdit && (
// // //         <ProfileEdit
// // //           profileData={profileData}
// // //           onClose={handleCloseEdit}
// // //           onUpdateProfile={updateProfileData}
// // //         />
// // //       )}

// // //       <hr />
// // //       <div className="profile-posts">
// // //         <h2>Posts</h2>
// // //         {userPosts && userPosts.length > 0 ? (
// // //           userPosts.map((post, index) => <Post key={index} post={post} />)
// // //         ) : (
// // //           <h3 className="profile-post-no-post">
// // //             There are no posts yet. <br />
// // //             {isAnotherUser
// // //               ? "You just have to wait :("
// // //               : "You can create the first one ;)"}
// // //           </h3>
// // //         )}
// // //       </div>
// // //     </Container>
// // //   );
// // // }

// // import React, { useState, useEffect, useRef } from "react";
// // import { debounce } from "lodash";
// // import { Container } from "react-bootstrap";
// // import { jwtDecode } from "jwt-decode";
// // import { FaEdit } from "react-icons/fa";
// // import { RiUserFollowLine } from "react-icons/ri";
// // import Post from "./Post";
// // import ProfileEdit from "./ProfileEdit";
// // import { getUserProfile } from "../api/userApi";
// // import { getUserPosts } from "../api/postApi";
// // import "../styles/components/Profile.css";

// // export default function Profile() {
// //   const [profileData, setProfileData] = useState(null);
// //   const [userPosts, setUserPosts] = useState([]);
// //   const [isAnotherUser, setIsAnotherUser] = useState(false);
// //   const [isOpenProfileEdit, setIsOpenProfileEdit] = useState(false);
// //   const [page, setPage] = useState(1);
// //   const [hasMore, setHasMore] = useState(true);
// //   const loadingRef = useRef(false);

// //   const fetchUserPosts = async (userId, pageNumber) => {
// //     if (loadingRef.current) return;
// //     loadingRef.current = true;

// //     try {
// //       const newPosts = await getUserPosts(userId, pageNumber);
// //       setUserPosts(prevPosts => [...prevPosts, ...newPosts]);
// //       setHasMore(newPosts.length > 0);
// //     } catch (error) {
// //       console.error("Error fetching user posts:", error);
// //     } finally {
// //       loadingRef.current = false;
// //     }
// //   };

// //   const fetchUserProfileAndPosts = async () => {
// //     try {
// //       const usernameFromUrl = getUsernameFromUrl();
// //       if (usernameFromUrl) {
// //         const data = await getUserProfile(usernameFromUrl);
// //         setProfileData(data);
// //         await fetchUserPosts(data.id, 1);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching profile data:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUserProfileAndPosts();
// //   }, []); // Виконується один раз при монтуванні

// //   useEffect(() => {
// //     const handleScroll = debounce(() => {
// //       if (
// //         window.innerHeight + window.scrollY >= document.body.offsetHeight &&
// //         !loadingRef.current &&
// //         hasMore
// //       ) {
// //         setPage(prevPage => prevPage + 1);
// //       }
// //     }, 200);

// //     window.addEventListener("scroll", handleScroll);
// //     return () => {
// //       window.removeEventListener("scroll", handleScroll);
// //     };
// //   }, [hasMore]);

// //   const getUsernameFromToken = () => {
// //     const token = localStorage.getItem("token");
// //     if (token) {
// //       const decoded = jwtDecode(token);
// //       return decoded.username;
// //     }
// //     return null;
// //   };

// //   const getUsernameFromUrl = () => {
// //     const url = window.location.href;
// //     const username = url.substring(url.lastIndexOf("/") + 1);
// //     return username;
// //   };

// //   useEffect(() => {
// //     const usernameFromUrl = getUsernameFromUrl();
// //     const usernameFromToken = getUsernameFromToken();
// //     setIsAnotherUser(usernameFromUrl !== usernameFromToken);

// //     fetchUserProfileAndPosts(); // Перезавантажуємо дані при зміні username в URL
// //   }, [window.location.pathname]); // Залежність: слідкуємо за зміною шляху

// //   const updateProfileData = updatedData => {
// //     setProfileData(prevData => ({
// //       ...prevData,
// //       ...updatedData
// //     }));
// //   };

// //   const handleEditClick = () => {
// //     setIsOpenProfileEdit(true); // Відкриття форми редагування
// //   };

// //   const handleCloseEdit = () => {
// //     setIsOpenProfileEdit(false); // Закриття форми редагування
// //   };

// //   if (!profileData) {
// //     return <p>Loading profile...</p>;
// //   }

// //   return (
// //     <Container className="profile">
// //       <div className="profile-header">
// //         <div className="profile-avatar-container">
// //           <img
// //             src={profileData.avatarImage || "/img/portrait.jpg"}
// //             alt="User Avatar"
// //             className="profile-avatar"
// //           />
// //         </div>
// //         <div className="profile-details">
// //           <div className="profile-username">
// //             <h2>{profileData.username}</h2>
// //           </div>
// //           <div className="profile-stats">
// //             <p>
// //               <strong>{profileData.postsCount} </strong>Posts
// //             </p>
// //             <p>
// //               <strong>{profileData.followersCount} </strong>Followers
// //             </p>
// //             <p>
// //               <strong>{profileData.followingCount} </strong>Following
// //             </p>
// //           </div>
// //           <div className="profile-about">
// //             <p>{profileData.about || "No bio available"}</p>
// //           </div>
// //         </div>
// //         <div className="profile-actions">
// //           {isAnotherUser ? (
// //             <button className="profile-button-follow">
// //               Follow <RiUserFollowLine />
// //             </button>
// //           ) : (
// //             <button className="profile-button-edit" onClick={handleEditClick}>
// //               Edit Profile <FaEdit />
// //             </button>
// //           )}
// //         </div>
// //       </div>

// //       {isOpenProfileEdit && (
// //         <ProfileEdit
// //           profileData={profileData}
// //           onClose={handleCloseEdit}
// //           onUpdateProfile={updateProfileData}
// //         />
// //       )}

// //       <hr />
// //       <div className="profile-posts">
// //         <h2>Posts</h2>
// //         {userPosts && userPosts.length > 0 ? (
// //           userPosts.map((post, index) => <Post key={index} post={post} />)
// //         ) : (
// //           <h3 className="profile-post-no-post">
// //             There are no posts yet. <br />
// //             {isAnotherUser
// //               ? "You just have to wait :("
// //               : "You can create the first one ;)"}
// //           </h3>
// //         )}
// //       </div>
// //     </Container>
// //   );
// // }

// import React, { useState, useEffect, useRef } from "react";
// import { debounce } from "lodash";
// import { Container } from "react-bootstrap";
// import { jwtDecode } from "jwt-decode";
// import { FaEdit } from "react-icons/fa";
// import { RiUserFollowLine } from "react-icons/ri";
// import Post from "./Post";
// import ProfileEdit from "./ProfileEdit";
// import { getUserProfile } from "../api/userApi";
// import { getUserPosts } from "../api/postApi";
// import "../styles/components/Profile.css";

// export default function Profile() {
//   const [profileData, setProfileData] = useState(null);
//   const [userPosts, setUserPosts] = useState([]);
//   const [isAnotherUser, setIsAnotherUser] = useState(false);
//   const [isOpenProfileEdit, setIsOpenProfileEdit] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const loadingRef = useRef(false);

//   const fetchUserPosts = async (userId, pageNumber) => {
//     if (loadingRef.current) return;
//     loadingRef.current = true;

//     try {
//       const newPosts = await getUserPosts(userId, pageNumber);
//       setUserPosts(prevPosts => [...prevPosts, ...newPosts]);
//       setHasMore(newPosts.length > 0);
//     } catch (error) {
//       console.error("Error fetching user posts:", error);
//     } finally {
//       loadingRef.current = false;
//     }
//   };

//   const fetchUserProfileAndPosts = async () => {
//     try {
//       const usernameFromUrl = getUsernameFromUrl();
//       if (usernameFromUrl) {
//         const data = await getUserProfile(usernameFromUrl);
//         setProfileData(data);
//         setUserPosts([]); // Скидаємо старі пости
//         setPage(1); // Скидаємо номер сторінки
//         await fetchUserPosts(data.id, 1);
//       }
//     } catch (error) {
//       console.error("Error fetching profile data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUserProfileAndPosts();
//   }, []); // Виконується один раз при монтуванні

//   useEffect(() => {
//     const handleScroll = debounce(() => {
//       if (
//         window.innerHeight + window.scrollY >= document.body.offsetHeight &&
//         !loadingRef.current &&
//         hasMore
//       ) {
//         setPage(prevPage => prevPage + 1);
//       }
//     }, 200);

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [hasMore]);

//   const getUsernameFromToken = () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const decoded = jwtDecode(token);
//       return decoded.username;
//     }
//     return null;
//   };

//   const getUsernameFromUrl = () => {
//     const url = window.location.href;
//     const username = url.substring(url.lastIndexOf("/") + 1);
//     return username;
//   };

//   useEffect(() => {
//     const usernameFromUrl = getUsernameFromUrl();
//     const usernameFromToken = getUsernameFromToken();
//     setIsAnotherUser(usernameFromUrl !== usernameFromToken);

//     fetchUserProfileAndPosts(); // Перезавантажуємо дані при зміні username в URL
//   }, [window.location.pathname]); // Залежність: слідкуємо за зміною шляху

//   useEffect(() => {
//     if (profileData) {
//       fetchUserPosts(profileData.id, page); // Завантажуємо пости при зміні сторінки
//     }
//   }, [page, profileData]); // Завантаження постів при зміні сторінки та профілю

//   const updateProfileData = updatedData => {
//     setProfileData(prevData => ({
//       ...prevData,
//       ...updatedData
//     }));
//   };

//   if (!profileData) {
//     return <p>Loading profile...</p>;
//   }

//   return (
//     <Container className="profile">
//       <div className="profile-header">
//         <div className="profile-avatar-container">
//           <img
//             src={profileData.avatarImage || "/img/portrait.jpg"}
//             alt="User Avatar"
//             className="profile-avatar"
//           />
//         </div>
//         <div className="profile-details">
//           <div className="profile-username">
//             <h2>{profileData.username}</h2>
//           </div>
//           <div className="profile-stats">
//             <p>
//               <strong>{profileData.postsCount} </strong>Posts
//             </p>
//             <p>
//               <strong>{profileData.followersCount} </strong>Followers
//             </p>
//             <p>
//               <strong>{profileData.followingCount} </strong>Following
//             </p>
//           </div>
//           <div className="profile-about">
//             <p>{profileData.about || "No bio available"}</p>
//           </div>
//         </div>
//         <div className="profile-actions">
//           {isAnotherUser ? (
//             <button className="profile-button-follow">
//               Follow <RiUserFollowLine />
//             </button>
//           ) : (
//             <button className="profile-button-edit" onClick={handleEditClick}>
//               Edit Profile <FaEdit />
//             </button>
//           )}
//         </div>
//       </div>

//       {isOpenProfileEdit && (
//         <ProfileEdit
//           profileData={profileData}
//           onClose={handleCloseEdit}
//           onUpdateProfile={updateProfileData}
//         />
//       )}

//       <hr />
//       <div className="profile-posts">
//         <h2>Posts</h2>
//         {userPosts && userPosts.length > 0 ? (
//           userPosts.map((post, index) => <Post key={index} post={post} />)
//         ) : (
//           <h3 className="profile-post-no-post">
//             There are no posts yet. <br />
//             {isAnotherUser
//               ? "You just have to wait :("
//               : "You can create the first one ;)"}
//           </h3>
//         )}
//       </div>
//     </Container>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import { Container } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { FaEdit } from "react-icons/fa";
import { RiUserFollowLine } from "react-icons/ri";
import Post from "./Post";
import ProfileEdit from "./ProfileEdit";
import { getUserProfile } from "../api/userApi";
import { getUserPosts } from "../api/postApi";
import { useLocation } from "react-router-dom"; // Додано
import "../styles/components/Profile.css";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isAnotherUser, setIsAnotherUser] = useState(false);
  const [isOpenProfileEdit, setIsOpenProfileEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);
  const location = useLocation(); // Додано

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
