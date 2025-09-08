import React,  { useRef } from 'react'
import { getUsuarios, createUsuarios, updateUsuario, deleteUsuario } from '../services/CRUD.jsx'


const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));

function TaskInput() {
    const task = useRef();

    async function createTask()
    {
        const usuarios = await getUsuarios();
        const usuarioBuscado = usuarios.find(u => u.gmail === usuarioActual.email );
        console.log(usuarioBuscado);
        let taskList = usuarioBuscado.tasks
        taskList.push(task.current.value)

        console.log(taskList)
        usuarioBuscado.tasks = taskList
        await updateUsuario(usuarioBuscado.id, usuarioBuscado);
    }

    
  return (
    <div>
        <label htmlFor="">Tarea:</label>
        <input type="text" ref={task} />
        <button onClick={createTask}>Crear Tarea</button>
        
    </div>
  )
}

export default TaskInput