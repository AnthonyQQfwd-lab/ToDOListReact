import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from '../pages/Login';
import Register from '../components/Register';
import TaskSManager from '../pages/TaskSManager';
const Routing = () => {
  return (
    
    <Router>
        <Routes>
            {/*path es como saldra en la url */}
            <Route path="/" element={<Login />} />
            {/*si se desea agregar otra ruta solamente se hace lo mismo pero con su respectivo path y elemento */}
            <Route path="/Register" element={<Register />} />
            <Route path="/TaskManager" element={<TaskSManager />} />
        </Routes>
    </Router>
  );
};

export default Routing