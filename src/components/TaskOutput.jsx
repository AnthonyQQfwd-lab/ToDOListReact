import React, { useState } from 'react';
import { updateUsuario } from '../services/CRUD.jsx';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { ModalBody, ModalHeader } from 'react-bootstrap';

function TaskOutput({ usuarioProp, actualizarUsuario }) {
  const [indiceActual, setIndiceActual] = useState(null);
  const [tareaEditada, setTareaEditada] = useState('');
  const [tareaAEliminar, setTareaAEliminar] = useState('');
  
  // Estados para mostrar/ocultar modales
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // Abrir modal de edición
  function showModal(i) {
    setIndiceActual(i);
    setTareaEditada(usuarioProp.tasks[i]);
    setShowEdit(true);
  }

  // Abrir modal de eliminar
  function showDeleteModal(i) {
    setIndiceActual(i);
    setTareaAEliminar(usuarioProp.tasks[i]);
    setShowDelete(true);
  }

  // Editar tarea
  async function editTask() {
    if (tareaEditada.trim() === '') {
      alert('Por favor ingrese texto para editar la tarea');
    } else {
      const nuevaLista = [...usuarioProp.tasks];
      nuevaLista[indiceActual] = tareaEditada;

      const usuarioActualizado = { ...usuarioProp, tasks: nuevaLista };
      await updateUsuario(usuarioProp.id, { tasks: nuevaLista });
      actualizarUsuario(usuarioActualizado);
      setShowEdit(false);
    }
  }

  // Eliminar tarea
  async function deleteTarea() {
    const nuevaLista = usuarioProp.tasks.filter((_, index) => index !== indiceActual);
    const usuarioActualizado = { ...usuarioProp, tasks: nuevaLista };

    await updateUsuario(usuarioProp.id, { tasks: nuevaLista });
    actualizarUsuario(usuarioActualizado);
    setShowDelete(false);
  }

  return (
    <div>
        



      {/* Modal de edición */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Editar tarea</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                    type="text"
                    value={tareaEditada}
                    onChange={(e) => setTareaEditada(e.target.value)}
                    onKeyDown={(e) => {
                    if (e.key === 'Enter') editTask();
                    }}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEdit(false)}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={editTask}>
                    Guardar
                </Button>
            </Modal.Footer>
      </Modal>

      {/* Modal de eliminación */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Está seguro de eliminar esta tarea?</p>
          <p><strong>{tareaAEliminar}</strong></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={deleteTarea}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      
      {/* Lista de tareas */}
      {usuarioProp?.tasks?.length > 0 ? (
        usuarioProp.tasks.map((tarea, i) => (
          <Card key={i} className="mb-2 p-2 shadow-sm">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <span>{tarea}</span>
              <div>
                <Button variant="primary" size="sm" className="me-2" onClick={() => showModal(i)}>Editar</Button>
                <Button variant="danger" size="sm" onClick={() => showDeleteModal(i)}>Eliminar</Button>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No hay tareas</p>
      )}
    </div>
  );
}

export default TaskOutput;
