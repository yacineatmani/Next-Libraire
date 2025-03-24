"use client";

import { useState, useEffect } from "react";
import { Book } from "../types/book";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "../components/ui/Card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

// Fonction fetchBooks adaptée pour l'API réelle avec pagination
const fetchBooksFromApi = async (limit: number, start: number): Promise<Book[]> => {
  const response = await fetch(`https://example-data.draftbit.com/books?_limit=${limit}&_start=${start}`);
  const data = await response.json();
  return data.map((item: any) => ({
    id: item.id,
    title: item.title || "Unknown Title",
    authors: item.authors || "Unknown Author",
    image_url: item.image_url || "https://via.placeholder.com/150",
    price: Math.floor(Math.random() * 20) + 5, // Simulé, adaptez si l'API fournit un prix
    rating: item.rating || 0,
    description: item.description || "No description available",
    format: item.format || "Unknown",
    num_pages: item.num_pages || 0,
    rating_count: item.rating_count || 0,
    review_count: item.review_count || 0,
    genres: item.genres || [],
    quotes: item.quotes,
  }));
};

// Composant Carousel avec 5 cartes visibles obligatoirement
const Carousel = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState<Book[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const maxVisibleSlides = 5;
  const booksPerPage = 5;
  const totalBooks = 200; // Nombre total de livres dans l'API (à ajuster selon la vraie valeur)
  const cardWidthPercentage = 100 / maxVisibleSlides; // 20% par carte pour 5 visibles

  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const loadBooks = async (page: number) => {
    setIsLoading(true);
    setIsAnimating(true);
    try {
      const start = (page - 1) * booksPerPage;
      const data = await fetchBooksFromApi(booksPerPage, start);
      setBooks(data);
    } catch (error) {
      console.error("Erreur lors du chargement des livres :", error);
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  useEffect(() => {
    loadBooks(currentPage);
  }, [currentPage]);

  const goToPrevious = () => {
    if (isAnimating || isLoading || currentPage <= 1) return;
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const goToNext = () => {
    if (isAnimating || isLoading || currentPage >= totalPages) return;
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-6">
        <Loader2 className="animate-spin text-blue-600 dark:text-blue-400" size={48} />
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-300">Aucun livre disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full py-6 overflow-hidden">
      <div className="relative px-12">
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full"
          disabled={currentPage <= 1 || isLoading}
          aria-label="Livres précédents"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex overflow-hidden mx-auto max-w-7xl"> {/* Augmenté à max-w-7xl pour plus de largeur */}
          <div
            className="flex transition-transform duration-500 ease-in-out w-full"
            style={{
              transform: isAnimating ? `translateX(-100%)` : `translateX(0)`,
            }}
          >
            {books.map((book) => (
              <div
                key={book.id}
                className="px-2 flex-shrink-0"
                style={{ width: `${cardWidthPercentage}%` }} // 20% par carte, 5 visibles
              >
                <Link href={`/product/${book.id}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-col transform transition-transform hover:scale-105">
                    <div className="relative h-48 w-full">
                      <Image
                        src={book.image_url || "/placeholder-book.jpg"}
                        alt={book.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <h3 className="text-md font-bold text-gray-800 dark:text-white mb-1 line-clamp-1">{book.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{book.authors}</p>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{book.price}€</span>
                        <Button
                          variant="outline"
                          className="text-blue-500 dark:text-blue-400 hover:bg-blue-500 dark:hover:bg-blue-400 hover:text-white dark:hover:text-white"
                        >
                          Voir les détails
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full"
          disabled={currentPage >= totalPages || isLoading}
          aria-label="Livres suivants"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [topRated, setTopRated] = useState<Book[]>([]);
  const [affordable, setAffordable] = useState<Book[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      console.log("Chargement des données initiales...");
      try {
        const response = await fetch("https://example-data.draftbit.com/books");
        const data = await response.json();
        const adaptedBooks = data.map((item: any) => ({
          id: item.id,
          title: item.title || "Unknown Title",
          authors: item.authors || "Unknown Author",
          image_url: item.image_url || "https://via.placeholder.com/150",
          price: Math.floor(Math.random() * 20) + 5,
          rating: item.rating || 0,
          description: item.description || "No description available",
          format: item.format || "Unknown",
          num_pages: item.num_pages || 0,
          rating_count: item.rating_count || 0,
          review_count: item.review_count || 0,
          genres: item.genres || [],
          quotes: item.quotes,
        }));
        setTotalBooks(200); // Nombre total estimé
        setTopRated(adaptedBooks.filter((book: Book) => book.rating > 4).slice(0, 3));
        setAffordable(adaptedBooks.filter((book: Book) => (book.price || 0) < 10).slice(0, 3));
      } catch (error) {
        console.error("Erreur lors du chargement des livres :", error);
        setError("Unable to load books. Please try again later.");
      } finally {
        setLoading(false);
        console.log("Chargement terminé.");
      }
    };
    loadInitialData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Loader2 className="animate-spin text-blue-600 dark:text-blue-400" size={48} />
        <p className="mt-4 text-lg">Chargement des livres en cours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-xl text-gray-900 dark:text-white">
          <h2 className="text-2xl font-bold text-red-500 dark:text-red-400 mb-4">Erreur</h2>
          <p className="text-lg">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white"
          >
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section avec Carrousel */}
        <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 py-24">
          <div className="container mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6 text-white dark:text-white"
            >
              Explorez l’univers des livres
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-gray-200 dark:text-gray-300"
            >
              Trouvez votre prochaine lecture parmi notre vaste collection.
            </motion.p>
            <Carousel />
            <Link href="/products">
              <Button
                size="lg"
                className="mt-8 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
              >
                Découvrir le catalogue
              </Button>
            </Link>
          </div>
        </section>

        {/* Section Livres en vedette */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Livres en vedette</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {topRated.map((book) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-none shadow-md dark:shadow-xl hover:shadow-lg dark:hover:shadow-2xl transition-shadow">
                    <CardHeader>
                      <img
                        src={book.image_url}
                        alt={book.title}
                        className="w-full h-48 object-cover rounded-t-md"
                      />
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{book.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{book.authors}</p>
                      <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Note : {book.rating}/5</p>
                      <Link href={`/product/${book.id}`}>
                        <Button
                          variant="outline"
                          className="mt-4 w-full border-blue-500 dark:border-blue-400 text-blue-500 dark:text-blue-400 hover:bg-blue-500 dark:hover:bg-blue-400 hover:text-white dark:hover:text-white"
                        >
                          Voir les détails
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Produits abordables */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Produits à prix abordable</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {affordable.map((book) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-none shadow-md dark:shadow-xl hover:shadow-lg dark:hover:shadow-2xl transition-shadow">
                    <CardHeader>
                      <img
                        src={book.image_url}
                        alt={book.title}
                        className="w-full h-48 object-cover rounded-t-md"
                      />
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{book.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{book.authors}</p>
                      <p className="text-green-600 dark:text-green-400 font-bold mt-2">{book.price} €</p>
                      <Link href={`/product/${book.id}`}>
                        <Button
                          variant="outline"
                          className="mt-4 w-full border-blue-500 dark:border-blue-400 text-blue-500 dark:text-blue-400 hover:bg-blue-500 dark:hover:bg-blue-400 hover:text-white dark:hover:text-white"
                        >
                          Voir les détails
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}