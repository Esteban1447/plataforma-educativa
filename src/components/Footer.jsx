import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <span>© {new Date().getFullYear()} EduPlatform. Todos los derechos reservados.</span>
        <span>
          Desarrollado por el equipo de plataforma educativa.
        </span>
      </div>
    </footer>
  );
}

export default Footer;