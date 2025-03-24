'use client'
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    localStorage.setItem('isConnected', 'true');
    alert('Connecté !');
  };

  return (
    <div
    className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800"
    style={{
      backgroundImage: "url('/opened-book-library.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
          <div className="glass p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-white">Connexion</h2>
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
        <button onClick={handleLogin} className="btn-gradient w-full p-3">
          Se connecter
        </button>
      </div>
    </div>
  );
}