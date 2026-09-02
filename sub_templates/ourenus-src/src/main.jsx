import { Fragment } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./utils/i18n.js";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <Fragment>
    <App />
  </Fragment>
);
