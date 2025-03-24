// app/context/CartContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book } from '../../types/book';

interface CartContextType {
  cart: Book[];
  favorites: Book[];
  user: string | null;
  addToCart: (book: Book) => void;
  addToFavorites: (book: Book) => void;
  removeFromCart: (index: number) => void;
  setUser: (email: string | null) => void;
  setCart: (cart: Book[]) => void; // Ajouté
  setFavorites: (favorites: Book[]) => void; // Ajouté
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem('isConnected') === 'true' ? localStorage.getItem('userEmail') : null;
  });

  const [cart, setCart] = useState<Book[]>(() => {
    if (typeof window !== 'undefined' && user) {
      const savedCart = localStorage.getItem(`cart_${user}`);
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  const [favorites, setFavorites] = useState<Book[]>(() => {
    if (typeof window !== 'undefined' && user) {
      const savedFavorites = localStorage.getItem(`favorites_${user}`);
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    }
    return [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites_${user}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user}`);
      const savedFavorites = localStorage.getItem(`favorites_${user}`);
      setCart(savedCart ? JSON.parse(savedCart) : []);
      setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
    } else {
      setCart([]);
      setFavorites([]);
    }
  }, [user]);

  const addToCart = (book: Book) => {
    if (!user) {
      alert('Veuillez vous connecter pour ajouter au panier.');
      return;
    }
    setCart((prevCart) => {
      const updatedCart = [...prevCart, book];
      console.log('État du panier après ajout :', updatedCart);
      return updatedCart;
    });
  };

  const addToFavorites = (book: Book) => {
    if (!user) {
      alert('Veuillez vous connecter pour ajouter aux favoris.');
      return;
    }
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, book];
      console.log('État des favoris après ajout :', updatedFavorites);
      return updatedFavorites;
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((_, i) => i !== index);
      console.log('État du panier après suppression :', updatedCart);
      return updatedCart;
    });
  };

  const handleSetUser = (email: string | null) => {
    if (email) {
      localStorage.setItem('isConnected', 'true');
      localStorage.setItem('userEmail', email);
    } else {
      localStorage.removeItem('isConnected');
      localStorage.removeItem('userEmail');
    }
    setUser(email);
  };

  return (
    <CartContext.Provider
      value={{ cart, favorites, user, addToCart, addToFavorites, removeFromCart, setUser: handleSetUser, setCart, setFavorites }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé dans un CartProvider');
  }
  return context;
};