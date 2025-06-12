import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

// Variable para la API de estadísticas (actualizada)
const STATS_API_BASE_URL = "http://apiedu.onrender.com";

function Estadisticas() {
  const [imgUrls, setImgUrls] = useState([]);

  useEffect(() => {
    // Usa la API de estadísticas para los endpoints de los gráficos
    setImgUrls([
      `${STATS_API_BASE_URL}/estadisticas/usuarios-por-rol`,
      `${STATS_API_BASE_URL}/estadisticas/alumnos-por-curso`,
      `${STATS_API_BASE_URL}/estadisticas/promedio-notas-por-curso`,
      `${STATS_API_BASE_URL}/estadisticas/profesores-por-especialidad`
    ]);
  }, []);

  return (
    <div className="estadisticas-container">
      <h2><i className="fas fa-chart-bar"></i> Estadísticas Generales</h2>
      <p>Visualización de estadísticas generadas con pandas y matplotlib.</p>
      {imgUrls.map((imgUrl, idx) => (
        <div key={idx} style={{ marginBottom: 32 }}>
          <h4>{`Estadística ${idx + 1}`}</h4>
          <img
            src={imgUrl}
            alt={`Estadística ${idx + 1}`}
            style={{ maxWidth: "100%", borderRadius: 8, boxShadow: "0 2px 8px #0001" }}
          />
        </div>
      ))}
    </div>
  );
}

export default Estadisticas;
