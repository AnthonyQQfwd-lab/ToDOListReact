/* CRUD - Datos */

//(GET)
async function getUsuarios() {
    try {
        const peticion = await fetch('http://localhost:3004/Usuarios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!peticion.ok) {
            throw new Error("Error al obtener los usuarios");
        }

        const Usuarios = await peticion.json();
        return Usuarios;

    } catch (error) {
        console.error("Hay problemas para obtener", error);
        throw error;
    }
}

//(POST)
async function createUsuarios(nuevaUsuarios) {
    try {
        const peticion = await fetch('http://localhost:3004/Usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaUsuarios)
        });

        if (!peticion.ok) {
            throw new Error("Error al crear al Usuario");
        }

        const usuarioCreado = await peticion.json();


        return usuarioCreado;

    } catch (error) {
        console.error("Error al crear", error);
        throw error;
    }
}

//(PUT || PATCH)
async function updateUsuario(id, datosActualizados) {
    try {
        const peticion = await fetch(`http://localhost:3004/Usuarios/${id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosActualizados)
        });

        if (!peticion.ok) {
            throw new Error("Error al actualizar la Dato");
        }

        const usariosActualizada = await peticion.json();
        return usariosActualizada;

    } catch (error) {
        console.error("Problema existente", error);
        throw error;
    }
}

//(DELETE)
async function deleteUsuario(id) {
    try {
        const peticion = await fetch(`http://localhost:3004/Usuarios/${id}`, {
            method: 'DELETE'
        });

        if (!peticion.ok) {
            throw new Error("Error al eliminar la Dato");
        }

        return { mensaje: "Dato eliminada correctamente" };

    } catch (error) {
        console.error("Problema existente", error);
        throw error;
    }
}

export { getUsuarios, createUsuarios, updateUsuario, deleteUsuario};