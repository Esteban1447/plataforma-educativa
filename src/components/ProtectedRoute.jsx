import { Navigate } from "react-router-dom"

function ProtectedRoute({ Protected }) {
    let token = localStorage.getItem("token");
    return token ? Protected : <Navigate to="/" />;
}

export default ProtectedRoute;