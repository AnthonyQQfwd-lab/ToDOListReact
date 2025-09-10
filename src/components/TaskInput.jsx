import React, { useEffect, useRef, useState } from 'react';
import { getUsuarios, createUsuarios, updateUsuario, deleteUsuario } from '../services/CRUD.jsx';

import TaskOutput from '../components/TaskOutput'

function TaskInput() {
  // ===== SECCIÓN 1: INICIALIZACIÓN DE ESTADOS Y VARIABLES =====
  const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState([])
  const [tarea, setTarea] = useState("");
  
  // ===== SECCIÓN 2: EFECTO PARA CARGAR USUARIOS AL MONTAR COMPONENTE =====
  useEffect(() =>{
    const fetchUsuario = async () =>{

      try {
        const usuariosRecibidos = await getUsuarios();
        setUsuarios(usuariosRecibidos);
      } catch (error) {
        console.error("Error al traer los usuarios del servicio", error)
      }

    }
    fetchUsuario();
  }, [])

  useEffect(() =>{
    const fetchUsuario = async () =>{

      try {
        const usuariosRecibidos = await getUsuarios();
        const usuarioEncontrado = usuarios.find(u =>
            u.gmail.trim().toLowerCase() === gmail.trim().toLowerCase()
        );
        setUsuario(usuarioEncontrado)

        setUsuarios(usuariosRecibidos);
      } catch (error) {
        console.error("Error al traer los usuarios del servicio", error)
      }

    }
    fetchUsuario();
  }, [])

  // ===== SECCIÓN 3: FUNCIÓN PARA CREAR Y GUARDAR NUEVA TAREA =====
  const cargarTarea = async () =>
  {
    
    if (tarea.trim() !== '')
    {
      const usuarioBuscado = usuarios.find(u => u.gmail === usuarioActual.email);
      console.log(usuarioBuscado)

      const listaTarea = usuarioBuscado.tasks || [];
      listaTarea.push(tarea)
      usuarioBuscado.tasks = listaTarea;
      await updateUsuario(usuarioBuscado.id, usuarioBuscado);
      setUsuarios([...usuarios,usuarioBuscado])
      console.log(usuarios)

    }
    else
    {
      alert("por favor especifique el nombre de la tarea")
    }
  }

  // ===== SECCIÓN 4: RENDERIZADO DEL COMPONENTE =====
  return (
      <div>
          <label htmlFor="">Tarea:</label>
          <input type="text" id="tarea" value={tarea} onChange={(e)=>setTarea(e.target.value)}/>
          <button onClick={cargarTarea}>Crear Tarea</button>
          
        <TaskOutput usuario={usuario}/>
      </div>
  );
}

export default TaskInput;