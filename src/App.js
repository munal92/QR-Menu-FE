import React, { useEffect, useState } from "react";
import Navibar from "./components/Navibar";
import Home from "./components/Home";
import logo from "./logo.svg";
import PrivateRoute from "./components/PrivateRoute";
import { Switch, Route, useHistory } from "react-router-dom";
import UploadPage from "./components/UploadPage";
import QRPage from "./components/QRPage";
import Footer from "./components/Footer";
import ReactGa from "react-ga";
function App() {
  const history = useHistory();
  const [urlLink, setUrlLink] = useState({
    name: "",
    email: "",
    id: "",
    Link: "NONE",
    fileName: "",
    title: "",
  });
  const [hideFooter, setHideFooter] = useState(false);

  useEffect(() => {
    ReactGa.initialize("G-4RG4GDSHGD");

    ReactGa.pageview(window.location.pathname);
    const token = window.localStorage.getItem("StayLogIN");
    //console.log("app.js token 92", token);

    if (token == "false") {
      window.localStorage.clear();
    }
  }, []);

  // const token = window.localStorage.getItem("StayLogIN");

  // if (token === "true") {
  //   history.push("/user");
  // } else {
  //   window.localStorage.removeItem("token");
  //   //  history.push("/");
  // }
  // }, []);
  return (
    <>
      <Navibar urlLink={urlLink} />
      <Switch>
        {/* <Route path="/user">
          <UploadPage />
        </Route> */}
        <PrivateRoute
          path="/user/qrcode"
          urlLink={urlLink}
          setUrlLink={setUrlLink}
          hideFooter={hideFooter}
          setHideFooter={setHideFooter}
          component={QRPage}
        />
        <PrivateRoute
          path="/user"
          urlLink={urlLink}
          setUrlLink={setUrlLink}
          component={UploadPage}
        />

        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <Footer hideFooter={hideFooter} />
    </>
  );
}

export default App;
