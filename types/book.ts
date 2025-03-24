// types/book.ts
export interface Book {
  id: number;
  title: string;
  authors: string;
  image_url: string;
  description: string;
  format: string;
  num_pages: number;
  rating: number;
  rating_count: number;
  review_count: number;
  genres: string[];
  price?: number; // Rendu optionnel
  quotes?: string[]; // Rendu optionnel
}