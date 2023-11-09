import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Login from './pages/Login';
import Chat from './pages/Chat';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:3000');
socket.on("connect", () => {
  console.log("SOCKET ID"+socket.id); // x8WIv7-mJelg7on_ALbx
});

const router = createBrowserRouter([
  {
    path: "/",
    element:<Login socket={socket}/>
  },
  {
    path: "/chat",
    element: <Chat socket={socket}/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);