'use client';
import { useEffect, useState } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import { Metadata } from 'next';

// Charger les polices avec next/font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  // Utiliser useEffect pour marquer quand on est côté client
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="fr">
      <body
        suppressHydrationWarning={true}  // Éviter l'erreur d'hydratation
        className={isClient ? `${geistSans.variable} ${geistMono.variable} antialiased` : ""}
      >
        {children}
      </body>
    </html>
  );
}
