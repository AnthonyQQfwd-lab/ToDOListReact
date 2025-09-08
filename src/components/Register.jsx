import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import {createUsuarios, getUsuarios} from '../services/CRUD.jsx'
function Register() {
        const navigate = useNavigate();
        const usuario = useRef();
        const gmail = useRef();
        const password = useRef()



        const handleSubmit = async (evento) => {
            evento.preventDefault();

            const usuarioRecibidos = await getUsuarios();

            if(usuario.current.value == "" || gmail.current.value == "" || password.current.value == "")
            {
                alert("Rellene los esapcios faltantes")
            }
            else
            {
                const usuarioRecibidos = await getUsuarios();

                const usuarioEncontrado = usuarioRecibidos.filter(u => 
                    u.gmail.trim().toLowerCase() === gmail.current.value
                );

                
                if (usuarioEncontrado.length > 0) {
                    alert("EL usuario ya esta registrado")
                } else {
                    

                    const usuarioNuevo =
                    {
                        nombre: usuario.current.value,
                        gmail: gmail.current.value,
                        password: password.current.value,
                        tasks: []
                    }
                    const usuarioGuardado = await createUsuarios(usuarioNuevo);
                    
                    usuario.current.value = "";
                    gmail.current.value = "";
                    password.current.value = "";
                    navigate('/');


                }
            }
        }
   






  return (
    <form onSubmit={handleSubmit}>

        <label htmlFor="">Nombre de usuario</label><br />
        <input type="text" ref={usuario}/><br />
        <label htmlFor="">Correo electronico</label><br />
        <input type="email" ref={gmail}/><br />
        <label htmlFor="">Contraseña</label><br />
        <input type="password" ref={password}/><br />

        <button type="submit" >Registrarse</button>
    </form>
  )
}

export default Register