import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home.tsx";
import ErrorPage from "./pages/Error.tsx";
import Layout from "./componens/Layout.tsx";
import { APIProvider } from "@vis.gl/react-google-maps";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <RouterProvider router={router} />
      </APIProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
