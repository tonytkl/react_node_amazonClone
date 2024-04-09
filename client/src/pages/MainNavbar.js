import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Routes, Route, NavLink } from "react-router-dom";
import "./mainNavbar.css";
import { useState } from "react";
import Home from "./home/Home";
import Product from "./product/Product";
import Cart from "./cart/Cart";

function MainNavbar() {
  const [cart, setCart] = useState([]);
  return (
    <>
      <Navbar variant="dark" key="lg" expand="lg" className="mb-3">
        <Container fluid>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Brand href="/">
            <div id="logo"></div>
          </Navbar.Brand>
          <a className="navbar-text-button" id="navbar-delivery">
            <div id="navbar-delivery-icon"></div>
            <div id="navbar-delivery-text">
              <span className="navbar-first-line">
                Delivering to Toronto M6B
              </span>
              <span className="navbar-second-line">Update location</span>
            </div>
          </a>
          <form id="navbar-search-bar">
            <div id="navbar-search-dropdown">
              <span id="navbar-search-dropdown-text">All</span>
              <span class="navbar-arrow"></span>
            </div>
            <input
              type="text"
              id="navbar-search-input"
              name="search"
              placeholder="Search Amazon.ca"
            />
            <span id="navbar-search-icon"></span>
          </form>
          <a className="navbar-text-button" id="navbar-language">
            <span id="navbar-flag"></span>
            <span id="navbar-language-text" className="navbar-second-line">
              EN<span class="navbar-arrow"></span>
            </span>
          </a>
          <a className="navbar-text-button" id="navbar-signin">
            <span className="navbar-first-line">Hello, sign in</span>
            <span className="navbar-second-line">
              Account & Lists<span class="navbar-arrow"></span>
            </span>
          </a>
          <a className="navbar-text-button">
            <span className="navbar-first-line">Returns</span>
            <span className="navbar-second-line">& Orders</span>
          </a>
          <a className="navbar-text-button" id="navbar-cart">
            <div id="navbar-cart-container">
              <span id="navbar-cart-quantity">{cart.length}</span>
              <span id="navbar-cart-icon"></span>
            </div>
            <span className="navbar-second-line">Cart</span>
          </a>
          {/* <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand-lg`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas> */}
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/calendar" element={<Cart />} />
      </Routes>
    </>
  );
}

export default MainNavbar;
