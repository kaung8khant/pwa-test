import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import { LinearProgress, Grid, Button } from "@material-ui/core";
import axios from "axios";
import { useAnalytics, messaging } from "reactfire";

const Register = () => {
  const analytics = useAnalytics();
  const msg = messaging();

  msg
    .requestPermission()
    .then(() => {
      return msg.getToken();
    })
    .then((token) => {
      console.log("Token : ", token);
      localStorage.setItem("fcm_token", token);
    })
    .catch((err) => {
      console.log(err);
    });

  const [redirect, setRedirect] = useState(null);
  const [error, setError] = useState(null);
  if (redirect) {
    console.log(redirect);
    return <Redirect to={redirect} />;
  }
  const handleSubmit = (values) => {
    analytics.logEvent("reg_phone_no", { phone_number: values.user_input });
    axios
      .post(`/account/register/`, values)
      .then(function (response) {
        console.log(response.data);
        if (!response.data) {
          return Promise.reject("error occur");
        }

        if (!response.data.data.is_valid) {
          setError("Phone number is not valid");
        } else {
          localStorage.setItem("access_token", response.data.data.token);

          analytics.setUserId(response.data.data.user_id);
          analytics.setUserProperties({
            app_version: "GP2",
          });
          let header = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          };
          axios
            .post(
              `/account/device/registration/`,
              { registration_id: localStorage.getItem("fcm_token") },
              header
            )
            .then(function (response) {
              console.log(response.data);
              if (!response.data) {
                return Promise.reject("error occur");
              }

              //localStorage.setItem("user-id", response.data.id);
            })
            .catch(function (error) {
              console.log(error);
              setError("Server error");
            });
          if (response.data.data.is_new_user) {
            localStorage.setItem("new_user", true);

            setRedirect("/register/location");
          } else {
            setRedirect("/");
          }
        }
      })
      .catch(function (error) {
        console.log(error);
        setError("Server error");
      });
  };
  return (
    <>
      <Formik
        initialValues={{
          user_input: "",
        }}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={Yup.object().shape({
          user_input: Yup.string()
            .matches(/^(\+95|09)/, "Please provide valid phone number")
            .min(9, "Phone number need to be at least 9 numbers")
            .max(13, "Please provide valid phone number")
            .required("Required"),
        })}
        render={({ values, errors, setFieldValue, isValid, handleSubmit }) => {
          console.log(errors);
          return (
            <>
              <LinearProgress
                variant="determinate"
                value={33.3}
                style={{
                  backgroundColor: "white",
                  margin: "20px",
                }}
                color="primary"
              />
              <Grid
                container
                style={{
                  paddingLeft: "50px",
                  paddingRight: "50px",
                  marginBottom: "100px",
                }}
              >
                <Grid item xs={12}>
                  <h2 style={{ fontSize: "18px" }}>
                    Welcome to Golden Paddy 2.0
                  </h2>
                </Grid>
                <Grid item xs={12}>
                  <span style={{ fontSize: "14px" }}>
                    Farmers’ very own digital hub to learn, trade and receive
                    advice.
                  </span>
                </Grid>
              </Grid>
              <Grid container className="" spacing={2}>
                <Grid item xs={12} style={{ marginTop: "100px" }}>
                  <span>continue with phone number</span>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={values.user_input}
                    variant="outlined"
                    onChange={(e) =>
                      setFieldValue("user_input", e.target.value)
                    }
                    style={{ width: "90%" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  {errors && errors.user_input && (
                    <span> {errors.user_input}</span>
                  )}
                  {error && <span>{error}</span>}
                </Grid>
              </Grid>
              <Grid container className="" spacing={2}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color={isValid ? "primary" : ""}
                    style={{
                      width: "90%",
                      borderRadius: "24px",
                      boxShadow: "none",
                    }}
                    onClick={() => {
                      analytics.logEvent("reg_phone_continue", {
                        phone_number: values.user_input,
                      });
                      handleSubmit();
                    }}
                  >
                    Continue
                  </Button>
                </Grid>
              </Grid>
            </>
          );
        }}
      />
    </>
  );
};
export default Register;
// localStorage.setItem("access_token", "test");
// setRedirect("/register/location");
