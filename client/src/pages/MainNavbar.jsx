import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Routes, Route } from "react-router-dom";
import "./mainNavbar.css";
import { useEffect, useState } from "react";
import Home from "./home/Home";
import Product from "./product/Product";
import Cart from "./cart/Cart";
import Login from "./user/Login";
import Signup from "./user/Signup";
import Account from "./user/Account";
import { jwtDecode } from "jwt-decode";
import { getLocalToken, titleCase } from "../utils/utils";
import { endPoint } from "../config/constant";

function MainNavbar() {
  const [cartQty, setCart] = useState();
  const [loggedIn, setLoggedIn] = useState(getLocalToken()[0]);
  const [user, setUser] = useState("");
  useEffect(() => {
    // Check if user is logged in
    const token = getLocalToken()[1];
    if (token) {
      setLoggedIn(true);
      setUser(titleCase(jwtDecode(token).name));

      // Fetch cart
      fetch(endPoint + "/qty", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.errors) {
            alert(data.errors[0].msg);
          } else {
            setCart(data.sumQty);
          }
        });
    }
  }, []);

  return (
    <>
      <Navbar variant="dark" key="lg" expand="lg">
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
          {loggedIn ? (
            <a
              className="navbar-text-button"
              id="navbar-account"
              href="/account"
            >
              <span className="navbar-first-line">Hello, {user}</span>
              <span className="navbar-second-line">Your Account</span>
            </a>
          ) : (
            <a className="navbar-text-button" id="navbar-signin" href="/login">
              <span className="navbar-first-line">Hello, sign in</span>
              <span className="navbar-second-line">Account & Lists</span>
            </a>
          )}
          <a className="navbar-text-button">
            <span className="navbar-first-line">Returns</span>
            <span className="navbar-second-line">& Orders</span>
          </a>
          {loggedIn ? (
            <a className="navbar-text-button" id="navbar-cart" href="/cart">
              <div id="navbar-cart-container">
                <span id="navbar-cart-quantity">{cartQty ? cartQty : 0}</span>
                <span id="navbar-cart-icon"></span>
              </div>
              <span className="navbar-second-line">Cart</span>
            </a>
          ) : (
            <a className="navbar-text-button" id="navbar-cart" href="/login">
              <div id="navbar-cart-container">
                <span id="navbar-cart-quantity">{cartQty ? cartQty : 0}</span>
                <span id="navbar-cart-icon"></span>
              </div>
              <span className="navbar-second-line">Cart</span>
            </a>
          )}
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </>
  );
}

export default MainNavbar;
