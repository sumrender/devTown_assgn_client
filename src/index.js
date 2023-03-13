import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContextProvider";
import { PhotosContextProvider } from "./context/PhotosContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PhotosContextProvider>
        <App />
      </PhotosContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
