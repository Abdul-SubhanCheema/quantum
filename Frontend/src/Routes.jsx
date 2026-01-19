import { createBrowserRouter } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import Home from "./Pages/Home";
import Manager from "./Pages/Manager";
import RequireAuth from "./Context/RequireAuth";
//enum: ["manager", "admin", "user"]

const Roles={
  User:"user",
  Manager:"manager",
  Admin:"admin"
}

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
        element:<RequireAuth allowedRole={Roles.User}><Home/></RequireAuth>
      },
      {
        path:"/manager",
        element:<RequireAuth allowedRole={Roles.Manager}><Manager/></RequireAuth>
      },
      {
        path:"/admin",
        element:<RequireAuth allowedRole={Roles.Admin}><Admin/></RequireAuth>
      }
    ],
  },
]);
export default routes;
