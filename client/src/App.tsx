import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home.tsx";
import ErrorPage from "./pages/Error.tsx";
import Layout from "./components/Layout.tsx";
import { APIProvider } from "@vis.gl/react-google-maps";
import "./App.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Restaurant from "./pages/Restaurant.tsx";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  });

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/restaurant/:id",
          element: <Restaurant />,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ]);
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <RouterProvider router={router} />
        </APIProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
