"use client";

import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  if (pathname?.startsWith("/dashboard")) {
    return (
      <html lang="en">
        <body className={`antialiased`}>{children}</body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ToastContainer />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
