import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function NavBar(props) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <NavLink
        style={{
          textDecoration: "none",
          color: "#fff",
          marginRight: "5px",
          marginLeft: "22px"
        }}
        to="/"
      >
        <h2>Chitkara Library</h2>
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="container">
          <NavLink className="ml-5 mr-5" style={linkStyle} to="/">
            Home
          </NavLink>
          <NavLink className="mr-5" style={linkStyle} to="/staff-info">
            Staff
          </NavLink>
          <NavLink className="mr-5" style={linkStyle} to="/recent">
            Recently Added Books
          </NavLink>
          <NavLink className="mr-5" style={linkStyle} to="/add">
            Add Book
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none"
};
