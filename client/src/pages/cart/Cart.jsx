import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import MoonLoader from "react-spinners/MoonLoader";

import { getLocalToken } from "../../utils/utils";
import { endPoint } from "../../config/constant";
import "./cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(endPoint + "/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: getLocalToken()[1],
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          alert(data.errors[0].msg);
        } else {
          setCart(data.products);
          data.products.forEach((product) => {
            setSum((prev) => prev + product.price * product.qty);
          });
          setLoading(false);
        }
      });
  }, []);

  return (
    <div id="cart-page">
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
      <Container>
        <Row>
          <Col sm md={8}>
            <div id="cart-container" className="containers">
              <h1>Shopping Cart</h1>
              <hr />
              {cart.map((product) => (
                <div>
                  <div key={product.id} className="cart-product">
                    <img src={product.image} alt={product.title} />
                    <div>
                      <h2>{product.title}</h2>
                      <p>
                        <strong>Price:</strong> $
                        {parseFloat(product.price).toLocaleString("en-Us")}
                      </p>
                      <p>
                        <strong>Qty:</strong> {product.qty}
                      </p>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </Col>
          <Col sm md={4}>
            <div id="cart-summary" className="containers">
              <h1>Order Summary</h1>
              <hr />
              <h3>Subtotal: ${sum.toLocaleString("en-US")}</h3>
              <button id="checkout">Checkout</button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Cart;
