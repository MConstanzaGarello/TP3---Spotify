import { createContext, useContext, useState } from 'react';

const FavoritosContext = createContext();
export const useFavoritos = () => useContext(FavoritosContext);

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);

  const toggleFavorito = (artista) => {
    setFavoritos((prev) => {
      const existe = prev.find((a) => a.id === artista.id);
      if (existe) return prev.filter((a) => a.id !== artista.id);
      return [...prev, artista];
    });
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};
