// import React, { useState } from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import { FaEdit } from "react-icons/fa";
// import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
// import Post from "./Post";
// import "../styles/components/Profile.css";

// export default function Profile() {
//   const [isAnotherUser, setIsAnotherUser] = useState(false);
//   const [postsCount, setPostsCount] = useState(0);
//   const [followersCount, setFollowersCount] = useState(0);
//   const [followingCount, setFollowingCount] = useState(0);

//   return (
//     <Container className="profile">
//       {/* <Row className="profile-header">
//         <Col xs={4} className="profile-avatar-container">
//           <img
//             src="/img/portrait.jpg"
//             alt="User Avatar"
//             className="profile-avatar"
//           />
//         </Col>
//         <Col xs={8} className="profile-details">
//           <div className="profile-username">
//             <h2>Username</h2>
//           </div>
//           <div className="profile-stats">
//             <p>
//               <strong>{postsCount} </strong>Posts
//             </p>
//             <p>
//               <strong>{followersCount} </strong>Followers
//             </p>
//             <p>
//               <strong>{followingCount} </strong>Following
//             </p>
//           </div>
//           <div className="profile-about">
//             <p>About User</p>
//           </div>
//         </Col>
//       </Row> */}
//       <div className="profile-header">
//         <div className="profile-avatar-container">
//           <img
//             src="/img/portrait.jpg"
//             alt="User Avatar"
//             className="profile-avatar"
//           />
//         </div>
//         <div className="profile-details">
//           <div className="profile-username">
//             <h2>Username</h2>
//           </div>
//           <div className="profile-stats">
//             <p>
//               <strong>{postsCount} </strong>Posts
//             </p>
//             <p>
//               <strong>{followersCount} </strong>Followers
//             </p>
//             <p>
//               <strong>{followingCount} </strong>Following
//             </p>
//           </div>
//           <div className="profile-about">
//             {/* Максимум 36 символів */}
//             <p>About User</p>
//           </div>
//         </div>

//         <div className="profile-actions">
//           {isAnotherUser ? (
//             <button className="">
//               Follow <RiUserFollowLine />
//             </button>
//           ) : (
//             <button className="">
//               Edit Profile <FaEdit />
//             </button>
//           )}
//         </div>
//       </div>
//       <Row className="profile-posts">
//         <h3>Posts</h3>
//         <div className="profile-post-list">
//           <Post />
//           <Post />
//           <Post />
//           <Post />
//         </div>
//       </Row>
//     </Container>
//   );
// }

import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import Post from "./Post";
import "../styles/components/Profile.css";

export default function Profile() {
  const [isAnotherUser, setIsAnotherUser] = useState(false);
  const [postsCount, setPostsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  return (
    <Container className="profile">
      <div className="profile-header">
        <div className="profile-avatar-container">
          <img
            src="/img/portrait.jpg"
            alt="User Avatar"
            className="profile-avatar"
          />
        </div>
        <div className="profile-details">
          <div className="profile-username">
            <h2>Username</h2>
          </div>
          <div className="profile-stats">
            <p>
              <strong>{postsCount} </strong>Posts
            </p>
            <p>
              <strong>{followersCount} </strong>Followers
            </p>
            <p>
              <strong>{followingCount} </strong>Following
            </p>
          </div>
          <div className="profile-about">
            <p>About User</p>
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
        <h3>Posts</h3>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index}>
            <Post />
          </div>
        ))}
      </div>
    </Container>
  );
}
