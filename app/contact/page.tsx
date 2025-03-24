// app/contact/page.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section avec clean.jpg */}
        <section
          className="relative py-24 bg-cover bg-center"
          style={{ backgroundImage: "url('/clean.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50 dark:opacity-60" />
          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl font-bold mb-4 text-white dark:text-white"
            >
              Contactez-nous
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl max-w-2xl mx-auto text-white dark:text-gray-200"
            >
              Nous sommes là pour répondre à vos questions. Envoyez-nous un message !
            </motion.p>
          </div>
        </section>

        {/* Contenu principal */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Formulaire */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md dark:shadow-xl">
                  <div className="text-center mb-6">
                    <img
                      src="/book-stack.png"
                      alt="Makebook Logo"
                      className="w-26 h-24 mx-auto  shadow-md hover:scale-105 transition-transform"
                    />
                  </div>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        type="text"
                        placeholder="Votre Nom"
                        className="bg-gray-100 dark:bg-gray-600 border-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                      />
                      <Input
                        type="email"
                        placeholder="Votre Email"
                        className="bg-gray-100 dark:bg-gray-600 border-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                      />
                    </div>
                    <Input
                      type="text"
                      placeholder="Sujet"
                      className="bg-gray-100 dark:bg-gray-600 border-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                    <Textarea
                      placeholder="Message"
                      rows={4}
                      className="bg-gray-100 dark:bg-gray-600 border-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                    <Button
                      type="submit"
                      className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                    >
                      Envoyer le Message
                    </Button>
                  </form>
                </div>
              </motion.div>

              {/* Infos de contact avec bella.jpg */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md dark:shadow-xl text-center">
                  <img
                    src="/bella.jpg"
                    alt="Contact Illustration"
                    className="w-32 h-32 mx-auto mb-4 rounded-full shadow-md hover:scale-105 transition-transform"
                  />
                  <h6 className="font-bold text-lg text-gray-900 dark:text-white">Notre Adresse</h6>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Place de la Minoterie 10, 1080 Molenbeek-Saint-Jean
                  </p>
                  <h6 className="font-bold text-lg text-gray-900 dark:text-white mt-4">Horaires d'ouverture</h6>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Lundi à Vendredi : 8h - 17h
                  </p>
                  <h6 className="font-bold text-lg text-gray-900 dark:text-white mt-4">Nous Contacter</h6>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Téléphone : 0484 138 546
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Email :{" "}
                    <a href="mailto:yacineatmani1080@gmail.com" className="text-blue-500 dark:text-blue-400 hover:underline">
                      yacineatmani1080@gmail.com
                    </a>
                  </p>
                </div>
                <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-4">
                  Fermé les jours fériés, mais disponible par email.
                </p>
              </motion.div>
            </div>

            {/* Carte Google Maps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <div className="rounded-lg overflow-hidden shadow-md dark:shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2518.168679866877!2d4.33703081590864!3d50.8503469795326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c480bae42c03%3A0x355dcb11ddcc0de2!2sPl.%20de%20la%20Minoterie%2010%2C%201080%20Molenbeek-Saint-Jean%2C%20Belgium!5e0!3m2!1sen!2sfr!4v1662479114852!5m2!1sen!2sfr"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="mt-6 text-center">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Place+de+la+Minoterie+10,+1080+Molenbeek-Saint-Jean,+Belgium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
                    Obtenir l'Itinéraire
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}