'use client';

import Navbar from '../../components/Navbar'; // Import de la Navbar
import Footer from '../../components/Footer'; // Import du Footer

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {/* Section Title */}
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
            À propos de Next-Librairie
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            Next-Librairie est une super librairie moderne offrant un large choix
            de livres pour tous les goûts. Que vous soyez passionné de romans,
            d'essais ou de bandes dessinées, vous trouverez votre bonheur chez
            nous. Découvrez un espace chaleureux et inspirant pour les amateurs
            de lecture.
          </p>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="card border-0 shadow-lg rounded-lg overflow-hidden">
              <img
                src="/beauty.jpg"
                alt="Beautiful Library"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 bg-white dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Un espace inspirant
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Plongez dans un univers de beauté et de sérénité. Notre
                  librairie est conçue pour offrir une expérience unique, où
                  chaque visite est une invitation à explorer de nouveaux mondes.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card border-0 shadow-lg rounded-lg overflow-hidden">
              <img
                src="/room.jpg"
                alt="Cozy Reading Room"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 bg-white dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Un coin lecture chaleureux
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Profitez de notre coin lecture confortable pour feuilleter vos
                  livres préférés. Un endroit parfait pour se détendre et se
                  perdre dans les pages d'une histoire captivante.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}