'use client'
import { useState } from 'react';

interface FiltersProps {
  onFilterChange: (filters: { genre?: string; author?: string }) => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [genre, setGenre] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  const handleFilter = () => {
    onFilterChange({ genre, author });
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-4">Filtres</h3>
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="w-full p-2 mb-4 rounded-lg bg-white dark:bg-gray-700"
      >
        <option value="">Tous les genres</option>
        <option value="Fiction">Fiction</option>
        <option value="Non-fiction">Non-fiction</option>
      </select>
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Auteur"
        className="w-full p-2 mb-4 rounded-lg bg-white dark:bg-gray-700"
      />
      <button onClick={handleFilter} className="btn-gradient w-full p-2">
        Appliquer
      </button>
    </div>
  );
}
export interface Book {
  id: number; // Ajoutez une propriété id 
  title: string;
  authors: string;
  image_url: string; // Changez de coverImage à image_url
  description: string;
  format: string;
  num_pages: number;
  rating: number;
  rating_count: number;
  review_count: number;
  genres: string[];
  price: number;
  quotes: string[];
}