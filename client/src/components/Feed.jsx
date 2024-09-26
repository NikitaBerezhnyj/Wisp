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
  const loadingRef = useRef(false);

  const fetchPosts = async pageNumber => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    try {
      const newPosts = await getPosts(pageNumber);
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setHasMore(newPosts.length > 0);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !loadingRef.current &&
        hasMore
      ) {
        setPage(prevPage => prevPage + 1);
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore]);

  return (
    <Container className="feed-container">
      <PostForm />
      {posts.map(post => (
        <Post key={post._id} post={post} />
      ))}
      {loadingRef.current && <p>Loading more posts...</p>}{" "}
    </Container>
  );
}
