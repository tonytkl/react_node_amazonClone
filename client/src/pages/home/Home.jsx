import { useState, useEffect } from "react";
import { toTitleCase } from "../../utils/utils";

import Carousel from "react-bootstrap/Carousel";
import MoonLoader from "react-spinners/MoonLoader";

import "./home.css";

function Home() {
  const [products, setProducts] = useState(null);
  const [banners, setBanners] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_PRODUCT_API_URL}?limit=0`
        );
        const data = await res.json();
        const products = data.products;
        const productCategories = products.reduce((acc, product) => {
          if (!acc[product.category]) {
            acc[product.category] = [];
          }
          acc[product.category].push(product);
          return acc;
        }, {});
        setProducts(productCategories);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}`);
        const data = await res.json();
        setBanners(data.banner);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchAll = async () => {
      await fetchProducts();
      await fetchBanners();
      console.log(banners);
      setLoading(false);
    };
    fetchAll();
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
      {banners && (
        <Carousel interval={5000} variant="dark" indicators={false}>
          {banners.map((banner) => (
            <Carousel.Item>
              <a href={banner.linkUrl}>
                <img
                  src={banner.imgUrl}
                  className="banner-image"
                  alt="banner"
                />
              </a>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
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
