import { useFavoritos } from '../contexto/FavoritosContext';

export default function TarjetaArtista({ artista }) {
  const { favoritos, toggleFavorito } = useFavoritos();
  const esFavorito = favoritos.find((a) => a.id === artista.id);

  return (
    <div style={{ border: '1px solid gray', margin: 10, padding: 10 }}>
      <img src={artista.images[0]?.url} alt={artista.name} width={150} />
      <h3>{artista.name}</h3>
      <button onClick={() => toggleFavorito(artista)}>
        {esFavorito ? '💔 Quitar' : '💖 Favorito'}
      </button>
    </div>
  );
}
