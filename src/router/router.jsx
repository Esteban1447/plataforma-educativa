import LandingPage from "../pages/LandingPage";
import Login from "../pages/login";
import ProtectedRoute from "../components/ProtectedRoute";
import Register from "../pages/register";

export let routes = [
    {
        path: "/home",
        element: <ProtectedRoute Protected={<LandingPage />} />, // Ruta protegida que renderiza "LandingPage"
    },
    {
        path: "/",
        element: <Login />, // Ruta para la página de inicio de sesión
    },
    {
        path: "/register",
        element: <Register />, // Ruta para la página de registro
    }
];