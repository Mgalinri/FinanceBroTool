import { AuthContext } from "../authContext";
import { useContext,useMemo } from "react";

function AuthProvider({children}){
     const [isAuthenticated,setIsAuthenticated] = useContext(AuthContext);
    return (
    <AuthContext.Provider value={[isAuthenticated,setIsAuthenticated]}>
        {children}
    </AuthContext.Provider>)
}
export default AuthProvider;