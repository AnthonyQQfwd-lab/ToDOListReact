import React, { useEffect, useState, useRef } from 'react';

import { getUsuarios, createUsuarios, updateUsuario, deleteUsuario } from '../services/CRUD.jsx';

function TaskOutput({ usuarioProp }) {


    // ===== SECCIÓN 1: INICIALIZACIÓN DE ESTADOS =====
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));
    const [usuario, setUsuario] = useState(null);
    const [indiceActual, setIndiceActual] = useState(null);
    const [tareaEditada, setTareaEditada] = useState('');
    
    useEffect(() => {
        setUsuario(usuarioProp);
    }, [usuarioProp]);


    

    // ===== SECCIÓN 3: FUNCIÓN PARA ELIMINAR TAREA =====
        async function deleteTarea(i) {
        const nuevaLista = usuario.tasks.filter((_, index) => index !== i);
        const usuarioActualizado = { ...usuario, tasks: nuevaLista };
        
        const respuesta = await updateUsuario(usuario.id, { tasks: nuevaLista });
        console.log(respuesta)
        setUsuario(usuarioActualizado); // React detecta el cambio
    }


    // ===== SECCIÓN 4: FUNCIÓN PARA MOSTRAR MODAL DE EDICIÓN =====
    async function showModal()
    {
        modal.showModal()
    }

    function hideModal()
    {
        modal.close();
    }

    // ===== SECCIÓN 5: FUNCIÓN PARA EDITAR TAREA =====
    async function editTask() {

        if (tareaEditada.trim() == '')
        {
            alert("Por favor ingrese texto para editar la tarea")
        }
        else
        {
            const nuevaLista = [...usuario.tasks];
            nuevaLista[indiceActual] = tareaEditada;

            const usuarioActualizado = { ...usuario, tasks: nuevaLista };
            await updateUsuario(usuario.id, { tasks: nuevaLista });
            setUsuario(usuarioActualizado); // React detecta el cambio
            console.log("usuario",usuario)
            hideModal();
        }
    }


    // ===== SECCIÓN 7: RENDERIZADO DEL COMPONENTE =====
    return (
        <div>
            {/* Modal para editar tarea */}
            <dialog id="modal">
                <label htmlFor="">Editar Tarea:</label>
                <input type="text" value={tareaEditada} onChange={(e)=>setTareaEditada(e.target.value)}
                    onKeyDown={(e) => {if (e.key === 'Enter') { editTask();}}}
                />
                <button type="text" onClick={editTask}>Enviar</button>
                <button onClick={hideModal}>X</button>
            </dialog>

            {/* Lista de tareas del usuario */}
            <ul>
                {usuario?.tasks?.length > 0
                    ? usuario.tasks.map((tarea, i) => (
                        <li key={i}>
                        {tarea}
                        <button onClick={() => deleteTarea(i)}>Eliminar</button>
                        <button onClick={() => { showModal(); setIndiceActual(i); }}>Editar</button>
                        </li>
                    ))
                    : <li>No hay ninguna tarea</li>
                }
            </ul>

        </div>
    );
}

export default TaskOutput;