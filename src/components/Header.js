import React from "react";
import { useAnalytics } from "reactfire";
import { Link } from "react-router-dom";
import { Settings, Call, ArrowBackIos } from "@material-ui/icons";

const Header = ({ type, style }) => {
  const analytics = useAnalytics();
  return (
    <div
      style={{
        position: "relative",
        textAlign: "left",
        padding: "20px",
      }}
    >
      {type === "Home" && (
        <>
          <span
            style={{ fontSize: "18px", color: "#1D9129", fontWeight: "bold" }}
          >
            ရွှေသီးနှံ3
          </span>
          <Link
            to="/call"
            onClick={() =>
              analytics.logEvent("call_btn_header", {
                action_done: "click",
              })
            }
          >
            <Call
              color="primary"
              style={{ position: "absolute", right: " 60px" }}
            />
          </Link>
          <Link
            to="/setting"
            onClick={() =>
              analytics.logEvent("setting_btn", {
                action_done: "click",
              })
            }
          >
            <Settings
              color="primary"
              style={{ position: "absolute", right: " 20px" }}
            />
          </Link>
        </>
      )}
      {type === "Other" && (
        <>
          <span
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => window.history.back()}
          >
            <ArrowBackIos />
            နောက်သို့
          </span>
        </>
      )}
    </div>
  );
};
export default Header;
