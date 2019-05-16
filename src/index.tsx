import React, { useState } from "react";
import ReactDOM from "react-dom";
import axiosBase from "axios";
import Fab from "@material-ui/core/Fab";
import Notifications from "@material-ui/icons/Notifications";
import CameraAlt from "@material-ui/icons/CameraAlt";
import Vibration from "@material-ui/icons/Vibration";
import { Grid } from "@material-ui/core";
const axios = axiosBase.create({});


const App: React.FC = () => {
  return (
    <React.Fragment>
      <h1>hello react</h1>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
