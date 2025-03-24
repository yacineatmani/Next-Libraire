'use client';

import { useState, useEffect, useMemo } from 'react';
import { Book } from '../../types/book';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { fetchBooks } from '../../utils/api';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductsPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const { addToCart, addToFavorites, cart, favorites } = useCart();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        setError('Erreur lors du chargement des livres');
        console.error('Error fetching books:', error);
      }
    };

    loadBooks();
  }, []);

  const currentBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return books.slice(startIndex, endIndex);
  }, [books, currentPage]);

  const isInCart = (book: Book) => cart.some((cartItem) => cartItem.id === book.id);
  const isInFavorites = (book: Book) => favorites.some((favItem) => favItem.id === book.id);

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-xl font-bold text-red-600">{error}</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Catalogue des Produits</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentBooks.map((book) => (
            <div key={book.id} className="border rounded-lg p-4 shadow-md bg-white dark:bg-gray-800">
              <img
                src={book.image_url}
                alt={book.title}
                className="w-full h-48 object-cover rounded-md mb-4"
                aria-label={`Image du livre ${book.title}`}
              />
              <h2 className="text-xl font-bold mb-2">{book.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">{book.authors}</p>
              <p className="text-green-600 font-bold mt-2">{book.price} €</p>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => {
                    addToCart(book);
                  }}
                  className={`flex items-center px-4 py-2 ${isInCart(book) ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded hover:bg-blue-600`}
                  disabled={isInCart(book)}
                >
                  <ShoppingCart className="mr-2" size={16} />
                  {isInCart(book) ? 'Déjà dans le panier' : 'Ajouter au panier'}
                </button>
                <button
                  onClick={() => {
                    addToFavorites(book);
                  }}
                  className={`flex items-center px-4 py-2 ${isInFavorites(book) ? 'bg-gray-400' : 'bg-red-500'} text-white rounded hover:bg-red-600`}
                  disabled={isInFavorites(book)}
                >
                  <Heart className="mr-2" size={16} />
                  {isInFavorites(book) ? 'Dans les favoris' : 'Favoris'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2 disabled:opacity-50"
          >
            Précédent
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage * itemsPerPage >= books.length}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}