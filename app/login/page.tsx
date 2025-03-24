// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUser } = useCart();

  const handleLogin = () => {
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    if (!email.includes('@')) {
      setError('Veuillez entrer une adresse email valide.');
      return;
    }

    // Simuler une connexion réussie
    setUser(email);
    alert('Connecté !');
    router.push('/');
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-gray-900 text-white"
      style={{
        backgroundImage: "url('/beauty.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 relative">
        {/* Overlay sombre pour la lisibilité */}
        <div className="absolute inset-0 bg-black opacity-50 z-0" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full mx-4 relative z-10"
        >
          <Card className="bg-gray-800/80 border-none shadow-xl backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-center text-white">Connexion</h2>
              {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
              <div className="space-y-4">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="bg-gray-700/80 border-none text-white placeholder-gray-400 focus:ring-blue-400"
                />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  className="bg-gray-700/80 border-none text-white placeholder-gray-400 focus:ring-blue-400"
                />
                <Button
                  onClick={handleLogin}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Se connecter
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}