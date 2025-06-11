import { useNavigate, Link } from "react-router-dom";
import { redirectAlert } from "../helpers/functions";

function MainHeader() {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");

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
      <div className="main-header-logo">
        <i className="fas fa-graduation-cap"></i> Nubilearn
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/home">
              <i className="fas fa-home"></i> Inicio
            </Link>
          </li>
          <li>
            <Link to="/cursos">
              <i className="fas fa-book"></i> Cursos
            </Link>
          </li>
          <li>
            <Link to="/notas">
              <i className="fas fa-clipboard-list"></i> Notas
            </Link>
          </li>
          <li>
            <Link to="/perfil">
              <i className="fas fa-user"></i> Perfil
            </Link>
          </li>
          <li>
            <Link to="/acerca">
              <i className="fas fa-info-circle"></i> Acerca
            </Link>
          </li>
          <li>
            <Link to="/contacto">
              <i className="fas fa-envelope"></i> Contacto
            </Link>
          </li>
          {userType === "Administrator" && (
            <li>
              <Link to="/admin">
                <i className="fas fa-user-shield"></i> Admin
              </Link>
            </li>
          )}
          <li>
            <Link
              to="#"
              className="logout-link"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              <i className="fas fa-sign-out-alt"></i> Cerrar sesión
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
