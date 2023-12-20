import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/signin",
    element: <SignIn/>,
  },
  {
    path: "/signOut",
    element: <SignOut/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);