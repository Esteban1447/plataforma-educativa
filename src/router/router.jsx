import LandingPage from "../pages/LandingPage";
import Login from "../pages/login";
import ProtectedRoute from "../components/ProtectedRoute";
import Register from "../pages/register";

export let routes = [
    {
        path: "/home",
        element: <ProtectedRoute Protected={<LandingPage />} />, // Cambiado a "Protected" // Cambiado a "Protected"
    },
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    }
];