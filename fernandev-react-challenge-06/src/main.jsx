import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartItemProvider } from "./contexts/CartItem";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartItemProvider>
      <App />
    </CartItemProvider>
  </React.StrictMode>
);
