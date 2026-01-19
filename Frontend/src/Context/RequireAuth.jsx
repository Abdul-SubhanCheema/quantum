import { Navigate,useLocation,Outlet } from "react-router-dom";

import useAuth from "./UseAuth";

const RequireAuth=()=>{
    const {auth}=useAuth();
    const location=useLocation();


    return(
        auth?.user ?<Outlet/>
        :<Navigate to="/login" state={{from:location}} replace />
    );
}


export default RequireAuth;