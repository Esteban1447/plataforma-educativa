import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import "./ContactoPage.css";
import { useState } from "react";
import { errorAlert } from "../helpers/functions";

function ContactoPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    errorAlert("¡Mensaje enviado!", "Tu mensaje ha sido enviado correctamente. Pronto nos pondremos en contacto contigo.", "success");
  };

  return (
    <>
      <MainHeader />
      <main>
        <div className="contacto-container">
          <div className="contacto-card">
            <h1>
              <i className="fas fa-envelope" style={{ color: "#0077cc", marginRight: 10 }}></i>
              Contacto
            </h1>
            <p>
              ¿Tienes dudas, sugerencias o necesitas soporte? ¡Contáctanos!
            </p>
            <form className="contacto-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Tu nombre"
                required
              />
              <input
                type="email"
                placeholder="Tu correo electrónico"
                required
              />
              <textarea
                placeholder="Escribe tu mensaje"
                required
                rows={5}
              />
              <button
                type="submit"
                className="contacto-btn"
                disabled={sent}
              >
                {sent ? "Mensaje enviado" : "Enviar mensaje"}
              </button>
            </form>
            <hr style={{ margin: "32px 0" }} />
            <p className="contacto-mail">
              También puedes escribirnos a <a href="mailto:soporte@eduplatform.com">soporte@eduplatform.com</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ContactoPage;