import MainHeader from "../components/MainHeader";
import ImageCarousel from "../components/ImageCarousel";
import Footer from "../components/Footer";
import "./LandingPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    const storedUserName = localStorage.getItem('userName');
    setUserType(storedUserType);
    setUserName(storedUserName);
  }, []);

  const studentCards = [

    {
      title: "Mis Notas",
      description: "Consulta tus calificaciones",
      path: "/notas"
    },
    {
      title: "Mi Perfil",
      description: "Gestiona tu información personal",
      path: "/perfil"
    }
  ];

  const teacherCards = [

    {
      title: "Calificaciones",
      description: "Gestiona las notas de tus estudiantes",
      path: "/notas"
    },

  ];

  return (
    <>
      <MainHeader />
      <ImageCarousel />
      <main>
        <h1 className="landing-title">
          Bienvenido {userName || 'Usuario'} a Nubilearn
        </h1>
        <p className="landing-description">
          {userType === 'Student' 
            ? "Accede a tus cursos y mantente al día con tus actividades académicas"
            : "Gestiona tus cursos y estudiantes de manera eficiente"}
        </p>
        <div className="landing-cards-container">
          {(userType === 'Student' ? studentCards : teacherCards).map((card, index) => (
            <div
              key={index}
              className="landing-card"
              onClick={() => navigate(card.path)}
            >
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default LandingPage;
