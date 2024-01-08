import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import shopReducer from "./services/state/reducer.ts";

import HomeScreen from "./pages/HomeScreen.tsx";
import ArticleScreen from "./pages/ArticleScreen.tsx";
import CartScreen from "./pages/CartScreen.tsx";
import LoginScreen from "./pages/LoginScreen.tsx";
import RegisterScreen from "./pages/RegisterScreen.tsx";
import OrderScreen from "./pages/OrderScreen.tsx";
import LogoutScreen from "./pages/LogoutScreen.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/article/:articleId",
    element: <ArticleScreen />,
  },
  {
    path: "/cart",
    element: <CartScreen />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/signup",
    element: <RegisterScreen />,
  },
  {
    path: "/logout",
    element: <LogoutScreen />,
  },
  {
    path: "/orders",
    element: <OrderScreen />,
  },
]);

const store = configureStore({ reducer: shopReducer });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
