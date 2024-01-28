import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "symphony-ui/Themes/index.scss";
import "./Themes/index.scss";
import AuthContextProvider from "./store/auth-context.tsx";
import Modal from 'react-modal';
import './Api/axios.ts';
import 'react-calendar/dist/Calendar.css';
import "cropperjs/dist/cropper.css";

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.Fragment>
);
