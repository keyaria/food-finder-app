import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home.tsx";
import ErrorPage from "./pages/Error.tsx";
import Layout from "./componens/Layout.tsx";
import { APIProvider } from "@vis.gl/react-google-maps";
import "./App.css";

function App() {
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
  return (
    <ChakraProvider>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <RouterProvider router={router} />
      </APIProvider>
    </ChakraProvider>
  );
}

export default App;
