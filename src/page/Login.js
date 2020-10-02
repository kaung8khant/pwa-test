import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import { LinearProgress, Grid, Button } from "@material-ui/core";

const Login = () => {
  const [redirect, setRedirect] = useState(null);
  const handleSubmit = () => {};
  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Formik
        initialValues={{
          phone: "",
        }}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={Yup.object().shape({
          phone: Yup.string()
            .matches(/^(\+95|09)/, "Please provide valid phone number")
            .min(9, "Phone number need to be at least 8 numbers")
            .max(13, "Please provide valid phone number")
            .required("Required"),
        })}
        render={({ values, errors, setFieldValue, isValid }) => {
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
                    value={values.phone}
                    variant="outlined"
                    onChange={(e) => setFieldValue("phone", e.target.value)}
                    style={{ width: "90%" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  {errors && errors.phone && <span> {errors.phone}</span>}
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
                      localStorage.setItem("access_token", "test");
                      setRedirect("/");
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
export default Login;
