import { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import { Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Home from "./home/Home";
import Product from "./product/Product";
import Cart from "./cart/Cart";
import Login from "./user/Login";
import Signup from "./user/Signup";
import Account from "./user/Account";

import { getLocalToken, toTitleCase } from "../utils/utils";

import "./mainNavbar.css";

function MainNavbar() {
  const [cartQty, setCart] = useState();
  const [loggedIn, setLoggedIn] = useState(getLocalToken()[0]);
  const [user, setUser] = useState("");
  useEffect(() => {
    // Check if user is logged in
    const token = getLocalToken()[1];
    if (token) {
      setLoggedIn(true);
      setUser(toTitleCase(jwtDecode(token).name));

      // Fetch cart
      fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/qty`, {
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
      <Navbar
        variant="dark"
        key="lg"
        expand="lg"
        className="d-flex flex-row justify-content-start"
      >
        <Container fluid>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Brand href="/" className="mr-auto">
            <div id="logo"></div>
          </Navbar.Brand>
          {/* Delivering button only on lg or more */}
          <div
            className="navbar-text-button d-none d-lg-flex"
            id="navbar-delivery"
          >
            <div id="navbar-delivery-icon"></div>
            <div id="navbar-delivery-text">
              <span className="navbar-first-line">
                Delivering to Toronto M6B
              </span>
              <span className="navbar-second-line">Update location</span>
            </div>
          </div>

          {/* Empty div to fill the gap for less than lg */}
          <div className="d-lg-none flex-grow-1"></div>

          {/* User button for screen smaller than lg */}
          {loggedIn ? (
            // If user is logged in, show account button
            <a
              className="navbar-text-button d-lg-none"
              id="navbar-account"
              href="/account"
            >
              <span className="navbar-first-line">Hello, {user}</span>
              <span className="navbar-second-line">Your Account</span>
            </a>
          ) : (
            // If user is not logged in, show sign in button
            <a
              className="navbar-text-button d-lg-none"
              id="navbar-signin"
              href="/login"
            >
              <span className="navbar-first-line">Hello, sign in</span>
              <span className="navbar-second-line">Account & Lists</span>
            </a>
          )}

          {/* Cart button for screen smaller than lg*/}
          {loggedIn ? (
            // Cart button with the respective link based on login status
            <a
              className="navbar-text-button d-lg-none "
              id="navbar-cart"
              href="/cart"
            >
              <div id="navbar-cart-container">
                <span id="navbar-cart-quantity">{cartQty ? cartQty : 0}</span>
                <span id="navbar-cart-icon"></span>
              </div>
              <span className="navbar-second-line">Cart</span>
            </a>
          ) : (
            <a
              className="navbar-text-button d-lg-none"
              id="navbar-cart"
              href="/login"
            >
              <div id="navbar-cart-container">
                <span id="navbar-cart-quantity">{cartQty ? cartQty : 0}</span>
                <span id="navbar-cart-icon"></span>
              </div>
              <span className="navbar-second-line">Cart</span>
            </a>
          )}

          {/* Search bar */}
          <form
            id="navbar-search-bar"
            className="form-inline col-12 col-lg-auto flex-lg-grow-1"
          >
            <div id="navbar-search-dropdown">
              <span id="navbar-search-dropdown-text">All</span>
              <span className="navbar-arrow"></span>
            </div>
            <input
              type="text"
              id="navbar-search-input"
              name="search"
              placeholder="Search Amazon.ca"
            />
            <span id="navbar-search-icon"></span>
          </form>

          {/* Language change button for lg or more */}
          <div
            className="navbar-text-button d-none d-lg-flex"
            id="navbar-language"
          >
            <span id="navbar-flag"></span>
            <span id="navbar-language-text" className="navbar-second-line">
              EN<span className="navbar-arrow"></span>
            </span>
          </div>

          {/* User button for screen larger than lg */}
          {loggedIn ? (
            // If user is logged in, show account button
            <a
              className="navbar-text-button d-none d-lg-flex"
              id="navbar-account"
              href="/account"
            >
              <span className="navbar-first-line">Hello, {user}</span>
              <span className="navbar-second-line">Your Account</span>
            </a>
          ) : (
            // If user is not logged in, show sign in button
            <a
              className="navbar-text-button d-none d-lg-flex"
              id="navbar-signin"
              href="/login"
            >
              <span className="navbar-first-line">Hello, sign in</span>
              <span className="navbar-second-line">Account & Lists</span>
            </a>
          )}

          {/* Return button for lg or more */}
          <div className="navbar-text-button d-none d-lg-flex">
            <span className="navbar-first-line">Returns</span>
            <span className="navbar-second-line">& Orders</span>
          </div>

          {/* Cart button for screen larger than lg */}
          {loggedIn ? (
            // Cart button with the respective link based on login status
            <a
              className="navbar-text-button d-none d-lg-flex"
              id="navbar-cart"
              href="/cart"
            >
              <div id="navbar-cart-container">
                <span id="navbar-cart-quantity">{cartQty ? cartQty : 0}</span>
                <span id="navbar-cart-icon"></span>
              </div>
              <span className="navbar-second-line">Cart</span>
            </a>
          ) : (
            <a
              className="navbar-text-button d-none d-lg-flex"
              id="navbar-cart"
              href="/login"
            >
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
