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
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import places from "../../config/places";
import axios from "axios";
import _ from "lodash";
import { useAnalytics } from "reactfire";

const Location = () => {
  const analytics = useAnalytics();
  const [redirect, setRedirect] = useState(null);
  const [location, setLocation] = useState([]);
  useEffect(() => {
    let header = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };
    axios
      .get("/location/", header)
      .then(function (response) {
        console.log(response.data);
        if (!response.data) {
          return Promise.reject("error occur");
        }
        console.log("location", response.data);
        setLocation(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  const handleSubmit = (values) => {
    analytics.logEvent("reg_location_continue", {
      state_id: values.state_id,
      township_id: values.township_id,
      village_id: values.village_id,
    });
    let state,
      city,
      village = "";
    let citylist,
      villagelist = [];
    state = location[_.findIndex(location, { id: values.state_id })].name;

    citylist =
      location[_.findIndex(location, { id: values.state_id })].township;
    city = citylist[_.findIndex(citylist, { id: values.township_id })].name;

    villagelist =
      citylist[_.findIndex(citylist, { id: values.township_id })].village;
    village =
      villagelist[_.findIndex(villagelist, { id: values.village_id })].name;

    analytics.logEvent("reg_location_continue", {
      state_id: values.state_id,
      township_id: values.township_id,
      village_id: values.village_id,
    });

    analytics.setUserProperties({
      user_location: state + "," + city + "," + village,
    });

    let header = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    };
    values = JSON.stringify(values);
    axios
      .post(`/location/user/update/`, values, header)
      .then(function (response) {
        console.log(response.data);
        if (!response.data) {
          return Promise.reject("error occur");
        }

        setRedirect("/register/main-crop");

        //localStorage.setItem("user-id", response.data.id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Formik
      initialValues={{
        state_id: "",
        township_id: "",
        village_id: "",
      }}
      onSubmit={handleSubmit}
      enableReinitialize
      validationSchema={Yup.object().shape({
        state_id: Yup.string().required("Required").nullable(),
        township_id: Yup.string().required("Required").nullable(),
        village_id: Yup.string().required("Required").nullable(),
      })}
      render={({ values, errors, setFieldValue, isValid, handleSubmit }) => {
        console.log(values);
        let city = [];
        let village = [];
        if (location.length > 0 && values.state_id) {
          city =
            location[_.findIndex(location, { id: values.state_id })].township;
          if (values.township_id !== "") {
            village =
              city[_.findIndex(city, { id: values.township_id })].village;
          }
        }

        console.log("city", city);
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
                <h2 style={{ fontSize: "18px" }}>Help us locate your place</h2>
              </Grid>
              <Grid item xs={12}>
                <span style={{ fontSize: "14px" }}>
                  Let us know where your place is located to provide you with
                  personalized information
                </span>
              </Grid>
            </Grid>
            <Grid container className="" spacing={2}>
              <Grid
                item
                xs={12}
                style={{
                  textAlign: "left",
                  paddingLeft: "20px",
                }}
              >
                <span>STATE/REGION</span>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" style={{ width: "90%" }}>
                  <Select
                    name="state"
                    onChange={(e) => {
                      setFieldValue("state_id", e.target.value);
                      setFieldValue("township_id", "");
                      setFieldValue("village_id", "");
                      analytics.logEvent("reg_state", {
                        state_id: values.state_id,
                      });
                    }}
                    value={values.state_id}
                  >
                    {location.map(function (item, index) {
                      return (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {errors && errors.phone && <span> {errors.phone}</span>}
              </Grid>
            </Grid>
            <Grid container className="" spacing={2}>
              <Grid
                item
                xs={12}
                style={{
                  textAlign: "left",
                  paddingLeft: "20px",
                }}
              >
                <span>TOWNSHIP</span>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" style={{ width: "90%" }}>
                  <Select
                    name="city"
                    disabled={values.state_id === ""}
                    onChange={(e) => {
                      setFieldValue("township_id", e.target.value);
                      analytics.logEvent("reg_township", {
                        township_id: e.target.value,
                      });
                    }}
                    value={values.township_id}
                  >
                    {values.state_id !== "" &&
                      city.map(function (item, index) {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {errors && errors.phone && <span> {errors.phone}</span>}
              </Grid>
            </Grid>
            <Grid container className="" spacing={2}>
              <Grid
                item
                xs={12}
                style={{
                  textAlign: "left",
                  paddingLeft: "20px",
                }}
              >
                <span>ward/village</span>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" style={{ width: "90%" }}>
                  <Select
                    name="village"
                    disabled={values.township_id === ""}
                    onChange={(e) => {
                      setFieldValue("village_id", e.target.value);
                      analytics.logEvent("reg_village", {
                        village_id: e.target.value,
                      });
                    }}
                    value={values.village_id}
                  >
                    {values.township_id !== "" &&
                      village.map(function (item, index) {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
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
