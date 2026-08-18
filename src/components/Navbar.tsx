"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* LOGO */}
          <Link
            href="/"
            className="text-2xl font-bold text-green-900"
          >
            🧵 CosturaCost
          </Link>

          {/* MENÚ DESKTOP */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-green-900 transition"
            >
              Inicio
            </Link>

            <Link
              href="/about"
              className="text-gray-700 hover:text-green-900 transition"
            >
              Acerca de
            </Link>

            <Link
              href="/contact"
              className="text-gray-700 hover:text-green-900 transition"
            >
              Contacto
            </Link>

            <Link
              href="/login"
              className="text-gray-700 hover:text-green-900 transition"
            >
              Iniciar sesión
            </Link>

            <Link
              href="/register"
              className="bg-green-900 text-white px-5 py-2.5 rounded-lg hover:bg-green-800 transition"
            >
              Registrarse
            </Link>
          </div>

          {/* BOTÓN MÓVIL */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-green-900"
          >
            ☰
          </button>
        </div>

        {/* MENÚ MÓVIL */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4 space-y-3">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700"
            >
              Inicio
            </Link>

            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700"
            >
              Acerca de
            </Link>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700"
            >
              Contacto
            </Link>

            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700"
            >
              Iniciar sesión
            </Link>

            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="block bg-green-900 text-white px-4 py-2 rounded-lg text-center"
            >
              Registrarse
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}