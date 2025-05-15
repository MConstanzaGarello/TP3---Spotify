import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ListaCancionesFavoritas from './paginas/ListaCancionesFavoritas';
import DetalleAlbum from './paginas/DetalleAlbum';
import Inicio from './paginas/Inicio.jsx';
import Login from './paginas/Login.jsx';
import DetalleArtista from './paginas/DetalleArtista';

export default function App() {
 
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
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
        <Route path="" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}


