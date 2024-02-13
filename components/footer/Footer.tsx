import { titleFont } from "@/config/fonts";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="flex bottom-0 w-full text-gray-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <span className={`antialiased font-bold ${titleFont.className}`}>
              Ecommercito
            </span>
          </Link>
          <span className="border-l border-gray-600 h-5 mx-2"></span>
          <span>&copy; {new Date().getFullYear()} Ecommercito</span>
        </div>
        <div className="space-x-4">
          <Link href="/privacy">
            <span className="hover:underline">Privacidad & Legal</span>
          </Link>
          {/* Agrega aquí más enlaces si es necesario */}
        </div>
      </div>
    </footer>
  );
};
