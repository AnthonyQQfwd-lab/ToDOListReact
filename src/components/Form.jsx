import React,  { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import {getUsuarios} from '../services/CRUD.jsx'
import "../styles/LoginPage/Login.css";
function Form() {
    const gmail = useRef();
    const password = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (evento) => {
        evento.preventDefault();
        const usuarioRecibidos = await getUsuarios();

        const usuario = usuarioRecibidos.find(u => 
            u.gmail.trim().toLowerCase() === gmail.current.value.trim().toLowerCase() &&
            u.password === password.current.value
        );


        if (usuario) 
        {
            alert("Inicio de sesión exitoso");
            sessionStorage.setItem('usuarioActual', JSON.stringify({
                nombre: usuario.nombre,
                email: usuario.gmail,
                password: usuario.password
            }));
            navigate('/TaskManager');
        } else {
            alert("Usuario o contraseña incorrectos");
        }


    }


  return (
    <div>
        
        <form onSubmit={handleSubmit}>
            <label htmlFor="">Correo electronico</label><br />
            <input type="text" placeholder='Gmail' ref={gmail}/><br />
            <label htmlFor="">Contraseña</label><br />
            <input type="password" placeholder='Contraseña' ref={password}/><br />
            <div id="btnsContainer">
                <button type='submit' >Iniciar sesion</button>
                <button onClick={() => navigate("/Register")}>Registrarse</button>

            </div>
        </form>

        
        

    </div>
  )
}

export default Form