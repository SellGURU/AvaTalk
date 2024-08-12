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
import "react-image-gallery/styles/css/image-gallery.css";
import 'react-tooltip/dist/react-tooltip.css'

Modal.setAppElement('#root');

Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.Fragment>
);
