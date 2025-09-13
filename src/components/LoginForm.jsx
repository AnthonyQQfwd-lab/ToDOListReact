import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUsuarios } from '../services/CRUD.jsx'
import { Link } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'

/**
 * Componente LoginForm - Gestiona el inicio de sesión de usuarios
 * Autentica credenciales contra la base de datos y redirige al dashboard principal
 */
function LoginForm() {
  // ========== HOOKS Y ESTADOS ==========
  
  // Hook de navegación para redirigir entre páginas
  const navigate = useNavigate()
  
  // Estado para almacenar la lista de usuarios registrados
  const [usuarios, setUsuarios] = useState([])
  
  // Estados para los campos de autenticación
  const [gmail, setGmail] = useState("")
  const [password, setPassword] = useState("")
  
  // Estado para gestionar las alertas del sistema
  const [alerta, setAlerta] = useState({ 
    show: false, 
    message: "", 
    variant: "" 
  })

  // ========== CARGA DE DATOS INICIAL ==========

  /**
   * useEffect para cargar todos los usuarios al montar el componente
   * Necesario para realizar la autenticación contra la base de datos
   */
  useEffect(() => {
    /**
     * Función asíncrona para obtener todos los usuarios registrados
     */
    async function fetchUsuarios() {
      const usuarios = await getUsuarios()
      setUsuarios(usuarios)
    }
    
    fetchUsuarios()
  }, []) // Se ejecuta solo al montar el componente

  // ========== FUNCIÓN DE AUTENTICACIÓN ==========

  /**
   * Función principal para autenticar al usuario
   * Verifica credenciales, guarda sesión y redirige en caso de éxito
   */
  function iniciarSesion() {
    // Buscar usuario que coincida con email y contraseña
    // Email se compara sin case sensitivity y sin espacios
    const usuarioVerificado = usuarios.find(
      u =>
        u.gmail.trim().toLowerCase() === gmail.trim().toLowerCase() &&
        u.password === password
    )

    if (usuarioVerificado) {
      // ========== AUTENTICACIÓN EXITOSA ==========
      
      // Mostrar mensaje de éxito
      setAlerta({ 
        show: true, 
        message: "Inicio de sesión exitoso", 
        variant: "success" 
      })
      
      // Guardar datos del usuario en sessionStorage para mantener la sesión
      sessionStorage.setItem(
        "usuarioActual",
        JSON.stringify({
          nombre: usuarioVerificado.nombre,
          email: usuarioVerificado.gmail,
          password: usuarioVerificado.password
        })
      )
      
      // Redirigir al dashboard después de 1.5 segundos
      // Permite que el usuario vea el mensaje de éxito
      setTimeout(() => navigate("/TaskManager"), 1500)
    } else {
      // ========== AUTENTICACIÓN FALLIDA ==========
      
      // Mostrar mensaje de error por credenciales incorrectas
      setAlerta({ 
        show: true, 
        message: "Usuario o contraseña incorrectos", 
        variant: "danger" 
      })
    }
  }

  // ========== RENDERIZADO DEL COMPONENTE ==========

  return (
    <div>
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

      {/* ========== FORMULARIO DE INICIO DE SESIÓN ========== */}
      <Form
        onSubmit={e => {
          e.preventDefault() // Prevenir recarga de página
          iniciarSesion()
        }}
      >
        {/* Campo de correo electrónico */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo Electronico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={gmail}
            onChange={e => setGmail(e.target.value)}
          />
        </Form.Group>

        {/* Campo de contraseña */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>

        {/* Botón de envío del formulario */}
        <Button variant="primary" type="submit">
          Iniciar sesión
        </Button>

        {/* Enlace de registro para usuarios nuevos */}
        <Form.Text className="text-muted d-block mt-2">
          ¿No tienes cuenta? <Link to="/Register">Regístrate aquí</Link>
        </Form.Text>
      </Form>
    </div>
  )
}

export default LoginForm