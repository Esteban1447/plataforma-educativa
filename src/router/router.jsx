import LandingPage from "../pages/LandingPage";
import Login from "../pages/login";
import ProtectedRoute from "../components/ProtectedRoute";
import Register from "../pages/register";
import CoursesPage from "../pages/CoursesPage"; // Importa CoursesPage
import NotasPage from "../pages/NotasPage"; // Importa NotasPage
import PerfilPage from "../pages/PerfilPage"; // Importa PerfilPage

export let routes = [
    {
        path: "/home",
        element: <ProtectedRoute Protected={<LandingPage />} />, // Ruta protegida que renderiza "LandingPage"
    },
    {
        path: "/cursos",
        element: <ProtectedRoute Protected={<CoursesPage />} />, // Ruta protegida para Cursos
    },
    {
        path: "/notas",
        element: <ProtectedRoute Protected={<NotasPage />} />, // Ruta protegida para Notas
    },
    {
        path: "/",
        element: <Login />, // Ruta para la página de inicio de sesión
    },
    {
        path: "/register",
        element: <Register />, // Ruta para la página de registro
    },
    {
        path: "/perfil",
        element: <ProtectedRoute Protected={<PerfilPage />} />, // Ruta protegida para Perfil
    },
];