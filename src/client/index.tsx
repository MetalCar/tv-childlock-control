import React from "react";
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={browserRouter} />
);
