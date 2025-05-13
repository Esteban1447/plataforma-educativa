import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import "./LandingPage.css"; // Reutiliza estilos de tarjetas


// Falta la vista independiente de profesores

// Se usan datos quemados para la demostración

function CoursesPage() {
  return (
    <>
      <MainHeader />
      <main>
        <h1 className="landing-title">
          <i className="fas fa-book-open" style={{ color: "#0077cc", marginRight: "12px" }}></i>
          Mis Cursos
        </h1>
        <p className="landing-description">
          Aquí puedes ver todos los cursos en los que estás inscrito.
        </p>
        <div className="landing-cards-container">
          <div className="landing-card">
            <i className="fas fa-flask fa-2x" style={{ color: "#58bc82", marginBottom: "12px" }}></i>
            <h2>Química Básica</h2>
            <p>Prof. Ana Gómez</p>
            <p><i className="fas fa-calendar-alt"></i> Lunes y Miércoles</p>
          </div>
          <div className="landing-card">
            <i className="fas fa-laptop-code fa-2x" style={{ color: "#ff4d4d", marginBottom: "12px" }}></i>
            <h2>Programación I</h2>
            <p>Prof. Juan Pérez</p>
            <p><i className="fas fa-calendar-alt"></i> Martes y Jueves</p>
          </div>
          <div className="landing-card">
            <i className="fas fa-language fa-2x" style={{ color: "#0077cc", marginBottom: "12px" }}></i>
            <h2>Inglés Intermedio</h2>
            <p>Prof. Laura Ruiz</p>
            <p><i className="fas fa-calendar-alt"></i> Viernes</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CoursesPage;