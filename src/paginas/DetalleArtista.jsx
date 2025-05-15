import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function DetalleArtista() {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [artista, setArtista] = useState(null);
  const [albumes, setAlbumes] = useState([]);

  useEffect(() => {
    const fetchArtista = async () => {
      try {
        const res = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setArtista(data);
      } catch (error) {
        console.error('Error al obtener el artista:', error);
      }
    };

    const fetchAlbumes = async () => {
      try {
        const res = await fetch(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album&market=AR&limit=12`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setAlbumes(data.items);
      } catch (error) {
        console.error('Error al obtener los álbumes:', error);
      }
    };

    if (token) {
      fetchArtista();
      fetchAlbumes();
    }
  }, [id, token]);

  if (!artista) return <p>Cargando artista...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{artista.name}</h2>
      {artista.images && artista.images[0] && (
        <img src={artista.images[0].url} alt={artista.name} width={200} />
      )}

      <h3>Álbumes</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {albumes.map((album) => (
          <div key={album.id} style={{ width: '150px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            {album.images && album.images[0] && (
              <img src={album.images[0].url} alt={album.name} width={150} />
            )}
            <p><strong>{album.name}</strong></p>
            <p>Año: {album.release_date ? album.release_date.slice(0, 4) : 'Desconocido'}</p>
            <Link to={`/album/${album.id}`}>🎵 Ver canciones</Link>
          </div>
        ))}
      </div>

      <button 
        onClick={() => navigate('/')} 
        style={{
          marginTop: '30px',
          backgroundColor: '#9c27b0',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        🔙 Volver
      </button>
    </div>
  );
}