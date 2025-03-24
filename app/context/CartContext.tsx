"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Book } from "../../types/book";

interface CartContextType {
  cart: Book[];
  favorites: Book[];
  user: string | null;
  addToCart: (book: Book) => void;
  addToFavorites: (book: Book) => void;
  removeFromCart: (index: number) => void;
  setUser: (email: string | null) => void;
  setCart: (cart: Book[]) => void;
  setFavorites: (favorites: Book[]) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [cart, setCart] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<Book[]>([]);

  // Charger les données depuis localStorage uniquement côté client au montage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isConnected = localStorage.getItem("isConnected") === "true";
      const userEmail = isConnected ? localStorage.getItem("userEmail") : null;
      setUser(userEmail);

      if (userEmail) {
        const savedCart = localStorage.getItem(`cart_${userEmail}`);
        const savedFavorites = localStorage.getItem(`favorites_${userEmail}`);
        setCart(savedCart ? JSON.parse(savedCart) : []);
        setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
      }
    }
  }, []);

  // Mettre à jour localStorage lorsque cart ou favorites changent
  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      localStorage.setItem(`cart_${user}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      localStorage.setItem(`favorites_${user}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  // Synchroniser cart et favorites lorsque l'utilisateur change
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user) {
        const savedCart = localStorage.getItem(`cart_${user}`);
        const savedFavorites = localStorage.getItem(`favorites_${user}`);
        setCart(savedCart ? JSON.parse(savedCart) : []);
        setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
      } else {
        setCart([]);
        setFavorites([]);
      }
    }
  }, [user]);

  const addToCart = (book: Book) => {
    if (!user) {
      alert("Veuillez vous connecter pour ajouter au panier.");
      return;
    }
    setCart((prevCart) => {
      const updatedCart = [...prevCart, book];
      console.log("État du panier après ajout :", updatedCart);
      return updatedCart;
    });
  };

  const addToFavorites = (book: Book) => {
    if (!user) {
      alert("Veuillez vous connecter pour ajouter aux favoris.");
      return;
    }
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, book];
      console.log("État des favoris après ajout :", updatedFavorites);
      return updatedFavorites;
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((_, i) => i !== index);
      console.log("État du panier après suppression :", updatedCart);
      return updatedCart;
    });
  };

  const handleSetUser = (email: string | null) => {
    if (typeof window !== "undefined") {
      if (email) {
        localStorage.setItem("isConnected", "true");
        localStorage.setItem("userEmail", email);
      } else {
        localStorage.removeItem("isConnected");
        localStorage.removeItem("userEmail");
      }
      setUser(email);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        user,
        addToCart,
        addToFavorites,
        removeFromCart,
        setUser: handleSetUser,
        setCart,
        setFavorites,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé dans un CartProvider");
  }
  return context;
};