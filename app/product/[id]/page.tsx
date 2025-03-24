"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useCart } from "../../../app/context/CartContext";
import { Heart, ShoppingCart } from "lucide-react";
import { Book } from "../../../types/book";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../../../components/ui/Card";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProductPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, addToFavorites } = useCart();

  // Liste des images dans /public
  const images = [
    "/beauty.jpg",
    "/bella.jpg",
    "/clean.jpg",
    "/couple-enjoying-their-bookstore-date.jpg",
    "/full-shot-couple-having-bookstore-date.jpg",
    "/makebook.jpg",
    "/opened-book-library.jpg",
    "/pretty-woman-reading-near-library-window.jpg",
    "/room.jpg",
    "/thoughtful-female-student-sitting-cross-legged-with-book-library.jpg",
    "/young-student-learning-library.jpg",
  ];

  // Image aléatoire
  const [randomImage, setRandomImage] = useState<string>("");

  useEffect(() => {
    // Sélectionner une image aléatoire
    const selectedImage = images[Math.floor(Math.random() * images.length)];
    setRandomImage(selectedImage);

    const fetchBookById = async (bookId: string) => {
      try {
        const res = await fetch(`https://example-data.draftbit.com/books/${bookId}`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        const adaptedBook: Book = {
          id: data.id || parseInt(bookId),
          title: data.title || "Unknown Title",
          description: data.description || "No description available",
          authors: data.authors || "Unknown Author",
          rating: data.rating || 0,
          image_url: data.image_url || "https://via.placeholder.com/150",
          price: Math.floor(Math.random() * 20) + 5,
          format: data.format || "Unknown",
          num_pages: data.num_pages || 0,
          rating_count: data.rating_count || 0,
          review_count: data.review_count || 0,
          genres: data.genres || [],
          quotes: data.quotes,
        };
        setBook(adaptedBook);
      } catch (err) {
        setError("Erreur lors de la récupération du livre.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (typeof id === "string") fetchBookById(id);
    else {
      setError("ID invalide.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <span className="text-gray-400 text-lg">Chargement...</span>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <span className="text-red-400 text-lg">{error || "Livre non trouvé"}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-start"
          >
            {/* Carte avec l'image du livre */}
            <Card className="bg-gray-800 border-none shadow-xl overflow-hidden w-full md:w-1/2">
              <div className="grid grid-cols-1 gap-8">
                <img
                  src={book.image_url}
                  alt={book.title}
                  className="w-full h-[400px] object-cover rounded-t-md"
                />
                <CardContent className="p-6 flex flex-col justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
                    <p className="text-gray-400 text-lg mb-2">{book.authors}</p>
                    <p className="text-gray-300 mb-4">{book.description}</p>
                    <p className="text-sm text-gray-500">
                      Note : {book.rating}/5 ({book.review_count} avis)
                    </p>
                  </div>
                  <div className="flex space-x-4 mt-6">
                    <Button
                      onClick={() => addToCart(book)}
                      className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700"
                    >
                      <ShoppingCart className="mr-2" size={16} />
                      Ajouter au panier
                    </Button>
                    <Button
                      onClick={() => addToFavorites(book)}
                      variant="outline"
                      className="flex-1 flex items-center justify-center border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                    >
                      <Heart className="mr-2" size={16} />
                      Favoris
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
            {/* Image aléatoire à côté, agrandie */}
            <div className="relative w-full md:w-3/4 h-[1000px]">
              <Image
                src={randomImage}
                alt="Image aléatoire"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}