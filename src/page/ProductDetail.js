import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { messaging } from "reactfire";
import axios from "axios";
import { Grid, CircularProgress, Button } from "@material-ui/core";
import Product from "../assets/img/product.png";
import { useAnalytics } from "reactfire";
import { Link } from "react-router-dom";

const ProductDetail = (props) => {
  const analytics = useAnalytics();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let header = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    axios
      .get(`/product/${props.match.params.id}/`, header)
      .then(function (response) {
        console.log(response.data);
        if (!response.data) {
          return Promise.reject("error occur");
        }
        setProduct(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.match.params.id]);
  if (!product) {
    return (
      <Grid style={{ marginTop: "200px" }}>
        <CircularProgress />
      </Grid>
    );
  }
  console.log(product);
  return (
    <>
      <Grid container style={{ marginBottom: "100px" }}>
        <Grid
          item
          xs={12}
          style={{ width: "100%", height: "250px", backgroundColor: "#e9f3fd" }}
        >
          <img
            src={product.image > 0 ? product.image[0].name : Product}
            alt="prouct"
            className="image"
            style={{ width: "100%", height: "250px", objectFit: "cover" }}
          />
        </Grid>
        <Grid item xs={12} style={{ padding: "20px", textAlign: "left" }}>
          <Grid>
            <span style={{ marginRight: "20px" }}>
              {product.translation.name_translation}
            </span>
          </Grid>
          <Grid>
            {product.tag.map((item, index) => (
              <span key={index} style={{ marginRight: "20px" }}>
                {item.name}
              </span>
            ))}
          </Grid>

          <Grid>
            <span style={{ marginRight: "20px" }}>{product.brand}</span>
          </Grid>
          <Grid>
            <span style={{ marginRight: "20px" }}>
              {product.translation.dosage_translation}
            </span>
          </Grid>
          <Grid>
            <span style={{ marginRight: "20px", color: "#2FB53D" }}>
              {product.maximum_retail_price} ကျပ်
            </span>
          </Grid>

          <Grid style={{ marginTop: "20px" }}>
            <span>{product.translation.description_translation}</span>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            fontSize: "16px !important",
            textTransform: "none !important",
          }}
        >
          <Grid container style={{ padding: "20px" }} spacing={2}>
            <Grid xs={6}>
              <Link
                to="/call"
                onClick={() =>
                  analytics.logEvent("call_buy_now_btn", {
                    action_done: "click",
                  })
                }
                style={{ textDecoration: "none " }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  className="button"
                >
                  ဖုန်းဆက်ဝယ်မယ်
                </Button>
              </Link>
            </Grid>
            <Grid xs={6}>
              <Button
                variant="outlined"
                color="primary"
                disableElevation
                className="button"
                onClick={() =>
                  analytics.logEvent("call_back_back_btn", {
                    action_done: "click",
                  })
                }
              >
                ဖုန်းပြန်ခေါ်ပါ
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
};
export default ProductDetail;
