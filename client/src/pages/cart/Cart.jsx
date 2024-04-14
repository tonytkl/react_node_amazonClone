import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getLocalToken } from "../../utils/utils";
import "./cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);
  useEffect(() => {
    fetch("http://localhost:8000/cart", {
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
        }
      });
  }, []);

  return (
    <div id="cart-page">
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
