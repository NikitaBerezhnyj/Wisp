import React from "react";
import { Container } from "react-bootstrap";
import Post from "./Post";
import PostForm from "./PostForm";
import "../styles/components/Feed.css";

export default function Feed() {
  return (
    <Container className="feed-container">
      <PostForm />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </Container>
  );
}
