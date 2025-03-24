// app/products/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Book } from '../../types/book';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { fetchBooks } from '../../utils/api';
import { Heart, ShoppingCart, Loader2 } from 'lucide-react';
import { useCart } from '../../app/context/CartContext';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

export default function ProductsPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [genreFilter, setGenreFilter] = useState<string>('all');
  const [pagesFilter, setPagesFilter] = useState<number>(0);
  const itemsPerPage = 12;
  const { addToCart, addToFavorites } = useCart();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  useEffect(() => {
    let result = books;
    if (priceFilter !== null) result = result.filter((book) => (book.price || 0) <= priceFilter);
    if (ratingFilter > 0) result = result.filter((book) => book.rating >= ratingFilter);
    if (genreFilter !== 'all') result = result.filter((book) => book.genres.includes(genreFilter));
    if (pagesFilter > 0) result = result.filter((book) => book.num_pages >= pagesFilter);
    setFilteredBooks(result);
    setCurrentPage(1);
  }, [priceFilter, ratingFilter, genreFilter, pagesFilter, books]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = filteredBooks.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleAddToCart = (book: Book) => {
    addToCart(book);
    console.log(`Ajouté au panier : ${book.title}`);
  };

  const handleAddToFavorites = (book: Book) => {
    addToFavorites(book);
    console.log(`Ajouté aux favoris : ${book.title}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Loader2 className="animate-spin text-blue-600 dark:text-blue-400" size={48} />
      </div>
    );
  }

  const uniqueGenres = Array.from(new Set(books.flatMap((book) => book.genres)));

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-8">
        {/* Filtres en haut */}
        <section className="mb-12">
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-none shadow-md dark:shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Filtrer les produits</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Prix max (€)
                </label>
                <Input
                  type="range"
                  min="0"
                  max="100"
                  value={priceFilter || 100}
                  onChange={(e) => setPriceFilter(Number(e.target.value))}
                  className="w-full accent-blue-500 dark:accent-blue-400 bg-gray-200 dark:bg-gray-700"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{priceFilter || 'Non défini'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Note min
                </label>
                <Input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(Number(e.target.value))}
                  className="w-full accent-blue-500 dark:accent-blue-400 bg-gray-200 dark:bg-gray-700"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{ratingFilter}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Genre
                </label>
                <Select value={genreFilter} onValueChange={setGenreFilter}>
                  <SelectTrigger className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-none text-gray-900 dark:text-white">
                    <SelectValue placeholder="Tous" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <SelectItem value="all">Tous</SelectItem>
                    {uniqueGenres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pages min
                </label>
                <Input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={pagesFilter}
                  onChange={(e) => setPagesFilter(Number(e.target.value))}
                  className="w-full accent-blue-500 dark:accent-blue-400 bg-gray-200 dark:bg-gray-700"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{pagesFilter}</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Grille de produits */}
        <section className="relative">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">Catalogue des Produits</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {currentBooks.map((book) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-none shadow-md dark:shadow-xl hover:shadow-lg dark:hover:shadow-2xl transition-shadow">
                  <CardContent className="p-4">
                    <img
                      src={book.image_url}
                      alt={book.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{book.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400">{book.authors}</p>
                    <p className="text-green-600 dark:text-green-400 font-bold mt-2">{book.price} €</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Note : {book.rating}/5</p>
                    <div className="flex justify-between items-center mt-4">
                      <Button
                        onClick={() => handleAddToCart(book)}
                        className="flex items-center bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                      >
                        <ShoppingCart className="mr-2" size={16} />
                        Panier
                      </Button>
                      <Button
                        onClick={() => handleAddToFavorites(book)}
                        className="flex items-center bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white"
                      >
                        <Heart className="mr-2" size={16} />
                        Favoris
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          {/* Image clean.jpg comme fond subtil */}
          <div
            className="absolute inset-0 -z-10 opacity-10 dark:opacity-20"
            style={{
              backgroundImage: "url('/clean.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </section>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-12">
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={currentPage === 1 ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-700 dark:text-gray-400' : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white'}
          >
            Précédent
          </Button>
          <p className="text-gray-900 dark:text-white">
            Page {currentPage} sur {totalPages}
          </p>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={currentPage === totalPages ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-700 dark:text-gray-400' : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white'}
          >
            Suivant
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}