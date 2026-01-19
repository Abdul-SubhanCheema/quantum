import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import "./index.css";
import routes from "./Routes";

import { AuthProvider } from "./Context/AuthProvider";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
