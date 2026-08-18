import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CosturaCost",
  description:
    "Sistema web para calcular costos de prendas textiles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}