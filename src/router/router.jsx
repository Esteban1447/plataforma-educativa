import LandingPage from "../pages/LandingPage";
import Login from "../pages/login";
import ProtectedRoute from "../components/ProtectedRoute";
import Register from "../pages/register";
import CoursesPage from "../pages/CoursesPage";
import NotasPage from "../pages/NotasPage";
import PerfilPage from "../pages/PerfilPage";
import AcercaPage from "../pages/AcercaPage";
import ContactoPage from "../pages/ContactoPage";
import AdminPage from "../pages/AdminPage";

export let routes = [
    {
        path: "/home",
        element: <ProtectedRoute Protected={<LandingPage />} />,
    },
    {
        path: "/cursos",
        element: <ProtectedRoute Protected={<CoursesPage />} />,
    },
    {
        path: "/notas",
        element: <ProtectedRoute Protected={<NotasPage />} />,
    },
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/perfil",
        element: <ProtectedRoute Protected={<PerfilPage />} />,
    },
    {
        path: "/acerca",
        element: <AcercaPage />,
    },
    {
        path: "/contacto",
        element: <ContactoPage />,
    },
    {
        path: "/admin",
        element: <ProtectedRoute Protected={<AdminPage />} requiredRole="Administrator" />,
    }
];