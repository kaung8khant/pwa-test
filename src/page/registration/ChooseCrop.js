import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import {
  LinearProgress,
  Grid,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import axios from "axios";
import { useAnalytics } from "reactfire";
import _ from "lodash";

const Location = () => {
  const analytics = useAnalytics();
  const [redirect, setRedirect] = useState(null);
  const [crop, setCrop] = useState([]);
  useEffect(() => {
    let header = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    axios
      .get("/crop/list/", header)
      .then(function (response) {
        console.log(response.data);
        if (!response.data) {
          return Promise.reject("error occur");
        }
        console.log("location", response.data);
        setCrop(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  if (redirect) {
    return <Redirect to={redirect} />;
  }

  const handleSubmit = (values) => {
    analytics.logEvent("reg_crop_continue", {
      crop_id: values.crop_id,
    });
    let cropname =
      crop[_.findIndex(crop, { id: parseInt(values.crop_id) })].name;
    console.log(cropname);
    let header = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .post(`/crop/user/update/`, values, header)
      .then(function (response) {
        console.log(response.data);
        if (!response.data) {
          return Promise.reject("error occur");
        }
        analytics.setUserProperties({
          main_crop: cropname,
        });

        setRedirect("/");

        //localStorage.setItem("user-id", response.data.id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Formik
      initialValues={{
        crop_id: "",
      }}
      onSubmit={handleSubmit}
      enableReinitialize
      validationSchema={Yup.object().shape({
        crop_id: Yup.string().required("Required").nullable(),
      })}
      render={({ values, errors, setFieldValue, isValid, handleSubmit }) => {
        return (
          <>
            <LinearProgress
              variant="determinate"
              value={66.6}
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
                <h2 style={{ fontSize: "18px" }}>What is your main crop?</h2>
              </Grid>
              <Grid item xs={12}>
                <span style={{ fontSize: "14px" }}>
                  Please share your main crop with us so that we can curate the
                  contents just for you
                </span>
              </Grid>
            </Grid>
            <Grid container className="" spacing={2}>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">ChooseCrop</FormLabel>
                  <RadioGroup
                    aria-label="crop"
                    name="crop"
                    value={values.crop_id}
                    onChange={(e) => {
                      setFieldValue("crop_id", e.target.value);
                      analytics.logEvent("reg_crop", {
                        crop_id: e.target.value,
                      });
                    }}
                  >
                    {crop.map((item, index) => {
                      return (
                        <FormControlLabel
                          key={index}
                          value={item.id + ""}
                          control={<Radio color="primary" />}
                          label={item.name}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {errors && errors.phone && <span> {errors.phone}</span>}
              </Grid>
            </Grid>

            <Grid container className="" spacing={2}>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color={isValid ? "primary" : "default"}
                  style={{
                    width: "90%",
                    borderRadius: "24px",
                    boxShadow: "none",
                  }}
                  onClick={handleSubmit}
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          </>
        );
      }}
    />
  );
};
export default Location;
