import React from "react";
import ReactDOM from "react-dom";
import { Dapp } from "./components/Dapp";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(
  <React.StrictMode>
    <Dapp />
  </React.StrictMode>,
  document.getElementById("root")
);
