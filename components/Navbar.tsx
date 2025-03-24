"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "../app/context/CartContext";
import ThemeToggle from "./ThemeToggle"; // Assumé existant

const Navbar = () => {
  const { cart, favorites, user, setUser } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${search}`);
      setSearch("");
    }
  };

  const handleLogout = () => {
    setUser(null);
    alert("Déconnecté !");
    router.push("/login");
  };

  // Animation pour le menu mobile
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/book-stack.png" alt="MakeBook Logo" className="h-10 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            <Link href="/" className={`text-sm font-medium hover:text-blue-400 transition-colors ${pathname === "/" ? "text-blue-400" : ""}`}>
              Accueil
            </Link>
            <Link href="/about" className={`text-sm font-medium hover:text-blue-400 transition-colors ${pathname === "/about" ? "text-blue-400" : ""}`}>
              À propos
            </Link>
            <Link href="/contact" className={`text-sm font-medium hover:text-blue-400 transition-colors ${pathname === "/contact" ? "text-blue-400" : ""}`}>
              Contact
            </Link>
            <Link href="/products" className={`text-sm font-medium hover:text-blue-400 transition-colors ${pathname === "/products" ? "text-blue-400" : ""}`}>
              Catalogue
            </Link>
            <Link href="/order-tracking" className={`text-sm font-medium hover:text-blue-400 transition-colors ${pathname === "/order-tracking" ? "text-blue-400" : ""}`}>
              Suivi des commandes
            </Link>
          </div>

          {/* Barre de recherche */}
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="bg-gray-800 border-none text-white focus:ring-blue-400"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Rechercher
            </Button>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <Button onClick={handleLogout} variant="destructive" size="sm">
                Déconnexion
              </Button>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
                  Connexion
                </Button>
              </Link>
            )}

            {/* Favoris */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/favorites")}
                onMouseEnter={() => setIsFavoritesModalOpen(true)}
                onMouseLeave={() => setIsFavoritesModalOpen(false)}
                className="text-white hover:text-blue-400"
              >
                <Heart size={20} />
                <span className="ml-1">({favorites.length})</span>
              </Button>
              <AnimatePresence>
                {isFavoritesModalOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-10 right-0 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-64 text-gray-900 dark:text-white"
                  >
                    <h3 className="font-bold mb-2">Vos Favoris</h3>
                    {favorites.length === 0 ? (
                      <p className="text-sm">Aucun favori.</p>
                    ) : (
                      favorites.map((item) => (
                        <div key={item.id} className="py-2 border-b last:border-b-0">
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.authors}</p>
                          <p className="text-sm text-green-600">{item.price} €</p>
                        </div>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Panier */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/cart")}
                onMouseEnter={() => setIsCartModalOpen(true)}
                onMouseLeave={() => setIsCartModalOpen(false)}
                className="text-white hover:text-blue-400"
              >
                <ShoppingCart size={20} />
                <span className="ml-1">({cart.length})</span>
              </Button>
              <AnimatePresence>
                {isCartModalOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-10 right-0 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-64 text-gray-900 dark:text-white"
                  >
                    <h3 className="font-bold mb-2">Votre Panier</h3>
                    {cart.length === 0 ? (
                      <p className="text-sm">Panier vide.</p>
                    ) : (
                      cart.map((item) => (
                        <div key={item.id} className="py-2 border-b last:border-b-0">
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.authors}</p>
                          <p className="text-sm text-green-600">{item.price} €</p>
                        </div>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden bg-gray-800 p-4 mt-2 absolute w-full left-0 top-16 z-40"
          >
            <div className="flex flex-col space-y-4">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className={pathname === "/" ? "text-blue-400" : ""}>
                Accueil
              </Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)} className={pathname === "/about" ? "text-blue-400" : ""}>
                À propos
              </Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)} className={pathname === "/contact" ? "text-blue-400" : ""}>
                Contact
              </Link>
              <Link href="/products" onClick={() => setIsMenuOpen(false)} className={pathname === "/products" ? "text-blue-400" : ""}>
                Catalogue
              </Link>
              <Link href="/order-tracking" onClick={() => setIsMenuOpen(false)} className={pathname === "/order-tracking" ? "text-blue-400" : ""}>
                Suivi des commandes
              </Link>
              <form onSubmit={handleSearch} className="flex flex-col space-y-2">
                <Input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher..."
                  className="bg-gray-700 border-none text-white"
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Rechercher
                </Button>
              </form>
              {user ? (
                <Button onClick={handleLogout} variant="destructive" size="sm">
                  Déconnexion
                </Button>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full border-blue-400 text-blue-400">
                    Connexion
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;