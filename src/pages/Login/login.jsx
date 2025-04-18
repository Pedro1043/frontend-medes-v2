import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username);
      navigate('/'); // Redirige a la página principal
    } catch (err) {
      setError('Usuario no encontrado');
    }
  };

  return (
    <div  className="login-container">
      <img src="https://medescajamarca.com/wp-content/uploads/2019/07/MEDES-logo.png" className="logo react" alt="React logo" />  
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor='usuario'>Usuario: </label>
            <input
              type="text"
              id="usuario"
              placeholder="Introduce tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div>
          <label htmlFor="password">Clave:  </label>
          <input
            type="password"
            id="password"
            placeholder="Introduce tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Ingresar</button>
        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;