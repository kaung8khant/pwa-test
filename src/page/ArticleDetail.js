import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { messaging } from "reactfire";
import axios from "axios";
import { Grid, CircularProgress } from "@material-ui/core";
import Farm from "../assets/img/farm.jpeg";

const ArticleDetail = (props) => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    let header = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    axios
      .get(`/article/${props.match.params.id}/`, header)
      .then(function (response) {
        console.log(response.data);
        if (!response.data) {
          return Promise.reject("error occur");
        }
        setArticle(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.match.params.id]);
  if (!article) {
    return (
      <Grid style={{ marginTop: "200px" }}>
        <CircularProgress />
      </Grid>
    );
  }
  console.log(article);
  return (
    <>
      <Header type="Other" />
      <Grid container>
        <Grid item xs={12} style={{ width: "100%", height: "250px" }}>
          <img
            src={article.image.length > 0 ? article.image[0] : Farm}
            alt="prouct"
            className="image"
            style={{ width: "100%", height: "250px", objectFit: "cover" }}
          />
        </Grid>
        <Grid item xs={12} style={{ padding: "20px", textAlign: "left" }}>
          <Grid>
            {article.tag.map((item, index) => (
              <span key={index} style={{ marginRight: "20px" }}>
                {item.name}
              </span>
            ))}
          </Grid>
          <Grid style={{ marginTop: "20px" }}>
            <span>{article.description}</span>
          </Grid>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
};
export default ArticleDetail;
