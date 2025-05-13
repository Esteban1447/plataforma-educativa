import MainHeader from "../components/MainHeader";
import ImageCarousel from "../components/ImageCarousel";
import Footer from "../components/Footer";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <MainHeader />
      <ImageCarousel />
    
      <main>
        <h1 className="landing-title">
          Bienvenido a Nubilearn
        </h1>
        <p className="landing-description">
          Gestiona tus cursos, consulta tus notas y mantente informado sobre tus actividades académicas.
        </p>
        <div className="landing-cards-container">
          <div
            className="landing-card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/cursos")}
          >
            <h2>Mis Cursos</h2>
            <p>Accede a tus cursos activos.</p>
          </div>
          <div
            className="landing-card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/notas")}
          >
            <h2>Notas</h2>
            <p>Consulta tus calificaciones.</p>
          </div>
          <div
            className="landing-card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/perfil")}
          >
            <h2>Perfil</h2>
            <p>Actualiza tu información personal.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default LandingPage;