import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/components/Header.css";

export default function Header() {
  const navigate = useNavigate();
  return (
    <Container fluid className="header">
      <Navbar.Brand
        onClick={() => {
          navigate("/");
        }}
      >
        {/* <img src="/wisp.svg" alt="logo" /> */}
        <img src="/img/logo.png" alt="logo" />
        <h1>Wisp</h1>
      </Navbar.Brand>
    </Container>
  );
}
