import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ListaCancionesFavoritas() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const favoritosGuardados = localStorage.getItem('favoritos');
    setFavoritos(favoritosGuardados ? JSON.parse(favoritosGuardados) : []);
  }, []);

  const eliminarFavorito = (id) => {
    const nuevosFavoritos = favoritos.filter((cancion) => cancion.id !== id);
    setFavoritos(nuevosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
  };

  if (favoritos.length === 0) {
    return <p>No hay canciones favoritas.</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Canciones Favoritas</h2>
      <ul>
        {favoritos.map((cancion) => (
          <li key={cancion.id} style={{ marginBottom: '10px' }}>
            <p>
              <strong>{cancion.name || 'Sin nombre'}</strong><br />
              {cancion.artists?.[0]?.name || 'Artista desconocido'}<br />
              Álbum:{' '}
              {cancion.album ? (
                <Link to={`/album/${cancion.album.id}`}>
                  {cancion.album.name}
                </Link>
              ) : (
                'Sin álbum'
              )}
            </p>
            <button onClick={() => eliminarFavorito(cancion.id)}>
              🗑 Eliminar de favoritos
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
