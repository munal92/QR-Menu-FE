import React, { useEffect, useState } from "react";
import Navibar from "./components/Navibar";
import Home from "./components/Home";
import logo from "./logo.svg";
import PrivateRoute from "./components/PrivateRoute";
import { Switch, Route, useHistory } from "react-router-dom";
import UploadPage from "./components/UploadPage";
import QRPage from "./components/QRPage";
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

  // useEffect(() => {
  //   const token = window.localStorage.getItem("StayLogIN");

  //   if (token === "true") {
  //     history.push("/user");
  //   } else {
  //     window.localStorage.removeItem("token");
  //     //  history.push("/");
  //   }
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
    </>
  );
}

export default App;
