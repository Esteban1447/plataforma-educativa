import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import { redirectAlert, errorAlert } from "../helpers/functions";

let apiUsers = "http://localhost:3000/usuarios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  let navigate = useNavigate();

  const registerUser = async (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    if (!username || !password || !name) {
      errorAlert(
        "Campos incompletos",
        "Por favor complete todos los campos",
        "error"
      );
      return;
    }

    try {
      // Verificar si el usuario ya existe
      const response = await fetch(apiUsers);
      const users = await response.json();
      const existingUser = users.find(
        (user) => user.usuario === username
      );

      if (existingUser) {
        errorAlert(
          "Usuario existente",
          "El nombre de usuario ya está en uso. Por favor elija otro.",
          "error"
        );
        return;
      }

      // Crear un nuevo usuario
      const newUser = {
        id: Date.now().toString(), // Generar un ID único
        nombre: name,
        usuario: username,
        contrasena: password,
      };

      await fetch(apiUsers, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      redirectAlert(
        navigate,
        "Registro exitoso",
        "Su cuenta ha sido creada correctamente. Redirigiendo al inicio de sesión...",
        "success",
        "/"
      );
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      errorAlert(
        "Error del servidor",
        "No se pudo completar el registro. Inténtelo de nuevo más tarde.",
        "error"
      );
    }
  };

  return (
    <form className="form" onSubmit={registerUser}>
      <span className="input-span">
        <label className="label">Nombre</label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          id="name"
          placeholder="Ingrese su nombre"
        />
      </span>
      <span className="input-span">
        <label className="label">Usuario</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          id="username"
          placeholder="Ingrese un nombre de usuario"
        />
      </span>
      <span className="input-span">
        <label className="label">Contraseña</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          id="password"
          placeholder="Ingrese una contraseña"
        />
      </span>
      <input className="submit" type="submit" value="Registrarse" />
      <span className="span">
        ¿Ya tienes una cuenta? <a href="/">Inicia sesión</a>
      </span>
    </form>
  );
};

export default Register;