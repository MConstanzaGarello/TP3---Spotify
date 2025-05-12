import { useNavigate } from 'react-router-dom';

export default function BotonCerrarSesion() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <button onClick={cerrarSesion} style={{
      backgroundColor: '#e57373',
      border: 'none',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '6px',
      fontSize: '14px',
      cursor: 'pointer',
      position: 'absolute',
      top: '20px',
      right: '20px'
    }}>
      Cerrar sesión
    </button>
  );
}
