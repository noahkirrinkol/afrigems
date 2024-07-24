import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import CartContextProvider from "./context/CartContext";
import AuthContextProvider from "./context/AuthContext.tsx";
import { SearchContextProvider } from "./context/SearchContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SearchContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </SearchContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
