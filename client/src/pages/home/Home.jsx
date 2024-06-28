import { useState, useEffect } from "react";
import { toTitleCase } from "../../utils/utils";
import MoonLoader from "react-spinners/MoonLoader";
import "./home.css";

function Home() {
  const [products, setProducts] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PRODUCT_API_URL}?limit=0`)
      .then((res) => res.json())
      .then((data) => {
        const products = data.products;
        const productCategories = products.reduce((acc, product) => {
          if (!acc[product.category]) {
            acc[product.category] = [];
          }
          acc[product.category].push(product);
          return acc;
        }, {});
        setProducts(productCategories);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div id="homepage">
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
      {products &&
        Object.keys(products).map((key) => {
          return (
            <div key={key} className="category">
              <h2>{toTitleCase(key)}</h2>
              <div className="product-list">
                {products[key].map((product) => {
                  return (
                    <a
                      key={product._id}
                      className="product-card"
                      href={`/product/${product.id}`}
                    >
                      <img
                        src={product.images[0]}
                        className="product-image"
                        alt="product"
                      />
                      <p>{toTitleCase(product.title)}</p>
                      <p>${product.price.toLocaleString()}</p>
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Home;
