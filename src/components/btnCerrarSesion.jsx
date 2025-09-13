import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../styles/TodoListPage/BtnCerrarSesion.css"
function BtnCerrarSesion() {

    const navigate = useNavigate();
  return (
    <div id="btnContainer">
        
        <button onClick={() => navigate("/")}>cerrar sesión</button>
        
    </div>
  )
}

export default BtnCerrarSesion