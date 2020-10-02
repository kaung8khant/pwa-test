import React, { useEffect } from "react";
import { useAnalytics } from "reactfire";
import { useLocation } from "react-router-dom";
import _ from "lodash";

function MyPageViewLogger({ location }) {
  const analytics = useAnalytics();
  const { pathname } = useLocation();
  const screen = {
    "/register": "Registration",
    "/register/location": "Location",
    "/register/main-crop": "CropSelection",
    "/": "Explore",
    "/setting": "Settings",
    "/activity": "Activiy",
    "/profile/edit": "",
  };
  let screenname = screen[pathname];
  if (!screenname) {
    screenname = _.startsWith("/article/", pathname) ? "ArticleDetails" : null;
  }
  if (!screenname) {
    screenname = _.startsWith("/product/", pathname) ? "ProductDetails" : null;
  }

  // By passing `location.pathname` to the second argument of `useEffect`,
  // we only log on first render and when the `pathname` changes
  useEffect(() => {
    analytics.logEvent("screen_view", { screen_name: screenname });
  }, [analytics, screenname]);

  return null;
}
export default MyPageViewLogger;
