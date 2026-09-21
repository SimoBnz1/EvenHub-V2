import {Navigate} from "react-router-dom";

function ProtectedRoute({children,role}){
    const token=localStorage.getItem("eventhub_token");
    const userRole=localStorage.getItem("eventhub_role");

    if(!token){
        return <Navigate to="/login"/>;
    }

    if(role && userRole!==role){
        return <Navigate to="/"/>;
    }

    return children;
}

export default ProtectedRoute;