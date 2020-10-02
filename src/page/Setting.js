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
        onClick={() => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("fcm_token");
          analytics.logEvent("setting_logout", {
            action_done: "click",
          });
          setRedirect(true);
        }}
      >
        <ExitToApp color="primary" /> Log out
      </Grid>
    </>
  );
};
export default Activity;
