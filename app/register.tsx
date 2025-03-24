'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../app/context/CartContext';

export default function Register() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setUser } = useCart();
  const router = useRouter();

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    setUser(email); // Utilise l’email comme identifiant dans CartContext
    localStorage.setItem('user', JSON.stringify({ name, email }));
    alert('Inscrit !');
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/library-bg.jpg)' }}>
      <div className="glass p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-white">Inscription</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom"
          className="w-full p-3 mb-4 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 text-black dark:text-white"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 text-black dark:text-white"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="w-full p-3 mb-4 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 text-black dark:text-white"
        />
        <button onClick={handleRegister} className="btn-gradient w-full p-3">
          S'inscrire
        </button>
      </div>
    </div>
  );
}