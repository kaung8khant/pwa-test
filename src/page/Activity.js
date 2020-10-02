import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAnalytics, messaging } from "reactfire";
import { Link } from "react-router-dom";
import Product from "../assets/img/product.png";
import { Grid } from "@material-ui/core";

const Activity = () => {
  const analytics = useAnalytics();
  const [noti, setNoti] = useState([
    {
      title:
        "ယာရာမီလာဖတ်စတား (24-7-7) ၅၀ကီလိုဂရမ်ကို ဝယ်ယူနိုင်ဖို့ ပြန်လည်ဆက်သွယ်ပေးပါမယ်",
      body: "အသေးစိတ်ကြည့်ရန်ဤနေရာကိုနှိပ်ပါ",

      time: "၃ နာရီအကြာက",
    },
  ]);
  const msg = messaging();

  msg
    .requestPermission()
    .then(() => {
      return msg.getToken();
    })
    .then((token) => {
      console.log("Token : ", token);
    })
    .catch((err) => {
      console.log(err);
    });
  msg.onMessage((payload) => {
    console.log(payload);
    let notilist = noti;
    notilist.push({
      body: payload.notification.body,
      title: payload.notification.title,
    });
    new Notification(payload.notification.title, {
      body: payload.notification.body,
    });
    setNoti(notilist);
  });
  console.log(noti);
  return (
    <>
      <Header type="Home" />
      {noti.length > 0 &&
        noti.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Link
                to="/activity/detail"
                style={{ textDecoration: "none ", color: "black" }}
                onClick={() =>
                  analytics.logEvent("view_noti", {
                    action_done: "click",
                    activity_id: "test",
                  })
                }
              >
                <Grid
                  container
                  direction="row"
                  style={{
                    padding: "20px",
                  }}
                >
                  <Grid item style={{ float: "left", width: "20%" }}>
                    <Grid>
                      <img
                        src={Product}
                        alt="activiy"
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "#E9F3FD",
                          borderRadius: "50%",
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item style={{ width: "80%" }}>
                    <Grid
                      container
                      direction="column"
                      style={{ marginLeft: "20px", textAlign: "left" }}
                    >
                      <Grid style={{ fontWeight: "bold", fontSize: "14px" }}>
                        {item.title}
                      </Grid>
                      <Grid style={{ marginTop: "4px", fontSize: "12px" }}>
                        {item.body}
                      </Grid>
                      <Grid style={{ fontSize: "10px" }}>{item.time}</Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Link>
            </React.Fragment>
          );
        })}
      <Footer />
    </>
  );
};
export default Activity;
