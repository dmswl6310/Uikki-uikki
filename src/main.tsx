import "@fontsource/inter";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./styles.css";
import ReactDOM from "react-dom/client";
import React, { lazy, Suspense } from "react";
import { ToastProvider } from "@/components/common/ToastProvider";
import { ThemeProvider } from "@/components/common/ThemeProvider";
const Home = lazy(() => import("./pages/Home"));
const Components = lazy(() => import("./pages/Components"));
const ComponentDetail = lazy(() => import("./components/ComponentDetail"));
const Guide = lazy(() => import("./pages/Guide"));
const NotFound = lazy(() => import("./pages/NotFound"));

const withSuspense = (element: React.ReactNode) => (
  <Suspense
    fallback={
      <div className="py-24 text-center text-sm text-gray-500 dark:text-gray-400">
        페이지를 불러오는 중입니다…
      </div>
    }
  >
    {element}
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: withSuspense(<Home />) },
      { path: "components", element: withSuspense(<Components />) },
      { path: "components/:id", element: withSuspense(<ComponentDetail />) },
      { path: "guide", element: withSuspense(<Guide />) },
      { path: "not-found", element: withSuspense(<NotFound />) },
      { path: "*", element: withSuspense(<NotFound />) },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="uikki-ui-theme">
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
