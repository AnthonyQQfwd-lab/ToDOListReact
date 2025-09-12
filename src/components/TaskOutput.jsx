import React, { useEffect, useState, useRef } from 'react';

import { getUsuarios, createUsuarios, updateUsuario, deleteUsuario } from '../services/CRUD.jsx';

function TaskOutput({ usuarioProp, actualizarUsuario}) {


    // ===== SECCIÓN 1: INICIALIZACIÓN DE ESTADOS =====
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));
    const [indiceActual, setIndiceActual] = useState(null);
    const [tareaEditada, setTareaEditada] = useState('');
    const [tareaAEliminar, setTareaAEliminar] = useState('');
    
    // ===== SECCIÓN 3: FUNCIÓN PARA ELIMINAR TAREA =====
    async function deleteTarea() {
        
        const nuevaLista = usuarioProp.tasks.filter((_, index) => index !== indiceActual);
        const usuarioActualizado = { ...usuarioProp, tasks: nuevaLista };
        
        const respuesta = await updateUsuario(usuarioProp.id, { tasks: nuevaLista });
        console.log("respuesta del json",respuesta)
        console.log("usuario actualizado", usuarioActualizado)
        console.log("usuarioProp",usuarioProp)
        actualizarUsuario(usuarioActualizado) // React detecta el cambio
        deleteModal.close()
    }


    // ===== SECCIÓN 4: FUNCIÓN PARA MOSTRAR MODAL DE EDICIÓN y ELIMINACION =====
    async function showModal(i)
    {
        setIndiceActual(i)
        setTareaEditada(usuarioProp.tasks[i])
        modal.showModal()
    }
    
    function hideModal()
    {
        modal.close();
    }

    function showDeleteModal(i)
    {
        setIndiceActual(i)
        setTareaAEliminar(usuarioProp.tasks[i])
        deleteModal.showModal()
    }

    function hideDeleteModal()
    {
        deleteModal.close();
    }

    // ===== SECCIÓN 5: FUNCIÓN PARA EDITAR TAREA =====
    async function editTask() {

        if (tareaEditada.trim() == '')
        {
            alert("Por favor ingrese texto para editar la tarea")
        }
        else
        {
            const nuevaLista = [...usuarioProp.tasks];
            nuevaLista[indiceActual] = tareaEditada;

            const usuarioActualizado = { ...usuarioProp, tasks: nuevaLista };
            await updateUsuario(usuarioProp.id, { tasks: nuevaLista });
            actualizarUsuario(usuarioActualizado) // React detecta el cambio
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
            <dialog id='deleteModal'>
                    <label>Esta seguro de querer eliminar la tarea?</label><br />
                    <p>Tarea: {tareaAEliminar} </p>
                    <button onClick={deleteTarea} >Corfirmar</button><button onClick={() => hideDeleteModal()}>Denegar</button>
            </dialog>

            {/* Lista de tareas del usuario */}
            <ul>
                {usuarioProp?.tasks?.length > 0
                    ? usuarioProp.tasks.map((tarea, i) => (
                        <li key={i}>
                        {tarea}
                        <button onClick={() => showDeleteModal(i)}>Eliminar</button>
                        <button onClick={() =>  showModal(i)  }>Editar</button>
                        </li>
                    ))
                    : <li>No hay ninguna tarea  </li>
                }
            </ul>

        </div>
    );
}

export default TaskOutput;