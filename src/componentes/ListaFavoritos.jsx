import { useFavoritos } from '../contexto/FavoritosContext';

export default function ListaFavoritos() {
  const { favoritos } = useFavoritos();

  return (
    <aside style={{ width: '200px', marginLeft: 20 }}>
      <h3>Favoritos</h3>
      <ul>
        {favoritos.map((a) => (
          <li key={a.id}>{a.name}</li>
        ))}
      </ul>
    </aside>
  );
}
