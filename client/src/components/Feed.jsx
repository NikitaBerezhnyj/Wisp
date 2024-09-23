// // import React from "react";
// // import { Container } from "react-bootstrap";
// // import Post from "./Post";
// // import PostForm from "./PostForm";
// // import "../styles/components/Feed.css";

// // export default function Feed() {
// //   const post = {
// //     _id: {
// //       $oid: "66f103d5ceb71bdd39017dc2"
// //     },
// //     user: {
// //       $oid: "66ebf7cf13638b78d58b0b2a",
// //       avatar: "http://localhost:3001/uploads/portrait_2024-09-23_08-59-48.jpg",
// //       username: "NikName"
// //     },
// //     content: "<u>Test!</u> 😈",
// //     postImage:
// //       "http://localhost:3001/uploads/background_2024-09-23_10-20-20.jpg",
// //     likes: [],
// //     dislikes: [],
// //     comments: [],
// //     createdAt: {
// //       $date: "2024-09-23T05:59:49.701Z"
// //     },
// //     __v: 0
// //   };

// //   return (
// //     <Container className="feed-container">
// //       <PostForm />

// //       <Post post={post} />
// //     </Container>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import { Container } from "react-bootstrap";
// import Post from "./Post";
// import PostForm from "./PostForm";
// import { getPosts } from "../api/postApi";
// import "../styles/components/Feed.css";

// export default function Feed() {
//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const fetchPosts = async pageNumber => {
//     setLoading(true);
//     try {
//       const newPosts = await getPosts(pageNumber);
//       setPosts(prevPosts => [...prevPosts, ...newPosts]);
//       setHasMore(newPosts.length > 0);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts(page);
//   }, [page]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (
//         window.innerHeight + window.scrollY >= document.body.offsetHeight &&
//         !loading &&
//         hasMore
//       ) {
//         setPage(prevPage => prevPage + 1);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [loading, hasMore]);

//   return (
//     <Container className="feed-container">
//       <PostForm />
//       {/* {posts.map((post, index) => (
//         <Post key={index} post={post} />
//       ))} */}
//       {posts.map(post => (
//         <Post key={post._id} post={post} />
//       ))}

//       {loading && <p>Loading more posts...</p>}
//     </Container>
//   );
// }

import React, { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import Post from "./Post";
import PostForm from "./PostForm";
import { getPosts } from "../api/postApi";
import "../styles/components/Feed.css";
import { debounce } from "lodash";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false); // Використовуємо useRef для контролю завантаження

  const fetchPosts = async pageNumber => {
    if (loadingRef.current) return; // Якщо вже завантажується, нічого не робимо
    loadingRef.current = true; // Встановлюємо, що завантажується

    try {
      const newPosts = await getPosts(pageNumber);
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setHasMore(newPosts.length > 0);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      loadingRef.current = false; // Завантаження закінчилось
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !loadingRef.current && // Перевіряємо, що не триває завантаження
        hasMore
      ) {
        setPage(prevPage => prevPage + 1);
      }
    }, 200); // Затримка в 200 мс

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore]); // Залежність лише від hasMore

  return (
    <Container className="feed-container">
      <PostForm />
      {posts.map(post => (
        <Post key={post._id} post={post} />
      ))}
      {loadingRef.current && <p>Loading more posts...</p>}{" "}
      {/* Покажіть повідомлення про завантаження */}
    </Container>
  );
}
