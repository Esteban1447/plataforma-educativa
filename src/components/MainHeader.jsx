import { useNavigate } from "react-router-dom";

function MainHeader() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("token"); // Elimina el token del localStorage
    navigate("/"); // Redirige al usuario a la página de inicio de sesión
  };

  return (
    <header className="main-header">
      <div className="main-header-logo">EduPlatform</div>
      <nav>
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Cursos</a></li>
          <li><a href="#">Notas</a></li>
          <li><a href="#">Acerca</a></li>
          <li><a href="#">Contacto</a></li>
          <li>
            <a
              href="#"
              className="logout-link"
              onClick={(e) => {
                e.preventDefault();
                cerrarSesion();
              }}
            >
              Cerrar sesión
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
