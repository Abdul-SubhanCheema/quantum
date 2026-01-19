import { createBrowserRouter } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import Home from "./Pages/Home";
import Manager from "./Pages/Manager";
import RequireAuth from "./Context/RequireAuth";

const routes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path:"/home",
        element:<Home/>
      }
    ],
  },
]);
export default routes;
