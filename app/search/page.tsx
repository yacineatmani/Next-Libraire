'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchBooks } from '../../utils/api';
import { Book } from '../../types/book';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const genre = searchParams.get('genre') || '';
  const author = searchParams.get('author') || '';
  const query = searchParams.get('q') || ''; // Récupérer le paramètre q
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadFilteredBooks() {
      try {
        const books = await fetchBooks();
        let filtered = books;

        if (genre) {
          filtered = filtered.filter((book) => book.genres.includes(genre));
        }

        if (author) {
          filtered = filtered.filter((book) =>
            book.authors.toLowerCase().includes(author.toLowerCase())
          );
        }

        if (query) {
          filtered = filtered.filter((book) =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.authors.toLowerCase().includes(query.toLowerCase())
          );
        }

        setFilteredBooks(filtered);
      } catch (error) {
        console.error('Erreur lors du chargement des livres:', error);
      } finally {
        setLoading(false);
      }
    }

    loadFilteredBooks();
  }, [genre, author, query]); // Ajouter query comme dépendance

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Résultats de la recherche</h1>
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((book) => (
              <ProductCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <p>Aucun résultat trouvé.</p>
        )}
      </div>
    </div>
  );
}