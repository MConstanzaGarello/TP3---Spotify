import { useState } from 'react';
import BuscadorArtistas from '../componentes/BuscadorArtistas';
import ListaArtistas from '../componentes/ListaArtistas';
import ListaFavoritos from '../componentes/ListaFavoritos';
import BotonCerrarSesion from '../componentes/BotonCerrarSesion';

export default function Inicio() {
  const [artistas, setArtistas] = useState([]);
  const token = localStorage.getItem('token'); // TOKEN DE SPOTIFY

  const buscarArtistas = async (texto) => {
    const res = await fetch(`https://api.spotify.com/v1/search?q=${texto}&type=artist`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    setArtistas(data.artists?.items || []);
  };

  return (
    <div>
      <h1>Buscador de Artistas</h1>
      <BuscadorArtistas onBuscar={buscarArtistas} />
      <div style={{ display: 'flex' }}>
        <ListaArtistas artistas={artistas} />
        <ListaFavoritos />
        <BotonCerrarSesion />
      </div>
    </div>
  );
}
