import React, { useEffect, useState } from 'react';
import { getUsuarios, updateUsuario } from '../services/CRUD.jsx';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import TaskOutput from '../components/TaskOutput';

function TaskInput() {
  const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [tarea, setTarea] = useState("");
  
  // Estado para controlar el modal
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const usuariosRecibidos = await getUsuarios();
        setUsuarios(usuariosRecibidos);

        const usuarioRecibido = usuariosRecibidos.find(u =>
          u.gmail.trim().toLowerCase() === usuarioActual.email.trim().toLowerCase()
        );
        setUsuario(usuarioRecibido);
      } catch (error) {
        console.error("Error al traer los usuarios del servicio", error);
      }
    };
    fetchUsuario();
  }, []);

  const cargarTarea = async () => {
    if (tarea.trim() !== '' && usuario) {
      const listaTarea = usuario.tasks || [];
      listaTarea.push(tarea);
      const usuarioActualizado = { ...usuario, tasks: listaTarea };
      await updateUsuario(usuario.id, usuarioActualizado);
      setUsuario(usuarioActualizado);
      setTarea(""); 
      setShow(false); // cerrar modal después de crear la tarea
    } else {
      alert("Por favor especifique el nombre de la tarea");
    }
  };

  return (
    <div>
      {/* Botón visible para abrir el modal */}
      <Button variant="success" onClick={() => setShow(true)}>
        Agregar tarea
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Escriba el nombre de la tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input 
            type="text" 
            value={tarea}
            onChange={(e)=>setTarea(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') cargarTarea(); }}
            className="form-control"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={cargarTarea}>
            Crear Tarea
          </Button>
        </Modal.Footer>
      </Modal>

      <TaskOutput usuarioProp={usuario} actualizarUsuario={setUsuario} />
    </div>
  );
}

export default TaskInput;
