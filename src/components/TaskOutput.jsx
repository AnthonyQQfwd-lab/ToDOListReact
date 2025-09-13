import React, { useState } from 'react';
import { updateUsuario } from '../services/CRUD.jsx';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { Alert } from 'react-bootstrap';


function TaskOutput({ usuarioProp, actualizarUsuario }) {
  // ========== ESTADOS DEL COMPONENTE ==========
  
  // Estado para almacenar el índice de la tarea que se está editando/eliminando
  const [indiceActual, setIndiceActual] = useState(null);
  
  // Estado para almacenar el texto de la tarea mientras se edita
  const [tareaEditada, setTareaEditada] = useState('');
  
  // Estado para almacenar el texto de la tarea que se va a eliminar
  const [tareaAEliminar, setTareaAEliminar] = useState('');

  // Estados para controlar la visibilidad de los modales
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // Estados para mostrar alertas dentro de los modales
  const [alertEdit, setAlertEdit] = useState('');
  const [alertDelete, setAlertDelete] = useState('');

  // ========== FUNCIONES DE GESTIÓN DE MODALES ==========

  
  function showModal(i) {
    setIndiceActual(i);
    setTareaEditada(usuarioProp.tasks[i]);
    setAlertEdit(''); // Limpiar cualquier alerta anterior
    setShowEdit(true);
  }

  
  function showDeleteModal(i) {
    setIndiceActual(i);
    setTareaAEliminar(usuarioProp.tasks[i]);
    setAlertDelete(''); // Limpiar cualquier alerta anterior
    setShowDelete(true);
  }

  // ========== FUNCIONES DE OPERACIONES CRUD ==========

  /**
   * Edita una tarea existente
   * Valida que el campo no esté vacío, actualiza la lista y sincroniza con el servidor
   */
    async function editTask() {
    // Validación: verificar que la tarea editada no esté vacía
    if (tareaEditada.trim() === '') {
      setAlertEdit('Por favor ingrese texto para editar la tarea');
    } else {
      // Crear una nueva lista con la tarea editada
      const nuevaLista = [...usuarioProp.tasks];
      nuevaLista[indiceActual] = tareaEditada;

      // Crear objeto usuario actualizado
      const usuarioActualizado = { ...usuarioProp, tasks: nuevaLista };
      
      // Actualizar en el servidor
      await updateUsuario(usuarioProp.id, { tasks: nuevaLista });
      
      // Actualizar el estado en el componente padre
      actualizarUsuario(usuarioActualizado);
      
      // Cerrar el modal
      setShowEdit(false);
    }
  }

  /**
   * Elimina una tarea de la lista
   * Valida que haya una tarea seleccionada, filtra la lista y sincroniza con el servidor
   */
  async function deleteTarea() {
    // Validación: verificar que hay una tarea seleccionada para eliminar
    if (!tareaAEliminar) {
      setAlertDelete('No hay tarea seleccionada para eliminar');
    } else {
      // Filtrar la lista para remover la tarea en el índice actual
      const nuevaLista = usuarioProp.tasks.filter((_, index) => index !== indiceActual);
      
      // Crear objeto usuario actualizado
      const usuarioActualizado = { ...usuarioProp, tasks: nuevaLista };

      // Actualizar en el servidor
      await updateUsuario(usuarioProp.id, { tasks: nuevaLista });
      
      // Actualizar el estado en el componente padre
      actualizarUsuario(usuarioActualizado);
      
      // Cerrar el modal
      setShowDelete(false);
    }
  }

  // ========== RENDERIZADO DEL COMPONENTE ==========

  return (
    <div>
      {/* ========== MODAL DE EDICIÓN DE TAREA ========== */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar tarea</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          {/* Alerta de validación dentro del modal */}
          {alertEdit && <Alert variant="warning">{alertEdit}</Alert>}
          
          {/* Campo de entrada para editar la tarea */}
          <input
            type="text"
            value={tareaEditada}
            onChange={(e) => setTareaEditada(e.target.value)}
            onKeyDown={(e) => {
              // Permite guardar con Enter
              if (e.key === 'Enter') editTask();
            }}
            className="form-control"
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

      {/* ========== MODAL DE CONFIRMACIÓN DE ELIMINACIÓN ========== */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar tarea</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          {/* Alerta de validación dentro del modal */}
          {alertDelete && <Alert variant="warning">{alertDelete}</Alert>}
          
          {/* Mensaje de confirmación */}
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

      {/* ========== LISTA DE TAREAS ========== */}
      {usuarioProp?.tasks?.length > 0 ? (
        // Mapear y renderizar cada tarea como una Card
        usuarioProp.tasks.map((tarea, i) => (
          <Card key={i} className="mb-2 p-2 shadow-sm">
            <Card.Body className="d-flex justify-content-between align-items-center">
              {/* Texto de la tarea */}
              <span>{tarea}</span>
              
              {/* Botones de acción (Editar/Eliminar) */}
              <div>
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="me-2" 
                  onClick={() => showModal(i)}
                >
                  Editar
                </Button>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => showDeleteModal(i)}
                >
                  Eliminar
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        // Mensaje cuando no hay tareas
        <p>No hay tareas</p>
      )}
    </div>
  );
}

export default TaskOutput;