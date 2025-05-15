import { Routes, Route } from 'react-router-dom';
import ListaCancionesFavoritas from './paginas/ListaCancionesFavoritas';
import DetalleAlbum from './paginas/DetalleAlbum';
import Inicio from './paginas/Inicio.jsx';
import Login from './paginas/login.jsx';
import DetalleArtista from './paginas/DetalleArtista';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />
      <Route path="/artista/:id" element={<DetalleArtista />} />
      <Route path="/album/:id" element={<DetalleAlbum />} /> 
      <Route path="/favoritos" element={<ListaCancionesFavoritas />} />
    </Routes>
  );
}


