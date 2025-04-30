import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer
      position="top-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StrictMode>
);
