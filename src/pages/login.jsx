import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { redirectAlert, errorAlert, generateToken } from '../helpers/functions';
let apiUsers = "http://localhost:3000/usuarios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginTime, setLoginTime] = useState(null);
    const [users, setUsers] = useState([]);
    let navigate = useNavigate();

    function fetchUsers() {
        fetch(apiUsers)
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.log(error));
    }
    useEffect(() => {
        fetchUsers();
    }, []);

    function findUser() {
        let foundUser = users.find(
            (user) =>
                username === user.usuario && password === user.contrasena
        );
        return foundUser;
    }

    function login(event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
        if (findUser()) {
            let accessToken = generateToken();
            localStorage.setItem("token", accessToken);
            redirectAlert(
                navigate,
                "Bienvenido " + findUser().nombre,
                "En breves segundos será redireccionado al Home",
                "success",
                "/home"
            );

            let startTime = new Date();
            console.log(startTime);
        } else {
            errorAlert("Credenciales incorrectas", "Por favor verifique sus credenciales", "error");
        }
    }

    return (
        <form className="form">
            <span className="input-span">
                <label className="label">Usuario</label>
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    name="username"
                    id="username" />
            </span>
            <span className="input-span">
                <label className="label">Password</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password" />
            </span>
            <span className="span"><a href="#">Forgot password?</a></span>
            <input className="submit" type="submit" onClick={login} defaultValue="Log in" />
            <span className="span">Don't have an account? <Link to="/register">Sign up</Link></span>
        </form>
    );
}

export default Login;