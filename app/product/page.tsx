// liste des livrez 
'use client'
import { useState, useEffect } from 'react';
import { fetchBooks } from '../../utils/api';
import { Book } from '../../types/book';
import Navbar from '../../components/Navbar';
import Filters from '../../components/Filters';
import ProductCard from '../../components/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function Products() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadBooks() {
      const data = await fetchBooks();
      setBooks(data);
      setFilteredBooks(data);
      setLoading(false);
    }
    loadBooks();
  }, []);

  const handleFilterChange = (filters: { genre?: string; author?: string }) => {
    let result = books;
    if (filters.genre) {
      result = result.filter((book) => book.genres.includes(filters.genre!));
    }
    if (filters.author) {
      result = result.filter((book) => book.authors.toLowerCase().includes(filters.author!.toLowerCase()));
    }
    setFilteredBooks(result);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 flex">
        <div className="w-1/4">
          <Filters onFilterChange={handleFilterChange} />
        </div>
        <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <ProductCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}