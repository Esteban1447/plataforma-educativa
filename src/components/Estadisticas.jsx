import React from "react";

function Estadisticas() {
  // Puedes cambiar la ruta de la imagen según donde la guardes (ej: /public/stats.png)
  return (
    <div className="estadisticas-container">
      <h2><i className="fas fa-chart-bar"></i> Estadísticas Generales</h2>
      <p>Visualización de estadísticas generadas con pandas y matplotlib.</p>
      <img
        src="/stats.png"
        alt="Estadísticas generadas"
        style={{ maxWidth: "100%", borderRadius: 8, boxShadow: "0 2px 8px #0001" }}
      />
    </div>
  );
}

export default Estadisticas;
