import { useState } from "react";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import "./LandingPage.css";

// Se usan datos quemados para la demostración

const notasData = [
  {
    materia: "Química Básica",
    icono: "fas fa-flask",
    color: "#58bc82",
    nota: 4.5,
    estado: { texto: "Aprobado", color: "#58bc82" },
    desglose: [
      { nombre: "Parcial 1", valor: 4.2 },
      { nombre: "Parcial 2", valor: 4.7 },
      { nombre: "Laboratorio", valor: 4.5 },
      { nombre: "Proyecto", valor: 4.6 },
    ],
  },
  {
    materia: "Programación I",
    icono: "fas fa-laptop-code",
    color: "#ff4d4d",
    nota: 3.8,
    estado: { texto: "En curso", color: "#ff9800" },
    desglose: [
      { nombre: "Parcial 1", valor: 3.5 },
      { nombre: "Parcial 2", valor: 4.0 },
      { nombre: "Talleres", valor: 3.9 },
      { nombre: "Proyecto", valor: 4.1 },
    ],
  },
  {
    materia: "Inglés Intermedio",
    icono: "fas fa-language",
    color: "#0077cc",
    nota: 4.0,
    estado: { texto: "Aprobado", color: "#58bc82" },
    desglose: [
      { nombre: "Speaking", valor: 4.2 },
      { nombre: "Writing", valor: 3.8 },
      { nombre: "Listening", valor: 4.1 },
      { nombre: "Reading", valor: 3.9 },
    ],
  },
];

function NotasPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleOpenModal = (idx) => {
    setOpenIndex(idx);
  };

  const handleCloseModal = () => {
    setOpenIndex(null);
  };

  return (
    <>
      <MainHeader />
      <main>
        <h1 className="landing-title">
          <i className="fas fa-clipboard-list" style={{ color: "#0077cc", marginRight: "12px" }}></i>
          Mis Notas
        </h1>
        <p className="landing-description">
          Consulta tus calificaciones y el estado de tus asignaturas.
        </p>
        <div className="landing-cards-container">
          {notasData.map((nota, idx) => (
            <div
              className="landing-card"
              key={nota.materia}
              style={{ cursor: "pointer" }}
              onClick={() => handleOpenModal(idx)}
            >
              <i className={`${nota.icono} fa-2x`} style={{ color: nota.color, marginBottom: "12px" }}></i>
              <h2>{nota.materia}</h2>
              <p>Nota: <strong>{nota.nota}</strong></p>
              <p>Estado: <span style={{ color: nota.estado.color }}>{nota.estado.texto}</span></p>
            </div>
          ))}
        </div>

        {/* Modal */}
        {openIndex !== null && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
            onClick={handleCloseModal}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "32px 24px",
                minWidth: "320px",
                maxWidth: "90vw",
                boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
                position: "relative",
              }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "16px",
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#888"
                }}
                aria-label="Cerrar"
              >
                &times;
              </button>
              <div style={{ textAlign: "center" }}>
                <i className={`${notasData[openIndex].icono} fa-2x`} style={{ color: notasData[openIndex].color, marginBottom: "12px" }}></i>
                <h2 style={{ margin: "8px 0" }}>{notasData[openIndex].materia}</h2>
                <p>Nota final: <strong>{notasData[openIndex].nota}</strong></p>
                <p>Estado: <span style={{ color: notasData[openIndex].estado.color }}>{notasData[openIndex].estado.texto}</span></p>
                <div style={{ marginTop: "18px", background: "#f6f8fa", borderRadius: "8px", padding: "10px" }}>
                  <strong>Desglose de notas:</strong>
                  <ul style={{ margin: "8px 0 0 0", padding: 0, listStyle: "none" }}>
                    {notasData[openIndex].desglose.map((item) => (
                      <li key={item.nombre} style={{ display: "flex", justifyContent: "space-between", padding: "2px 0" }}>
                        <span>{item.nombre}</span>
                        <span><strong>{item.valor}</strong></span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default NotasPage;