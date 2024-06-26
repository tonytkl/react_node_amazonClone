import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";

import MoonLoader from "react-spinners/MoonLoader";

import { getLocalToken, toTitleCase } from "../../utils/utils";
import "./product.css";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [isLoggedIn, setIsLogged] = useState(getLocalToken()[0]);
  const [isLoading, setLoading] = useState(true);

  // Fetch product data
  useEffect(() => {
    fetch(`${process.env.REACT_APP_PRODUCT_API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, []);

  // handlers
  const handleQtyChange = (e) => setQty(e.target.value);
  const handleAddCart = () => {
    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: getLocalToken()[1],
        },
        body: JSON.stringify({ productId: id, qty: qty ? parseInt(qty) : 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.errors) {
            alert(data.errors[0].msg);
          } else {
            alert(data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  // Get time difference in hours and minutes from now to midnight
  const getHoursAndMinutes = () => {
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0
    );
    const diff = midnight - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes };
  };

  return (
    <div id="product-page">
      <MoonLoader
        color="#131921"
        loading={isLoading}
        size={50}
        cssOverride={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      />
      {product && (
        <Container className="main-container">
          <Row>
            <Col sm md={5} className="column">
              {" "}
              <Carousel interval={null} variant="dark">
                {product.images.map((image) => (
                  <Carousel.Item>
                    <img src={image} className="image" />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
            <Col sm md={4}>
              <h2>{product.title}</h2>
              <hr />
              <span className="price-container">
                <span className="dollar-sign">$</span>
                <h2 className="price">{product.price.toLocaleString()}</h2>
              </span>
              <Container>
                <Row>
                  <Col xs={5}>
                    <h3>Brand</h3>
                  </Col>
                  <Col>
                    <p>{product.brand}</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={5}>
                    <h3>Category</h3>
                  </Col>
                  <Col>
                    <p>{toTitleCase(product.category)}</p>
                  </Col>
                </Row>
              </Container>
              <hr />
              <h2>About this item</h2>
              <p>{product.description}</p>
            </Col>
            <Col sm md={3}>
              <div className="button-container">
                <span className="price-container">
                  <span className="dollar-sign">$</span>
                  <h2 className="price">{product.price.toLocaleString()}</h2>
                </span>
                <p>
                  <span className="text-link">FREE delivery</span>
                  <strong>
                    {" "}
                    {new Date(
                      new Date().getTime() + 4 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString("en-us", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                  </strong>
                  on your first order.
                </p>
                <p>
                  Or fastest delivery{" "}
                  <strong>
                    Tomorrow,{" "}
                    {new Date(
                      new Date().getTime() + 1 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString("en-us", {
                      month: "long",
                      day: "numeric",
                    })}
                    {"."}
                  </strong>{" "}
                  Order within {getHoursAndMinutes().hours} hrs{" "}
                  {getHoursAndMinutes().minutes} mins
                </p>
                {product.stock > 5 && (
                  <h3 style={{ color: "green" }}>In Stock</h3>
                )}
                {5 >= product.stock > 0 && (
                  <h3 style={{ color: "red" }}>Only {product.stock} Left</h3>
                )}
                {product.stock == 0 && (
                  <h3 style={{ color: "red" }}>Out of Stock</h3>
                )}

                <select className="qty-select" onChange={handleQtyChange}>
                  <option value="" disabled selected>
                    Quantity: 1
                  </option>
                  {[...Array(product.stock).keys()].map((i) => (
                    <option value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={handleAddCart}
                      className="button"
                      id="add-to-cart"
                    >
                      Add to Cart
                    </button>
                    <a href="/cart" className="button" id="buy-now">
                      Buy Now
                    </a>
                  </>
                ) : (
                  <>
                    <a href="/login" className="button" id="add-to-cart">
                      Add to Cart
                    </a>
                    <a href="/login" className="button" id="buy-now">
                      Buy Now
                    </a>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Product;
