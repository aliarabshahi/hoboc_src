import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import localFont from 'next/font/local';

const vazir = localFont({
  src: [
    {
      path: '../public/fonts/vazirmatn/Vazirmatn-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/vazirmatn/Vazirmatn-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-vazir',
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazir.variable}`}>
      <body className="font-sans bg-main-bg min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}