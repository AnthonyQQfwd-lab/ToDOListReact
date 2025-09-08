import React from 'react'
import { useNavigate } from 'react-router-dom';
function BtnCerrarSesion() {

    const navigate = useNavigate();
  return (
    <div>
        
        <button onClick={() => navigate("/")}>cerrar sesion</button>

    </div>
  )
}

export default BtnCerrarSesion