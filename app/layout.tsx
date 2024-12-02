import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Panel Administrativo de Empleados",
  description: "Panel Administrativo de Empleados",
  authors: [{ name: "José Angel Morales Rodríguez (jamorar) & Juan Daniel Ladino Hernandez", url: "https://github.com/jamorar" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
