import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { cn } from "@/lib/utils";

//const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: 'Delivery Guaratiba',
    description:
        'O delivey do seu bairro',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="pt-br" className={cn('font-sans')}>
          <body className={inter.className}>
            {children}
          </body>
      </html>
  );
}
