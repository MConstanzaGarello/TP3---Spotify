import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Inicio from './paginas/Inicio';
import Login from './paginas/Login';
import DetalleArtista from './paginas/DetalleArtista';
import DetalleAlbum from './paginas/DetalleAlbum';
import ListaCancionesFavoritas from './paginas/ListaCancionesFavoritas';

export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />

      {token ? (
        <>
          <Route path="/" element={<Inicio />} />
          <Route path="/artista/:id" element={<DetalleArtista />} />
          <Route path="/album/:id" element={<DetalleAlbum />} />
          <Route path="/favoritos" element={<ListaCancionesFavoritas />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}
