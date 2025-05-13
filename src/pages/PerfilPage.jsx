import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import "./PerfilPage.css";

function PerfilPage() {
  // Datos de ejemplo, reemplaza por los del usuario autenticado
  const usuario = {
    nombre: "Juan Pérez",
    correo: "juan.perez@email.com",
    rol: "Estudiante",
    avatar: "https://ui-avatars.com/api/?name=Juan+Pérez"
  };

  return (
    <>
      <MainHeader />
      <main>
        <div className="perfil-container">
          <div className="perfil-card">
            <img
              src={usuario.avatar}
              alt="Avatar"
              className="perfil-avatar"
            />
            <h2 className="perfil-nombre">{usuario.nombre}</h2>
            <form className="perfil-form">
              <div className="perfil-form-group">
                <label>
                  Correo electrónico
                  <input
                    type="email"
                    defaultValue={usuario.correo}
                  />
                </label>
              </div>
              <div className="perfil-form-group">
                <label>
                  Rol
                  <select defaultValue={usuario.rol} disabled>
                    <option value="Estudiante">Estudiante</option>
                    <option value="Profesor">Profesor</option>
                  </select>
                </label>
              </div>
              <div className="perfil-form-group">
                <label>
                  Nueva contraseña
                  <input
                    type="password"
                    placeholder="********"
                  />
                </label>
              </div>
              <div className="perfil-form-group">
                <label>
                  Confirmar contraseña
                  <input
                    type="password"
                    placeholder="********"
                  />
                </label>
              </div>
              <button
                type="button"
                className="perfil-btn"
              >
                Guardar cambios
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default PerfilPage;