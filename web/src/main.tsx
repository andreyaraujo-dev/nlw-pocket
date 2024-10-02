import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app.tsx";
import "./index.css";
import { Toaster } from "./components/ui/toaster.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home/index.tsx";
import {
  GoogleOAuthCustomProvider,
  QueryClientCustomProvider,
} from "./providers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthCustomProvider>
      <QueryClientCustomProvider>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientCustomProvider>
    </GoogleOAuthCustomProvider>
  </StrictMode>
);
