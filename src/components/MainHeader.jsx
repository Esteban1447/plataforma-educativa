import { useNavigate, Link } from "react-router-dom";
import { redirectAlert } from "../helpers/functions";

function MainHeader() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    redirectAlert(
      navigate,
      "Sesión cerrada",
      "Has cerrado sesión correctamente",
      "success",
      "/"
    );
    navigate("/");
  };

  return (
    <header className="main-header">
      <div className="main-header-logo">EduPlatform</div>
      <nav>
        <ul>
          <li>
            <Link to="/home">Inicio</Link>
          </li>
          <li>
            <Link to="/cursos">Cursos</Link>
          </li>
          <li>
            <Link to="/notas">Notas</Link>
          </li>
          <li>
            <Link to="/perfil">Perfil</Link>
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
                logout();
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
