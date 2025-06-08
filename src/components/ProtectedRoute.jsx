import { Navigate } from "react-router-dom";

function ProtectedRoute({ Protected, requiredRole }) {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");

    if (!token) {
        return <Navigate to="/" />;
    }

    if (requiredRole && userType !== requiredRole) {
        return <Navigate to="/home" />;
    }

    // Si requiere rol de administrador, verificar específicamente
    if (requiredRole === "Administrator" && userType !== "Administrator") {
        return <Navigate to="/home" />;
    }

    return Protected;
}

export default ProtectedRoute;