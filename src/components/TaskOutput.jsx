import React, { useEffect, useState, useRef } from 'react';

import { getUsuarios, createUsuarios, updateUsuario, deleteUsuario } from '../services/CRUD.jsx';

function TaskOutput() {
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));
    const [usuarioBuscado, setUsuarioBuscado] = useState(null);
    const taskEdit = useRef();
    useEffect(() => {
        async function fetchUsuario() {
            const usuarios = await getUsuarios();
            const encontrado = usuarios.find(u => u.gmail === usuarioActual.email);
            setUsuarioBuscado(encontrado);
        }
        fetchUsuario();
    }, []);

    async function deleteTask(i)
    {
        
        console.log("indice en", i)
        const usuarios = await getUsuarios();
        const usuarioBuscado = usuarios.find(u => u.gmail === usuarioActual.email);
        
        console.log("todas las tareas", usuarioBuscado.tasks)
        console.log("tarea para eliminar", usuarioBuscado.tasks[i])

        usuarioBuscado.tasks.splice(i,1)

        const TasksList = usuarioBuscado.tasks

        console.log("lista de tarea ya eliminada", TasksList )
        await updateUsuario(
            usuarioBuscado.id, 
            { tasks: TasksList }
        )
        window.location.reload();
    }


    async function showModal(i)
    {
        modal.showModal()
        


        async function editTask(i)
        {
            const usuarios = await getUsuarios();
            const usuarioBuscado = usuarios.find(u => u.gmail === usuarioActual.email);
            usuarioBuscado.tasks[i] = taskEdit.current.value
            const TasksList = usuarioBuscado.tasks
            console.log("lista de tarea ya editada", TasksList )
            await updateUsuario(
                usuarioBuscado.id, 
                { tasks: TasksList }
            )
            window.location.reload();


        }

        return {editTask}
    }

    function hideModal()
    {
        modal.close();
    }

    

    return (
        <div>
            <dialog id="modal">
                <label htmlFor="">Editar Tarea:</label>
                <input type="text" ref={taskEdit}/>
                <button onClick={() => editTask(i)}>enviar</button>
                <button onClick={hideModal}>X</button>
            </dialog>

            <ul>
                {usuarioBuscado?.tasks?.length > 0
                    ? usuarioBuscado.tasks.map((task, i) => (
                        <li key={i}>{task}
                            <button onClick={() => deleteTask(i)}>Eliminar</button>
                            <button onClick={() => showModal(i)}>Editar</button>
                        </li>
                    ))
                    : <li>No hay ninguna tarea</li>
                }
            </ul>
        </div>
    );
}

export default TaskOutput;