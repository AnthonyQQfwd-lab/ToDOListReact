import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUsuarios } from '../services/CRUD.jsx';
import { Link } from 'react-router-dom';


function Form() {
    // ===== SECCIÓN  INICIALIZACIÓN DE REFERENCIAS Y HOOKS =====
    const [usuario, setUsuario] = useState(null);
    const [usuarios, setUsuarios] = useState([])
    const [gmail, setGmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    // ===== SECCIÓN 1: EFECTO PARA CARGAR USUARIOs AL MONTAR COMPONENTE =====
    
    useEffect(() => {
            async function fetchUsuarios() {
                const usuarios = await getUsuarios();
                setUsuarios(usuarios);
            }
            fetchUsuarios();
        }, []);
    
    function iniciarSesion()
    {
        const usuarioVerificado = usuarios.find(u => 
            u.gmail.trim().toLowerCase() === gmail.trim().toLowerCase() &&
            u.password === password
        );
        console.log(gmail, password)
        if(usuarioVerificado)
        {
            alert("Inicio de sesión exitoso");
            sessionStorage.setItem('usuarioActual', JSON.stringify({
                nombre: usuarioVerificado.nombre,
                email: usuarioVerificado.gmail,
                password: usuarioVerificado.password
            }));
            navigate('/TaskManager');
        }
        else
        {
            alert("Usuario o contraseña incorrectos");
        }
    }

    // ===== SECCIÓN 3: RENDERIZADO DEL FORMULARIO DE LOGIN =====
    return (
        <div>
            <div>
                <label>Correo electronico</label><br />
                <input type="text" placeholder='Gmail' value={gmail} onChange={(e)=>setGmail(e.target.value)} autoComplete="off"/><br />
                <label htmlFor="">Contraseña</label><br />
                <input type="password" placeholder='Contraseña' value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete="off"/><br />
            </div>
            <div id="btnsContainer">
                    <button onClick={iniciarSesion}>Iniciar sesion</button>
                    <p>¿No tienes cuenta? registrate aqui<br />
                        <Link to="/Register">Registrar</Link>
                    </p>
                    
            </div>
        </div>
    );
}

export default Form;