import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import "./AcercaPage.css";

function AcercaPage() {
  return (
    <>
      <MainHeader />
      <main>
        <div className="acerca-container">
          <div className="acerca-card">
            <h1>
              <i className="fas fa-info-circle acerca-icon"></i>
              Nubilearn: Tu Portal Académico
            </h1>
            <p>
              Nubilearn es una plataforma educativa diseñada para facilitar la gestión académica de estudiantes y profesores.
              Aquí puedes acceder a tus cursos, consultar tus notas, actualizar tu perfil y mantenerte informado sobre tus actividades académicas.
            </p>
            <hr className="acerca-hr" />
            <h3>Características principales</h3>
            <ul className="acerca-list">
              <li><i className="fas fa-book-open acerca-list-icon"></i>Gestión de cursos</li>
              <li><i className="fas fa-clipboard-list acerca-list-icon"></i>Consulta de notas</li>
              <li><i className="fas fa-user acerca-list-icon"></i>Perfil personalizable</li>
              <li><i className="fas fa-bell acerca-list-icon"></i>Notificaciones académicas</li>
            </ul>
            <hr className="acerca-hr" />
            <p className="acerca-footer">
              Desarrollado por el equipo Nubilearn &copy; 2025
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default AcercaPage;