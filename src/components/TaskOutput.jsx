import React, { useEffect, useState } from 'react';
import { getUsuarios } from '../services/CRUD.jsx';

const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));

function TaskOutput() {
    const [usuarioBuscado, setUsuarioBuscado] = useState(null);

    useEffect(() => {
    async function fetchUsuario() {
        const usuarios = await getUsuarios();
        const encontrado = usuarios.find(u => u.gmail === usuarioActual.email);
        setUsuarioBuscado(encontrado);
    }
    fetchUsuario();
    }, []);

    return (
    <div>
        <ul>
        {usuarioBuscado?.tasks?.map((task, i) => (
            <li key={i}>{task}</li>
        ))}
        </ul>
    </div>
    );
}

export default TaskOutput;
