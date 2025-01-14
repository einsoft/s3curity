import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../assets/styles/globals.css";

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
    <html lang="en">
      <body className={`${poppinsRegular} antialiased`}>{children}</body>
    </html>
  );
}
