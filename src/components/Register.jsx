import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUsuarios, getUsuarios } from '../services/CRUD.jsx';

function Register() {
    // ===== SECCIÓN 1: INICIALIZACIÓN DE HOOKS Y REFERENCIAS =====
    const [usuarios, setusuarios] = useState([]);
    const navigate = useNavigate();
    const [gmail, setGmail] = useState('');
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');



    useEffect(() => {
            async function fetchUsuario() {
                const usuarios = await getUsuarios();
                setusuarios(usuarios);
            }
            fetchUsuario();
        }, []);


    async function registrarUsuario()
    {
        
            if (usuario == "" || gmail == "" || password == "") {
                alert("Rellene los espacios faltantes");
            } 
            else
            {
                const usuarioEncontrado = usuarios.find(u =>
                    u.gmail.trim().toLowerCase() === gmail.trim().toLowerCase()
                );

                
                console.log(usuarioEncontrado)
                if(usuarioEncontrado)
                {
                    alert("!El usuario ya esta registrado¡");
                }
                else
                {
                    
                    const usuarioNuevo = {
                        nombre: usuario,
                        gmail: gmail,
                        password: password,
                        tasks: []
                    };
                    await createUsuarios(usuarioNuevo);
                    
                    navigate('/');
                }
            }
        
    }


    //registrarUsuario <input type="text" id="tarea" value={tarea} onChange={(e)=>setTarea(e.target.value)}/>
    // ===== SECCIÓN 3: RENDERIZADO DEL FORMULARIO =====
    return (
        <div>
            <label>Nombre de usuario</label><br />
            <input type="text"  value={usuario} onChange={(e)=>setUsuario(e.target.value)}/><br />
            <label htmlFor="">Correo electronico</label><br />
            <input type="email" value={gmail} onChange={(e)=>setGmail(e.target.value)} /><br />
            <label htmlFor="">Contraseña</label><br />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} /><br />
            <button onClick={registrarUsuario}>Registrarse</button>

        </div>
        
    );
}

export default Register;