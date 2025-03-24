// app/favorites/page.tsx
'use client';

import { useCart } from '../context/CartContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Book } from '../../types/book';

export default function FavoritesPage() {
  const { favorites, setFavorites } = useCart();

  const handleClearFavorites = () => {
    setFavorites([]); // Passe un tableau directement
  };

  const handleRemoveFavorite = (index: number) => {
    const updatedFavorites = favorites.filter((_, i) => i !== index); // Calcule le nouveau tableau
    setFavorites(updatedFavorites); // Passe directement le tableau à setFavorites
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Favoris</h1>
        {favorites.length === 0 ? (
          <p>Aucun favori pour l’instant.</p>
        ) : (
          <>
            <button onClick={handleClearFavorites} className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Supprimer tous les favoris
            </button>
            <ul className="space-y-4">
              {favorites.map((item: Book, index: number) => (
                <li key={index} className="flex justify-between items-center border-b pb-4">
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.authors}</p>
                    {item.price !== undefined && (
                      <p className="text-green-600 font-bold">{item.price} €</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveFavorite(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}