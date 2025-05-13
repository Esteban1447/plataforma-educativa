import { Navigate } from "react-router-dom";

function ProtectedRoute({ Protected }) {
    let token = localStorage.getItem("token"); // Verifica si existe un token en el localStorage
    return token ? Protected : <Navigate to="/" />; // Si hay token, renderiza el componente protegido; de lo contrario, redirige al inicio de sesión
}

export default ProtectedRoute;