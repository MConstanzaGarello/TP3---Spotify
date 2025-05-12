import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Para aplicar los estilos

export default function Login() {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const navigate = useNavigate();

  const obtenerToken = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    try {
      const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
      });

      const data = await res.json();

      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        navigate('/');
      } else {
        alert('Error al obtener el token');
      }
    } catch (error) {
      alert('Error de conexión');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={obtenerToken}>
        <h1>Iniciar sesión en tu app</h1>
        <input
          type="text"
          placeholder="CLIENT ID"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="CLIENT SECRET"
          value={clientSecret}
          onChange={(e) => setClientSecret(e.target.value)}
          required
        />
        <button type="submit">Generar token</button>
      </form>
    </div>
  );
}
