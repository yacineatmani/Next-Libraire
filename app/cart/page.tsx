// app/cart/page.tsx
'use client';

import { useCart } from '../context/CartContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Book } from '../../types/book'; // Assure-toi que ce type est importé

export default function CartPage() {
  const { cart, removeFromCart, setCart } = useCart();

  const handleClearCart = () => {
    setCart([]); // Utilisation de setCart pour vider le panier
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Panier</h1>
        {cart.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <>
            <button onClick={handleClearCart} className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Vider le panier
            </button>
            <ul className="space-y-4">
              {cart.map((item: Book, index: number) => (
                <li key={index} className="flex justify-between items-center border-b pb-4">
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.authors}</p>
                    <p className="text-green-600 font-bold">{item.price} €</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}