import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";

import { Link, useLocation } from "react-router-dom";
import WeatherWidget from "../components/WeatherWidget";
import { Grid } from "@material-ui/core";
import Product from "../assets/img/product.png";
import Farm from "../assets/img/farm.jpeg";
import { useAnalytics } from "reactfire";
import axios from "axios";
import Header from "../components/Header";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [article, setArticle] = useState([]);

  const analytics = useAnalytics();
  const { pathname } = useLocation();

  useEffect(() => {
    let header = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    axios
      .get("/explore/product/?per_page=4", header)
      .then(function (response) {
        console.log(response.data);
        if (!response.data) {
          return Promise.reject("error occur");
        }
        setProduct(response.data.data.product_data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("/explore/article/?per_page=1", header)
      .then(function (response) {
        console.log(response.data);
        if (!response.data) {
          return Promise.reject("error occur");
        }
        setArticle(response.data.data.article_data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header type="Home" />
      <Grid container style={{ padding: "20px" }}>
        <WeatherWidget />
        <Grid container style={{ marginTop: "20px" }}>
          {article.length > 0 && (
            <Grid item xs={12}>
              <Link
                to={`/article/${article[0].id}`}
                style={{ textDecoration: "none" }}
                onClick={() =>
                  analytics.logEvent("view_article", {
                    action_done: "click",
                    article_id: article[0].id,
                  })
                }
              >
                <Grid className="article-image">
                  <img
                    src={article[0].image ? article[0].image : Farm}
                    alt="article"
                    className="image"
                  />
                  <span className="product-image-text">Yesterday</span>
                </Grid>
                <Grid className="article-content">
                  <Grid style={{ fontWeight: "bold", color: "black" }}>
                    {article[0].name}
                  </Grid>
                  <Grid className="text">{article[0].short_description}</Grid>
                </Grid>
              </Link>
            </Grid>
          )}
        </Grid>
        <Grid container style={{ marginTop: "20px" }} spacing={2}>
          {product.length > 0 &&
            product.map((item, index) => {
              return (
                <Grid item xs={6}>
                  <Link
                    to={`/product/${item.id}`}
                    style={{ textDecoration: "none" }}
                    onClick={() =>
                      analytics.logEvent("view_product", {
                        action_done: "click",
                        product_id: item.id,
                      })
                    }
                  >
                    <Grid className="product">
                      <img
                        src={item.image ? item.image : Product}
                        alt="prouct"
                        className="product-image"
                      />
                      <span className="product-image-text">New</span>
                    </Grid>
                    <Grid className="product-content">
                      <Grid style={{ fontWeight: "bold" }}>{item.name}</Grid>
                      <Grid>30kg</Grid>
                      <Grid className="product-price">30000 MMK</Grid>
                    </Grid>
                  </Link>
                </Grid>
              );
            })}
        </Grid>
      </Grid>

      <Footer />
    </>
  );
};
export default Home;
function newFunction(analytics, pathname) {
  analytics.logEvent("page-view", { path_name: pathname });
}
