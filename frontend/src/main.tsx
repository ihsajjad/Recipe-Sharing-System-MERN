import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "sweetalert2/src/sweetalert2.scss";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.tsx";
import { store } from "./redux/store/soter.ts";
import { router } from "./routes/Routers.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
