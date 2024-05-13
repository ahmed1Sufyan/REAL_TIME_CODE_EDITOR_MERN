import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { NextUIProvider } from "@nextui-org/react/dist/index.js";
// import { NextUIProvider } from "@nextui-org/react/dist/index.js";
import { NextUIProvider } from "@nextui-org/system";

ReactDOM.createRoot(document.getElementById("root")).render(
    <NextUIProvider>
      <App />
    </NextUIProvider>
);
