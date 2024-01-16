import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Store
import { Provider } from "react-redux";
import store from "./Store";

// Router
import { BrowserRouter } from "react-router-dom";

// Styles
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./index.css";

// Constants
import { localTokenKey, reqTokenHederKey } from "./constants";

// Toastify
import { ToastContainer } from "react-toastify";

// Axios
import axios from "axios";

axios.defaults.baseURL = "https://nt-shopping-list.onrender.com/api";
axios.defaults.headers.common[reqTokenHederKey] =
  localStorage.getItem(localTokenKey);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    <ToastContainer position="top-right" theme="colored" />
  </React.StrictMode>
);
