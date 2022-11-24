import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "font-awesome/css/font-awesome.css";
import { AuthContextProvider } from "./Context/AuthContext";
import { ChatContextProvider } from "./Context/ChatContext";
// import { HelmetProvider } from 'react-helmet-async';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
        <BrowserRouter>
        {/* <HelmetProvider> */}
          <App />
        {/* </HelmetProvider> */}
        </BrowserRouter>
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
);


