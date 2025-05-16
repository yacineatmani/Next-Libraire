// app/product/[id]/page.tsx

import { notFound } from 'next/navigation';
import { Book } from '../../../types/book';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '../../../components/ui/Card';
import { motion } from 'framer-motion';
import Image from 'next/image';

// ✅ Type des props attendues par la page
type Props = {
  params: {
    id: string;
  };
};

// ✅ Fonction qui génère les routes statiques (nécessaire pour export)
export async function generateStaticParams() {
  const res = await fetch('https://example-data.draftbit.com/books?_limit=10');
  const books = await res.json();

  return books.map((book: any) => ({
    id: book.id.toString(),
  }));
}

// ✅ Fonction de récupération d’un livre par ID
async function fetchBook(id: string): Promise<Book | null> {
  try {
    const res = await fetch(`https://example-data.draftbit.com/books/${id}`);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      id: data.id,
      title: data.title || 'Unknown Title',
      description: data.description || 'No description available',
      authors: data.authors || 'Unknown Author',
      rating: data.rating || 0,
      image_url: data.image_url || 'https://via.placeholder.com/150',
      price: Math.floor(Math.random() * 20) + 5,
      format: data.format || 'Unknown',
      num_pages: data.num_pages || 0,
      rating_count: data.rating_count || 0,
      review_count: data.review_count || 0,
      genres: data.genres || [],
      quotes: data.quotes,
    };
  } catch {
    return null;
  }
}

// ✅ Page produit principale
export default async function ProductPage({ params }: Props) {
  const book = await fetchBook(params.id);

  if (!book) return notFound();

  const images = [
    '/beauty.jpg',
    '/bella.jpg',
    '/clean.jpg',
    '/couple-enjoying-their-bookstore-date.jpg',
    '/full-shot-couple-having-bookstore-date.jpg',
    '/makebook.jpg',
    '/opened-book-library.jpg',
    '/pretty-woman-reading-near-library-window.jpg',
    '/room.jpg',
    '/thoughtful-female-student-sitting-cross-legged-with-book-library.jpg',
    '/young-student-learning-library.jpg',
  ];

  const randomImage = images[Math.floor(Math.random() * images.length)];

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
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <ShoppingCart className="mr-2" size={16} />
                      Ajouter au panier
                    </Button>
                    <Button
                      variant="outline"
                      className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                    >
                      <Heart className="mr-2" size={16} />
                      Favoris
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
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
