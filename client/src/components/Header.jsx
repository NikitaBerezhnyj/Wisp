import React from "react";
import { Container, Navbar } from "react-bootstrap";
import "../styles/components/Header.css";

export default function Header() {
  return (
    <Container fluid className="header">
      <Navbar.Brand
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }}
      >
        {/* <img src="/wisp.svg" alt="logo" /> */}
        <img src="/img/logo.png" alt="logo" />
        <h1>Wisp</h1>
      </Navbar.Brand>
    </Container>
  );
}
