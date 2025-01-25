import type { Metadata } from "next";

import "../assets/styles/globals.css";

import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import ErrorBoundary from "@/src/components/shared/ErrorBoundary";
import { Toaster } from "@/src/components/ui/toaster";

const poppinsRegular = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "S3curity",
  description: "Efficiently authentication and authorization",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "32x32" },
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppinsRegular} antialiased`}>
        <>
          <Analytics />
          <ErrorBoundary>
            {children}
            <Toaster />
          </ErrorBoundary>
        </>
      </body>
    </html>
  );
}
