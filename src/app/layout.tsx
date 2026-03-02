import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luxe Stays | Premium Property Rentals",
  description: "Curated Escapes for the Discerning Traveler",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
