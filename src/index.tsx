import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/global.css";
import App from "@/App.tsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
// import { ThemeProvider } from "@material-tailwind/react";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    {/* <ThemeProvider> */}
    <BrowserRouter>
      <AuthContextProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthContextProvider>
    </BrowserRouter>
    {/* </ThemeProvider> */}
  </React.StrictMode>
);
