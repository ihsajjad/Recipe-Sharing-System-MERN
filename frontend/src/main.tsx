import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "sweetalert2/src/sweetalert2.scss";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.tsx";
import { router } from "./routes/Routers.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
