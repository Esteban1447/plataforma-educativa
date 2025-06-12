import React from 'react';
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { redirectAlert, errorAlert } from '../helpers/functions';
import { API_BASE_URL } from '../config/api';

const API_URL = `${API_BASE_URL}/users`;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log('[Login] Attempting login with email:', username);

        try {
            console.log('[Login] Sending request to:', `${API_BASE_URL}/grades/login`);
            const response = await fetch(`${API_BASE_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: username,
                    password: password
                }),
            });

            if (!response.ok) {
                console.error('[Login] Authentication failed:', response.status);
                throw new Error('Error en la autenticación');
            }

            const user = await response.json();
            console.log('[Login] Authentication successful:', user);

            // Almacenar datos del usuario
            localStorage.setItem("userId", user.id);
            localStorage.setItem("userName", user.name);
            localStorage.setItem("userType", user.userType);
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("token", user.token || "dummy-token");

            // Si es profesor, obtener el teacherId desde /teachers?userId={user.id}
            if (user.userType === "Teacher") {
                try {
                    const teacherRes = await fetch(`${API_BASE_URL}/teachers?userId=${user.id}`);
                    if (teacherRes.ok) {
                        const teachers = await teacherRes.json();
                        const teacherArr = Array.isArray(teachers) ? teachers : [teachers];
                        if (teacherArr.length > 0 && teacherArr[0].id) {
                            localStorage.setItem("teacherId", String(teacherArr[0].id));
                        } else {
                            localStorage.removeItem("teacherId");
                        }
                    } else {
                        localStorage.removeItem("teacherId");
                    }
                } catch (e) {
                    localStorage.removeItem("teacherId");
                }
            } else {
                localStorage.removeItem("teacherId");
            }

            // Si es estudiante, obtener el studentId desde /students?userId={user.id}
            if (user.userType === "Student") {
                try {
                    const studentRes = await fetch(`${API_BASE_URL}/students?userId=${user.id}`);
                    if (studentRes.ok) {
                        const students = await studentRes.json();
                        const studentArr = Array.isArray(students) ? students : [students];
                        if (studentArr.length > 0 && studentArr[0].id) {
                            localStorage.setItem("studentId", String(studentArr[0].id));
                        } else {
                            localStorage.removeItem("studentId");
                        }
                    } else {
                        localStorage.removeItem("studentId");
                    }
                } catch (e) {
                    localStorage.removeItem("studentId");
                }
            } else {
                localStorage.removeItem("studentId");
            }
            console.log('[Login] User data stored in localStorage');

            redirectAlert(
                navigate,
                `Bienvenido ${user.name}`,
                `Has ingresado como ${user.userType === 'Student' ? 'Estudiante' : 'Profesor'}`,
                "success",
                "/home"
            );

        } catch (error) {
            console.error('[Login] Error during login:', error);
            errorAlert(
                "Credenciales incorrectas",
                "Por favor verifique su email y contraseña",
                "error"
            );
        }
    }

    return (
        <form className="form">
            <span className="input-span">
                <label className="label">Email</label>
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="correo@ejemplo.com"
                />
            </span>
            <span className="input-span">
                <label className="label">Contraseña</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="********"
                />
            </span>

            <input className="submit" type="submit" onClick={handleLogin} value="Iniciar Sesión" />

        </form>
    );
}

export default Login;
