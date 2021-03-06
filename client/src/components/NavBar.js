import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import authContext from "../context/auth/authContext";
import logo from "../logo.jpeg";
import "../logo.jpeg";
import "../App.css";
import "./Navbar.css";

export default function NavBar() {
  const { logout, user } = useContext(authContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="info" text-white sticky="top">
      <Navbar.Brand>
        <Link to="/">
          <Image src={logo} rounded></Image>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="m-auto" text-white>
          <Nav.Link>
            <Link to="/packinglist" className="white-color"> Your Packing List</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/upload" className="white-color"> Upload Travel Documents</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/documents" className="white-color"> View Travel Documents</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/chat" className="white-color"> Chat</Link>
          </Nav.Link>
          <NavDropdown.Divider />
          <NavDropdown
            title="Sign In"
            id="collasible-nav-dropdown"
            style={{ color: "white" }}
          >
            <NavDropdown.Item>
              <Link to="/login" className="white-color"> Login</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/register" className="white-color"> Register</Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
