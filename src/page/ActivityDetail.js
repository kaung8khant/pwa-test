import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { messaging } from "reactfire";
import Header from "../components/Header";
import axios from "axios";
import { Grid, CircularProgress } from "@material-ui/core";
import Farm from "../assets/img/farm.jpeg";

const ActivityDetail = (props) => {
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    let header = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    // axios
    //   .get(`/article/${props.match.params.id}/`, header)
    //   .then(function (response) {
    //     console.log(response.data);
    //     if (!response.data) {
    //       return Promise.reject("error occur");
    //     }
    //     setArticle(response.data.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }, [props.match.params.id]);
  //   if (!article) {
  //     return (
  //       <Grid style={{ marginTop: "200px" }}>
  //         <CircularProgress />
  //       </Grid>
  //     );
  //   }

  return (
    <>
      <Header type="Other" />
      <Grid container>
        <Grid
          item
          xs={12}
          style={{ marginBottom: "100px", padding: "20px", textAlign: "left" }}
        >
          <Grid>
            <span style={{ fontWeight: "bold", fontSize: "16px" }}>
              ယာရာမီလာဖတ်စတား(24-7-7)၅၀ကီလိုဂရမ်ကို ဝယ်ယူနိုင်ဖို့
              ပြန်လည်ဆက်သွယ်ပေးပါမယ်
            </span>
          </Grid>
          <Grid>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "10px",
                marginTop: "8px",
                color: "#4C4C4C",
              }}
            >
              ၃ နာရီအကြာက
            </span>
          </Grid>
          <Grid style={{ marginTop: "24px" }}>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "14px",
                color: "#828282",
              }}
            >
              ယာရာမီလာဖတ်စတား(24-7-7)၅၀ကီလိုဂရမကို ဝယ်ယူဖို့ စိတ်ဝင်စားတဲ့အတွက်
              ကျေးဇူးတင်ပါတယ်။ ကျွန်တော်တို့ Impact Terra ကုမ္ပဏီမှ
              တစ်နာရီအတွင်း ပြန်လည်ဆက်သွယ် ပေးသွားပါမယ်။ အခုလို စိတ်ရှည်စွာ
              စောင့်ဆိုင်းပေးတဲ့အတွက် ကျေးဇူးတင်ပါတယ်။
            </span>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};
export default ActivityDetail;
