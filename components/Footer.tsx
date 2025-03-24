'use client';

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaCcVisa, FaCcMastercard, FaPaypal } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Nom et profession */}
        <div className="text-left mb-4 md:mb-0">
          <p className="text-lg font-semibold">Yacine Atmani</p>
          <p className="text-sm text-gray-400">Développeur Web - Molengeek</p>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex space-x-6">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-700">
            <FaLinkedin size={24} />
          </a>
        </div>

        {/* Moyens de paiement */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <FaCcVisa size={36} className="text-blue-500" />
          <FaCcMastercard size={36} className="text-red-500" />
          <FaPaypal size={36} className="text-blue-700" />
        </div>
      </div>
    </footer>
  );
}
