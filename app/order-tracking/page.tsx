"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { motion } from "framer-motion";

// Données fictives de commandes
const fakeOrders = [
  { id: "ORD001", date: "2025-03-20", status: "En préparation", items: ["Book A", "Book B"], total: 35 },
  { id: "ORD002", date: "2025-03-18", status: "Expédié", items: ["Book C"], total: 15 },
  { id: "ORD003", date: "2025-03-15", status: "Livré", items: ["Book D", "Book E"], total: 50 },
];

export default function OrderTracking() {
  const [orders, setOrders] = useState(fakeOrders);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="container mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Suivi de vos commandes
          </motion.h1>
          {orders.length === 0 ? (
            <p className="text-center text-gray-400 text-lg">Aucune commande à afficher pour le moment.</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="bg-gray-800 border-none shadow-xl">
                  <CardHeader>
                    <h2 className="text-xl font-semibold">Commande #{order.id}</h2>
                    <p className="text-sm text-gray-400">Date : {order.date}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg mb-2">Statut : <span className={order.status === "Livré" ? "text-green-400" : "text-yellow-400"}>{order.status}</span></p>
                    <p className="text-sm mb-2">Articles : {order.items.join(", ")}</p>
                    <p className="text-sm">Total : {order.total}€</p>
                    <Button
                      variant="outline"
                      className="mt-4 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                    >
                      Voir les détails
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}