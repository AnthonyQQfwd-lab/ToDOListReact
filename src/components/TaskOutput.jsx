import React, { useEffect, useState, useRef } from 'react';

import { getUsuarios, createUsuarios, updateUsuario, deleteUsuario } from '../services/CRUD.jsx';

function TaskOutput(usuarioInfo) {

    console.log(usuarioInfo)

    // ===== SECCIÓN 1: INICIALIZACIÓN DE ESTADOS =====
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));
    const [usuario, setUsuario] = useState(null);
    const [indiceActual, setIndiceActual] = useState(null);
    const [tareaEditada, setTareaEditada] = useState("");
    
    
    

    // ===== SECCIÓN 3: FUNCIÓN PARA ELIMINAR TAREA =====
    async function deleteTarea(i)
    {
        usuario.tasks.splice(i,1)
        const TasksList = usuario.tasks
        await updateUsuario(
            usuario.id, 
            { tasks: TasksList }
        )
        
    }

    // ===== SECCIÓN 4: FUNCIÓN PARA MOSTRAR MODAL DE EDICIÓN =====
    async function showModal()
    {
        modal.showModal()
    }

    // ===== SECCIÓN 5: FUNCIÓN PARA EDITAR TAREA =====
    async function editTask()
        {
            console.log("indece actual", indiceActual)
            usuario.tasks[indiceActual] = tareaEditada
            const tasksList = usuario.tasks
            await updateUsuario(
                usuario.id, 
                { tasks: tasksList }
            )
        
        }

    // ===== SECCIÓN 6: FUNCIÓN PARA CERRAR MODAL =====
    function hideModal()
    {
        modal.close();
    }

    // ===== SECCIÓN 7: RENDERIZADO DEL COMPONENTE =====
    return (
        <div>
            {/* Modal para editar tarea */}
            <dialog id="modal">
                <label htmlFor="">Editar Tarea:</label>
                <input type="text" value={tareaEditada} onChange={(e)=>setTareaEditada(e.target.value)}/>
                <button type="text" onClick={editTask}>Enviar</button>
                <button onClick={hideModal}>X</button>
            </dialog>

            {/* Lista de tareas del usuario */}
            <ul>
                {usuarioInfo?.tasks?.length > 0
                    ? usuarioInfo.tasks.map((tarea, i) => (
                        <li key={i}>{tarea}
                            <button onClick={() => deleteTarea(i)}>Eliminar</button>
                            <button onClick={() => {showModal(); setIndiceActual(i);}}>Editar</button>
                        </li>
                    ))
                    : <li>No hay ninguna tarea</li>
                }
                
            </ul>
        </div>
    );
}

export default TaskOutput;