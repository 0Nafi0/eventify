// src/App.jsx

import React from "react";
import AppRoute from "./services/appRoute.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
