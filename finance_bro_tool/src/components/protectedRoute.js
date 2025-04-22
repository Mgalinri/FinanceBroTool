import { useContext } from "react";
import  {AuthContext}  from "../authContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated,setIsAuthenticated] = useContext(AuthContext);
    console.log("isAuthenticated", isAuthenticated);
    if (isAuthenticated) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
}

export default ProtectedRoute;