import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { generateToken } from '../helpers/functions';


const Login = () => {

let navigate = useNavigate();

function buscarUsuario() {
    return true; // Simulación de búsqueda de usuario en la base de datos
}

function inicioSesion(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    if (buscarUsuario()) {
        let tokenAcceso = generateToken();
        localStorage.setItem("token", tokenAcceso);
        navigate("/home"); // Redirigir a la página de inicio después de iniciar sesión
    }
}

    return (
            <form className="form">
                <span className="input-span">
                    <label className="label">Email</label>
                    <input type="email" name="email" id="email" /></span>
                <span className="input-span">
                    <label className="label">Password</label>
                    <input type="password" name="password" id="password" /></span>
                <span className="span"><a href="#">Forgot password?</a></span>
                <input className="submit" type="submit" onClick={inicioSesion} defaultValue="Log in" />
                <span className="span">Don't have an account? <a href="#">Sign up</a></span>
            </form>

    );

}

export default Login;