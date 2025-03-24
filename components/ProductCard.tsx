'use client';

import { useState, useEffect } from 'react';
import { Book } from '../types/book';
import Link from 'next/link';
import { Heart } from 'lucide-react'; // Utilisation d'une seule icône

interface ProductCardProps {
  book: Book;
}

export default function ProductCard({ book }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Vérifiez si le livre est déjà dans les favoris
    const favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
    const isFav = favorites.some((favBook: Book) => favBook.id === book.id);
    setIsFavorite(isFav);
  }, [book.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');

    if (isFavorite) {
      // Retirer des favoris
      const updatedFavorites = favorites.filter((favBook: Book) => favBook.id !== book.id);
      localStorage.setItem('userFavorites', JSON.stringify(updatedFavorites));
    } else {
      // Ajouter aux favoris
      favorites.push(book);
      localStorage.setItem('userFavorites', JSON.stringify(favorites));
    }

    setIsFavorite(!isFavorite);
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
    cart.push(book);
    localStorage.setItem('userCart', JSON.stringify(cart));
    alert(`${book.title} ajouté au panier !`);
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
      <Link href={`/product/${book.id}`}>
        <img src={book.image_url} alt={book.title} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold truncate">{book.title}</h3>
          <button onClick={toggleFavorite} aria-label="Ajouter aux favoris">
            <Heart
              className={`${
                isFavorite ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
              size={24}
            />
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">{book.authors}</p>
        <p className="text-sm text-yellow-500">★ {book.rating}</p>
        <p className="text-sm text-green-600 font-bold">{book.price} €</p>
        <button
          onClick={addToCart}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}