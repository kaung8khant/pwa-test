import React from "react";
import { Grid, Typography } from "@material-ui/core";

import { Explore, Notifications } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useAnalytics } from "reactfire";
import _ from "lodash";

const Footer = () => {
  const analytics = useAnalytics();
  const { pathname } = useLocation();
  const nav_action = (tab) => {
    analytics.logEvent("tab_nav_bar", { tab_name: tab });
  };

  return (
    <Grid container className="footer">
      <Grid item xs={6}>
        <Link
          to="/"
          style={{ textDecoration: "none", color: "black" }}
          onClick={() => nav_action("explore")}
        >
          <Explore color={pathname === "/" ? "primary" : "inherit"} />
          <div>
            <Typography color={pathname === "/" ? "primary" : "textPrimary"}>
              Explore
            </Typography>
          </div>
        </Link>
      </Grid>
      <Grid item xs={6} className="footer-action">
        <Link
          to="/activity"
          style={{ textDecoration: "none", color: "black" }}
          onClick={() => nav_action("activity")}
        >
          <Notifications
            color={pathname === "/activity" ? "primary" : "inherit"}
          />
          <div>
            <Typography
              color={pathname === "/activity" ? "primary" : "textPrimary"}
            >
              Activity
            </Typography>
          </div>
        </Link>
      </Grid>
    </Grid>
  );
};

export default Footer;
