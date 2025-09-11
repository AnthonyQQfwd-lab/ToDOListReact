import React, { useEffect, useRef, useState } from 'react';
import { getUsuarios, createUsuarios, updateUsuario, deleteUsuario } from '../services/CRUD.jsx';

import TaskOutput from '../components/TaskOutput'

function TaskInput() {
  // ===== SECCIÓN 1: INICIALIZACIÓN DE ESTADOS Y VARIABLES =====
  const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState(null)
  const [tarea, setTarea] = useState("");
  
  // ===== SECCIÓN 2: EFECTO PARA CARGAR USUARIOS AL MONTAR COMPONENTE =====
  useEffect(() => {
  const fetchUsuario = async () => {
    try {
      const usuariosRecibidos = await getUsuarios();
      setUsuarios(usuariosRecibidos);

      const usuarioEncontrado = usuariosRecibidos.find(u =>
        u.gmail.trim().toLowerCase() === usuarioActual.email.trim().toLowerCase()
      );
      setUsuario(usuarioEncontrado);
      } catch (error) {
        console.error("Error al traer los usuarios del servicio", error);
      }
    };
    fetchUsuario();
  }, []);


  // ===== SECCIÓN 3: FUNCIÓN PARA CREAR Y GUARDAR NUEVA TAREA =====
  const cargarTarea = async () => {
  if (tarea.trim() !== '') {
    const listaTarea = usuario.tasks || [];
    listaTarea.push(tarea);
    const usuarioActualizado = { ...usuario, tasks: listaTarea };
    await updateUsuario(usuario.id, usuarioActualizado);
    setUsuario(usuarioActualizado); 
    setTarea(""); 
    } else {
      alert("Por favor especifique el nombre de la tarea");
    }
  };


  // ===== SECCIÓN 4: RENDERIZADO DEL COMPONENTE =====
  return (
      <div>
          <label htmlFor="">Tarea:</label>
          <input type="text" id="tarea" value={tarea} onChange={(e)=>setTarea(e.target.value)}
          onKeyDown={(e) => {if (e.key === 'Enter') { cargarTarea();}}}
          />
          <button onClick={cargarTarea}>Crear Tarea</button>
          
        <TaskOutput usuarioProp={usuario} />
      </div>
  );
}

export default TaskInput;