import { useState, useEffect } from "react";
import { endPoint, totitleCase } from "../../config/constant";
import "./home.css";

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endPoint)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);
  console.log(data);

  return (
    <div id="homepage">
      {data &&
        Object.keys(data).map((key) => {
          return (
            <div key={key} className="category">
              <h2>{totitleCase(key)}</h2>
              <div className="product-list">
                {data[key].map((product) => {
                  return (
                    <a
                      key={product._id}
                      className="product-card"
                      href={`/product/${product._id}`}
                    >
                      <img src={product.images[0]} className="product-image" />
                      <p>{totitleCase(product.title)}</p>
                      <p>${product.price}</p>
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
