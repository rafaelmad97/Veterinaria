import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.ts";
import GlobalState from "./context/globalContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalState>
      <RouterProvider router={router} />
    </GlobalState>
  </React.StrictMode>
);
