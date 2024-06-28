import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import MoonLoader from "react-spinners/MoonLoader";

import { getLocalToken } from "../../utils/utils";
// import { endPoint } from "../../config/constant";
import "./cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const initialFetch = async () => {
      await fetchCart();
      setLoading(false);
    };

    const fetchCart = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: getLocalToken()[1],
          },
        });
        const data = await res.json();
        if (data.errors) {
          alert(data.errors[0].msg);
        } else {
          const productPromises = data.products.map((product) =>
            fetchProduct(product)
          );
          const products = await Promise.all(productPromises);
          setCart(products);
          // Calculate and set sum here after cart is fully updated
          const newSum = products.reduce(
            (prev, curr) => prev + curr.price * curr.qty,
            0
          );
          setSum(newSum);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchProduct = async (product) => {
      const res = await fetch(
        `${process.env.REACT_APP_PRODUCT_API_URL}/${product.productId}`
      );
      const data = await res.json();
      return {
        id: data.id,
        title: data.title,
        price: data.price,
        image: data.thumbnail,
        qty: product.qty,
      };
    };
    initialFetch();
    console.log(cart);
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
              {cart &&
                cart.map((product) => (
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
