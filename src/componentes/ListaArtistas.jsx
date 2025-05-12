import TarjetaArtista from './TarjetaArtista';

export default function ListaArtistas({ artistas }) {
  return (
    <div style={{ flex: 1 }}>
      {artistas.map((a) => (
        <TarjetaArtista key={a.id} artista={a} />
      ))}
    </div>
  );
}
