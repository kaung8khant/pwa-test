import React from "react";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import Activity from "./page/Activity";
import Setting from "./page/Setting";
import ChooseCrop from "./page/registration/ChooseCrop";
import Location from "./page/registration/Location";
import { useAnalytics } from "reactfire";
import MyPageViewLogger from "./components/MyPageViewLogger";
import ArticleDetail from "./page/ArticleDetail";
import ProductDetail from "./page/ProductDetail";
import { messaging } from "reactfire";
import ActivityDetail from "./page/ActivityDetail";
import CallScreen from "./page/CallScreen";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#A9F445",
      main: "#2FB53D",
      dark: "#6D9D2D",
      contrastText: "#fff",
    },
    secondary: {
      main: "#2FB53D",
    },
  },
});

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("access_token") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/register" />
      )
    }
  />
);

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop>
          <ThemeProvider theme={theme}>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route path="/register/location" component={Location} />
              <Route path="/register/main-crop" component={ChooseCrop} />
              <Route path="/register" component={Register} />
              <Route path="/activity/detail" component={ActivityDetail} />
              <ProtectedRoute path="/activity" component={Activity} />
              <ProtectedRoute path="/setting" component={Setting} />
              <Route path="/call" component={CallScreen} />
              <Route path="/article/:id" component={ArticleDetail} />
              <Route path="/product/:id" component={ProductDetail} />
              <ProtectedRoute path="/" component={Home} />
            </Switch>
            <MyPageViewLogger />
          </ThemeProvider>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
