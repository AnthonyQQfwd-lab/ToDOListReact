import React from 'react'
import TaskInput from '../components/TaskInput'
import TaskOutput from '../components/TaskOutput'
import BtnCerrarSesion from '../components/btnCerrarSesion'

function TaskSManager() {
  return (
    <div>TaskSManager
        
        <TaskInput />
        <BtnCerrarSesion />
        <TaskOutput />
    </div>
  )
}

export default TaskSManager