// utils/api.ts
import { Book } from '../types/book';

export async function fetchBooks(): Promise<Book[]> {
  try {
    const res = await fetch('https://example-data.draftbit.com/books');
    if (!res.ok) throw new Error('Erreur lors du fetch des livres');
    
    const data = await res.json();
    console.log('Données récupérées depuis l\'API:', data); // Log pour vérifier les données
    
    return data.map((book: any) => ({
      id: book.id,
      title: book.title,
      authors: book.authors,
      image_url: book.image_url || '', // Assurez-vous que l'API retourne bien `image_url`
      description: book.description || "Pas de description disponible",
      format: book.format || "Inconnu",
      num_pages: book.num_pages || 0,
      rating: book.rating || 0,
      rating_count: book.rating_count || 0,
      review_count: book.review_count || 0,
      genres: book.genre_list ? book.genre_list.split(',') : [],
      price: Math.floor(Math.random() * 20) + 5, // Prix aléatoire entre 5 et 24 €
      quotes: [book.Quote1, book.Quote2, book.Quote3].filter(Boolean),
    }));
  } catch (error) {
    console.error('Erreur dans fetchBooks:', error);
    throw error;
  }
}

export async function fetchBookById(id: string): Promise<Book | null> {
  try {
    console.log('ID reçu dans fetchBookById:', id); // Log pour vérifier l'ID reçu

    const res = await fetch(`https://example-data.draftbit.com/books/${id}`);
    if (!res.ok) throw new Error('Erreur lors du fetch du livre');

    const book = await res.json();
    console.log('Livre récupéré depuis l\'API:', book); // Log pour vérifier les données récupérées

    return {
      id: book.id,
      title: book.title,
      authors: book.authors,
      image_url: book.image_url || '',
      description: book.description || "Pas de description disponible",
      format: book.format || "Inconnu",
      num_pages: book.num_pages || 0,
      rating: book.rating || 0,
      rating_count: book.rating_count || 0,
      review_count: book.review_count || 0,
      genres: book.genre_list ? book.genre_list.split(',') : [],
      price: Math.floor(Math.random() * 20) + 5, // Prix aléatoire entre 5 et 24 €
      quotes: [book.Quote1, book.Quote2, book.Quote3].filter(Boolean),
    };
  } catch (error) {
    console.error('Erreur dans fetchBookById:', error);
    return null;
  }
}