import { useNavigate, Link } from "react-router-dom";
import { redirectAlert } from "../helpers/functions";

function MainHeader() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token"); // Elimina el token del localStorage
    redirectAlert(
      navigate,
      "Sesión cerrada",
      "Has cerrado sesión correctamente",
      "success",
      "/"
    ); // Muestra una alerta de éxito y redirige al usuario a la página de inicio de sesión
    navigate("/"); // Redirige al usuario a la página de inicio de sesión
  };

  return (
    <header className="main-header">
      <div className="main-header-logo">EduPlatform</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/cursos">Cursos</Link>
          </li>
          <li>
            <Link to="/notas">Notas</Link>
          </li>
          <li>
            <Link to="/acerca">Acerca</Link>
          </li>
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
          <li>
            <Link
              to="#"
              className="logout-link"
              onClick={(e) => {
                e.preventDefault();
                logout(); // Llama a la función de cierre de sesión
              }}
            >
              Cerrar sesión
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
