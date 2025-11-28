import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import SimulationPage from "./pages/SimulationPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import HomePage from "./pages/HomePage/HomePage.tsx";
import AdminRoute from "./services/AdminRoute.tsx";
import AdminPage from "./pages/AdminPage/AdminPage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import AcoesPage from "./pages/AcoesPage/AcoesPage.tsx";
import AcoesDetalhePage from "./pages/AcoesDetalhePage/AcoesDetalhePage.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "simulacao",
        element: <SimulationPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "acoes",
        element: <AcoesPage />,
      },
      { path: "acoes/:ticker",
        element: <AcoesDetalhePage /> 
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
