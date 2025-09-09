import React from 'react'
import TaskInput from '../components/TaskInput'
import TaskOutput from '../components/TaskOutput'
import BtnCerrarSesion from '../components/btnCerrarSesion'
import '../styles/TodoListPage/TaskManager.css'

function TaskSManager() {
  return (
    <div>TaskSManager
        
        <TaskInput />
        <BtnCerrarSesion />
        <div id="taskOutputContainer">
            <TaskOutput />
        </div>
        
    </div>
  )
}

export default TaskSManager