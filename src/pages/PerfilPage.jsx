import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import "./PerfilPage.css";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";
import { errorAlert } from "../helpers/functions";

function PerfilPage() {
  // Obtener datos del usuario autenticado desde localStorage
  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    rol: "",
    avatar: "",
    grado: "",
    fechaNacimiento: "",
    direccion: "",
    telefono: ""
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Cargar datos del usuario desde localStorage
    const nombre = localStorage.getItem("userName") || "";
    const correo = localStorage.getItem("userEmail") || "";
    const rol = localStorage.getItem("userType") === "Student" ? "Estudiante" : (localStorage.getItem("userType") === "Teacher" ? "Profesor" : localStorage.getItem("userType") || "");
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(nombre)}`;
    const grado = localStorage.getItem("userGrade") || "";
    const fechaNacimiento = localStorage.getItem("userBornDate") || "";
    const direccion = localStorage.getItem("userDirection") || "";
    const telefono = localStorage.getItem("userPhone") || "";
    setUsuario({
      nombre,
      correo,
      rol,
      avatar,
      grado,
      fechaNacimiento,
      direccion,
      telefono
    });
  }, []);

  const handleSave = async () => {
    if (!newPassword || !confirmPassword) {
      errorAlert("Error", "Debes ingresar y confirmar la nueva contraseña", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      errorAlert("Error", "Las contraseñas no coinciden", "error");
      return;
    }
    setSaving(true);
    try {
      const userId = localStorage.getItem("userId");
      // Obtener datos actuales del usuario
      const userRes = await fetch(`${API_BASE_URL}/users/${userId}`);
      if (!userRes.ok) throw new Error("No se pudo obtener el usuario");
      const userData = await userRes.json();

      // Enviar todos los datos previos, reemplazando solo password
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...userData,
          password: newPassword
        }),
      });
      if (!response.ok) throw new Error("No se pudo actualizar la contraseña");
      errorAlert("Éxito", "Contraseña actualizada correctamente", "success");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      errorAlert("Error", "No se pudo actualizar la contraseña", "error");
    } finally {
      setSaving(false);
    }
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
            <form className="perfil-form" onSubmit={e => e.preventDefault()}>
              <div className="perfil-form-group">
                <label>
                  Correo electrónico
                  <input
                    type="email"
                    defaultValue={usuario.correo}
                    disabled
                  />
                </label>
              </div>
              <div className="perfil-form-group">
                <label>
                  Rol
                  <select defaultValue={usuario.rol} disabled>
                    <option value="Estudiante">Estudiante</option>
                    <option value="Profesor">Profesor</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                </label>
              </div>
              {usuario.rol === "Estudiante" && (
                <>
                  <div className="perfil-form-group">
                    <label>
                      Grado
                      <input
                        type="text"
                        defaultValue={usuario.grado}
                        disabled
                      />
                    </label>
                  </div>
                  <div className="perfil-form-group">
                    <label>
                      Fecha de nacimiento
                      <input
                        type="date"
                        defaultValue={usuario.fechaNacimiento}
                        disabled
                      />
                    </label>
                  </div>
                  <div className="perfil-form-group">
                    <label>
                      Dirección
                      <input
                        type="text"
                        defaultValue={usuario.direccion}
                        disabled
                      />
                    </label>
                  </div>
                </>
              )}
              <div className="perfil-form-group">
                <label>
                  Teléfono
                  <input
                    type="text"
                    defaultValue={usuario.telefono}
                    disabled
                  />
                </label>
              </div>
              <div className="perfil-form-group">
                <label>
                  Nueva contraseña
                  <input
                    type="password"
                    placeholder="********"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                </label>
              </div>
              <div className="perfil-form-group">
                <label>
                  Confirmar contraseña
                  <input
                    type="password"
                    placeholder="********"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </label>
              </div>
              <button
                type="button"
                className="perfil-btn"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Guardando..." : "Guardar cambios"}
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