import React, { useEffect, useState } from 'react';
import { getUsuarios, updateUsuario } from '../services/CRUD.jsx';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import TaskOutput from '../components/TaskOutput';
import { Alert } from 'react-bootstrap';

/**
 * Componente TaskInput - Gestiona la creación de nuevas tareas y muestra las existentes
 * Permite al usuario autenticado agregar tareas a su lista personal
 */
function TaskInput() {
  // ========== INICIALIZACIÓN Y ESTADOS ==========
  
  // Obtener datos del usuario actual desde sessionStorage
  const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));
  
  // Estado para almacenar la lista completa de usuarios
  const [usuarios, setUsuarios] = useState([]);
  
  // Estado para el usuario específico que está usando la aplicación
  const [usuario, setUsuario] = useState(null);
  
  // Estado para el texto de la nueva tarea que se está escribiendo
  const [tarea, setTarea] = useState("");

  // Estado para controlar la visibilidad del modal de creación de tarea
  const [show, setShow] = useState(false);

  // Estado para mostrar alertas de validación dentro del modal
  const [alerta, setAlerta] = useState('');

  // ========== EFECTOS Y CARGA DE DATOS ==========

  /**
   * useEffect para cargar los datos del usuario al montar el componente
   * Busca todos los usuarios y encuentra el que coincide con el email del usuario actual
   */
  useEffect(() => {
    /**
     * Función asíncrona para obtener y procesar los datos del usuario
     */
    const fetchUsuario = async () => {
      try {
        // Obtener todos los usuarios del servicio
        const usuariosRecibidos = await getUsuarios();
        setUsuarios(usuariosRecibidos);

        // Buscar el usuario específico que coincide con el email del usuario actual
        // Se hace una comparación insensible a mayúsculas y sin espacios
        const usuarioRecibido = usuariosRecibidos.find(u =>
          u.gmail.trim().toLowerCase() === usuarioActual.email.trim().toLowerCase()
        );
        setUsuario(usuarioRecibido);
      } catch (error) {
        console.error("Error al traer los usuarios del servicio", error);
      }
    };
    
    fetchUsuario();
  }, []); // Array vacío significa que solo se ejecuta al montar el componente

  // ========== FUNCIONES DE GESTIÓN DE TAREAS ==========

  /**
   * Función para agregar una nueva tarea a la lista del usuario
   * Valida que la tarea no esté vacía y actualiza tanto el estado local como el servidor
   */
  const cargarTarea = async () => {
    // Validación: verificar que la tarea tenga contenido y que el usuario esté cargado
    if (tarea.trim() !== '' && usuario) {
      // Obtener la lista actual de tareas (o crear una nueva si no existe)
      const listaTarea = usuario.tasks || [];
      
      // Agregar la nueva tarea a la lista
      listaTarea.push(tarea);
      
      // Crear el objeto usuario actualizado con la nueva lista de tareas
      const usuarioActualizado = { ...usuario, tasks: listaTarea };
      
      // Actualizar en el servidor
      await updateUsuario(usuario.id, usuarioActualizado);
      
      // Actualizar el estado local
      setUsuario(usuarioActualizado);
      
      // Limpiar el campo de entrada y cerrar el modal
      setTarea(""); 
      setShow(false);
      setAlerta(''); // Limpiar cualquier alerta anterior
    } else {
      // Mostrar alerta de validación si la tarea está vacía
      setAlerta("Por favor especifique el nombre de la tarea");
    }
  };

  // ========== RENDERIZADO DEL COMPONENTE ==========

  return (
    <div>
      {/* ========== BOTÓN PARA ABRIR MODAL DE CREACIÓN ========== */}
      <Button variant="success" onClick={() => setShow(true)}>
        Agregar tarea
      </Button>

      {/* ========== MODAL DE CREACIÓN DE TAREA ========== */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Escriba el nombre de la tarea</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          {/* Alerta de validación (se muestra solo si hay un mensaje) */}
          {alerta && <Alert variant="warning">{alerta}</Alert>}
          
          {/* Campo de entrada para el nombre de la nueva tarea */}
          <input 
            type="text" 
            value={tarea}
            onChange={(e) => setTarea(e.target.value)}
            onKeyDown={(e) => { 
              // Permitir crear la tarea presionando Enter
              if (e.key === 'Enter') cargarTarea(); 
            }}
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

      {/* ========== COMPONENTE DE VISUALIZACIÓN DE TAREAS ========== */}
      {/* 
        TaskOutput se encarga de mostrar la lista de tareas existentes
        y proporciona funcionalidades de edición y eliminación
      */}
      <TaskOutput 
        usuarioProp={usuario} 
        actualizarUsuario={setUsuario} 
      />
    </div>
  );
}

export default TaskInput;