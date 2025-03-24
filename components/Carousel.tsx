
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Book } from '../types/book';
import Image from 'next/image';
import Link from 'next/link';

interface CarouselProps {
  books: Book[];
}

export default function Carousel({ books }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const maxVisibleSlides = 3; // Nombre maximum de diapositives visibles en même temps
  
  // S'assurer que nous avons suffisamment de livres à afficher
  const safeBooks = books && books.length > 0 ? books : [];
  
  const goToPrevious = () => {
    if (isAnimating || safeBooks.length <= maxVisibleSlides) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? Math.max(0, safeBooks.length - maxVisibleSlides) : Math.max(0, prevIndex - 1);
      return newIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating || safeBooks.length <= maxVisibleSlides) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const maxStartIndex = Math.max(0, safeBooks.length - maxVisibleSlides);
      const newIndex = prevIndex >= maxStartIndex ? 0 : prevIndex + 1;
      return newIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Si aucun livre n'est disponible
  if (safeBooks.length === 0) {
    return (
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-300">Aucun livre disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full py-6 overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Livres à découvrir
      </h2>
      
      {/* Conteneur principal avec effet de carte */}
      <div className="relative px-12">
        {/* Bouton précédent - positionné avec z-index élevé */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full"
          disabled={safeBooks.length <= maxVisibleSlides}
          aria-label="Livre précédent"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Slides horizontaux */}
        <div className="flex overflow-hidden mx-auto">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / maxVisibleSlides)}%)`,
              width: `${safeBooks.length * (100 / maxVisibleSlides)}%`
            }}
          >
            {safeBooks.map((book) => (
              <div 
                key={book.id} 
                className="px-2"
                style={{ width: `${100 / safeBooks.length}%` }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-col transform transition-transform hover:scale-105">
                  {/* Image du livre */}
                  <div className="relative h-56 w-full">
                    <Image
                      src={book.image_url || '/placeholder-book.jpg'}
                      alt={book.title}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  
                  {/* Contenu du livre */}
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1 line-clamp-1">{book.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{book.authors}</p>
                    
                    {/* Prix et étoiles */}
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            className={`w-4 h-4 ${i < Math.round(book.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{book.price}€</span>
                    </div>
                    
                    {/* Bouton Voir détails */}
                    <Link className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-center transition-colors" href={`/product/${book.id}`}>
                      
                        Voir détails
                    
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bouton suivant - positionné avec z-index élevé */}
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full"
          disabled={safeBooks.length <= maxVisibleSlides}
          aria-label="Livre suivant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}