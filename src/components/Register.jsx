import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUsuarios, getUsuarios } from '../services/CRUD.jsx';
import { Form, Button, Alert } from 'react-bootstrap';

/**
 * Componente Register - Gestiona el registro de nuevos usuarios
 * Incluye validación de campos, verificación de usuarios existentes y validación de contraseña segura
 */
function Register() {
  // ========== HOOKS Y ESTADOS ==========
  
  // Hook de navegación para redirigir entre páginas
  const navigate = useNavigate();
  
  // Estado para almacenar la lista de usuarios existentes
  const [usuarios, setUsuarios] = useState([]);
  
  // Estados para los campos del formulario de registro
  const [gmail, setGmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  // Estado para gestionar las alertas del sistema
  const [alerta, setAlerta] = useState({ 
    show: false, 
    message: '', 
    variant: 'danger' 
  });

  // ========== CARGA DE DATOS INICIAL ==========

  /**
   * useEffect para cargar la lista de usuarios existentes al montar el componente
   * Necesario para verificar si un email ya está registrado
   */
  useEffect(() => {
    /**
     * Función asíncrona para obtener todos los usuarios del sistema
     */
    async function fetchUsuarios() {
      const data = await getUsuarios();
      setUsuarios(data);
    }
    
    fetchUsuarios();
  }, []); // Se ejecuta solo al montar el componente

  // ========== FUNCIONES DE VALIDACIÓN ==========

  
  const validatePassword = (password) => {
    const errors = [];
    
    // Verificar longitud mínima de 8 caracteres
    if (password.length < 8) errors.push("8 caracteres");
    
    // Verificar que tenga al menos una mayúscula
    if (!/[A-Z]/.test(password)) errors.push("1 mayúscula");
    
    // Verificar que tenga al menos un número
    if (!/[0-9]/.test(password)) errors.push("1 número");
    
    // Verificar que tenga al menos un símbolo especial
    if (!/[!@#$%^&*]/.test(password)) errors.push("1 símbolo (!@#$%^&*)");
    
    return errors;
  };

  // Validar la contraseña actual en tiempo real
  const passwordErrors = validatePassword(password);

  // ========== FUNCIÓN PRINCIPAL DE REGISTRO ==========

  /**
   * Función principal para registrar un nuevo usuario
   * Incluye todas las validaciones necesarias antes de crear el usuario
   */
  async function registrarUsuario() {
    // Validación 1: Verificar que todos los campos estén completos
    if (usuario.trim() === '' || gmail.trim() === '' || password.trim() === '') {
      setAlerta({ 
        show: true, 
        message: 'Rellene los espacios faltantes', 
        variant: 'danger' 
      });
      return;
    }

    // Validación 2: Verificar si el usuario ya existe
    // Comparación insensible a mayúsculas y sin espacios
    const usuarioEncontrado = usuarios.find(
      (u) => u.gmail.trim().toLowerCase() === gmail.trim().toLowerCase()
    );

    if (usuarioEncontrado) {
      setAlerta({ 
        show: true, 
        message: '¡El usuario ya está registrado!', 
        variant: 'warning' 
      });
      return;
    }

    // Validación 3: Verificar que la contraseña sea segura
    if (passwordErrors.length > 0) {
      setAlerta({
        show: true,
        message: `La contraseña no es segura. Faltan: ${passwordErrors.join(', ')}`,
        variant: 'danger'
      });
      return;
    }

    // Si todas las validaciones pasan, crear el nuevo usuario
    const usuarioNuevo = {
      nombre: usuario,
      gmail,
      password,
      tasks: [], // Inicializar con lista de tareas vacía
    };

    // Crear usuario en el servidor
    await createUsuarios(usuarioNuevo);
    
    // Mostrar mensaje de éxito
    setAlerta({ 
      show: true, 
      message: 'Registro exitoso, ahora inicie sesión', 
      variant: 'success' 
    });
    
    // Redirigir a la página de login después de 1.5 segundos
    // Permite que el usuario vea el mensaje de éxito
    setTimeout(() => navigate('/'), 1500);
  }

  // ========== RENDERIZADO DEL COMPONENTE ==========

  return (
    <div className="container mt-4" style={{ maxWidth: '400px' }}>
      <h3 className="mb-3">Registro de usuario</h3>

      {/* ========== SISTEMA DE ALERTAS ========== */}
      {alerta.show && (
        <Alert
          variant={alerta.variant}
          dismissible
          onClose={() => setAlerta({ ...alerta, show: false })}
        >
          {alerta.message}
        </Alert>
      )}

      {/* ========== FORMULARIO DE REGISTRO ========== */}
      <Form
        onSubmit={(e) => {
          e.preventDefault(); // Prevenir recarga de página
          registrarUsuario();
        }}
      >
        {/* Campo de nombre de usuario */}
        <Form.Group className="mb-3" controlId="formBasicUsuario">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su nombre"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </Form.Group>

        {/* Campo de correo electrónico */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su correo"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
          />
        </Form.Group>

        {/* Campo de contraseña con validación visual */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // Mostrar estado visual: rojo si es inválida, verde si es válida
            isInvalid={password.length > 0 && passwordErrors.length > 0}
            isValid={password.length > 0 && passwordErrors.length === 0}
          />
          
          {/* Texto de ayuda que cambia según el estado de la contraseña */}
          <Form.Text className={passwordErrors.length === 0 ? "text-success" : "text-danger"}>
            {password.length === 0
              ? "Debe tener: mínimo 8 caracteres, 1 mayúscula, 1 número y 1 símbolo"
              : passwordErrors.length === 0
              ? "Contraseña segura"
              : `Faltan: ${passwordErrors.join(', ')}`}
          </Form.Text>
        </Form.Group>

        {/* Botón de registro - se deshabilita si la contraseña no es segura */}
        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={passwordErrors.length > 0}
        >
          Registrarse
        </Button>
      </Form>
    </div>
  );
}

export default Register;