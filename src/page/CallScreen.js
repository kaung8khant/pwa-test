import React, { useState } from "react";
import Header from "../components/Header";
import { LinearProgress, Grid, Button } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import { Redirect } from "react-router-dom";
import { useAnalytics } from "reactfire";

const Activity = () => {
  const analytics = useAnalytics();
  const [redirect, setRedirect] = useState(null);
  if (redirect) {
    return <Redirect to="/" />;
  }
  //setting_logout
  return (
    <>
      <Header type="Other" />
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ height: "90vh", position: "relative" }}
      >
        <Grid item xs={12}>
          ရွှေသီးနှံအဖွဲ့ သို့ တိုက်ရိုက် ဖုန်းခေါ်ဆိုမည်။
        </Grid>
        <Grid
          item
          xs={12}
          style={{ position: "absolute", bottom: "20px", width: "100%" }}
        >
          <a href="tel:+959976792894" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color={"primary"}
              style={{
                width: "90%",
                borderRadius: "24px",
                boxShadow: "none",
              }}
            >
              စတင်ခေါ်ဆိုမယ်
            </Button>
          </a>
        </Grid>
      </Grid>
    </>
  );
};
export default Activity;
