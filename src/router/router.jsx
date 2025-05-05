import LandingPage from "../pages/LandingPage";
import Login from "../pages/login";
import ProtectedRoute from "../components/ProtectedRoute";

export let routes = [
    {
        path: "/home",
        element: <ProtectedRoute Protected={<LandingPage />} />, // Cambiado a "Protected" // Cambiado a "Protected"
    },
    {
        path: "/",
        element: <Login />,
    },
];