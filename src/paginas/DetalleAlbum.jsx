import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function DetalleAlbum() {
  const { id } = useParams(); 
  const token = localStorage.getItem('token'); 

  const [album, setAlbum] = useState(null); 
  const [favoritos, setFavoritos] = useState(() => {

    const favoritosGuardados = localStorage.getItem('favoritos');
    return favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
  });

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const res = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setAlbum(data);
      } catch (error) {
        console.error('Error al obtener detalles del álbum:', error);
      }
    };

    if (token) {
      fetchAlbum();
    }
  }, [id, token]);

  const toggleFavorito = (cancion) => {
    let nuevosFavoritos;
    if (favoritos.find((f) => f.id === cancion.id)) {
      nuevosFavoritos = favoritos.filter((f) => f.id !== cancion.id); 
    } else {
      nuevosFavoritos = [...favoritos, cancion]; 
    }
    setFavoritos(nuevosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos)); 
  };

  if (!album) return <p>Cargando álbum...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{album.name}</h2>
      {album.artists && (
        <p>
          Artista: <Link to={`/artista/${album.artists[0].id}`}>{album.artists[0].name}</Link>
        </p>
      )}
      {album.images && album.images[0] && (
        <img src={album.images[0].url} alt={album.name} width={200} />
      )}

      <h3>Canciones</h3>
      <ul>
        {album.tracks.items.map((cancion) => (
          <li key={cancion.id} style={{ marginBottom: '10px' }}>
            <span>{cancion.name}</span>
            <button
              onClick={() => toggleFavorito(cancion)}
              style={{ marginLeft: '10px' }}
            >
              {favoritos.find((f) => f.id === cancion.id) ? '💔 Quitar' : '💖 Favorito'}
            </button>
          </li>
        ))}
      </ul>

      <Link to={`/artista/${album.artists[0].id}`}>
        <button style={{ marginTop: '20px' }}>Volver</button>
      </Link>
    </div>
  );
}