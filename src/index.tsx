import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import reportWebVitals from './reportWebVitals.js';
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthProvider } from './Contexts/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
console.log("Auth0 env:", {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
});

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        // onRedirectCallback={(appState) => {
        //   console.log("Auth0 callback complete:", appState);
        //   window.history.replaceState(
        //     {},
        //     document.title,
        //     window.location.pathname,
        //   );
        // }}
      >
        <AuthProvider>
        <App />
        </AuthProvider>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
