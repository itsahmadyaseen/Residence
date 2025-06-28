import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-2u5apgw41zry40e1.us.auth0.com"
      clientId="PT6bBiEvJC5Gx9pmS0k22E0Nt2fIPNM4"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "http://localhost:8001",
        scope: "openid profile email",
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
