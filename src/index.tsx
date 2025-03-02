import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/global.css";
import App from "@/App.tsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { LoadingProvider } from "./context/LodingContext";
// import { ThemeProvider } from "@material-tailwind/react";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    {/* <ThemeProvider> */}
    <BrowserRouter>
      <LoadingProvider>
        <AuthContextProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthContextProvider>
      </LoadingProvider>
    </BrowserRouter>
    {/* </ThemeProvider> */}
  </React.StrictMode>
);
