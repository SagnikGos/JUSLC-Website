import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { PT_Sans } from "next/font/google";
import "./globals.css"; // Ensure your globals.css includes Matsu theme variables and Tailwind directives

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "SL Communities | JU - Reimagine Campus Life", // Updated Title
  description: "Join vibrant student communities at Jadavpur University's Salt Lake Campus. Get involved in cultural, technical, sports, and growth activities.", // Updated Description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${nunito.variable} ${ptSans.variable} font-sans antialiased relative bg-background text-foreground`} // Use Matsu theme's font variables and background/text colors
      >
        {/* This div is crucial for the Matsu theme's texture */}
        <div className="texture" />
        {/* Ensure the main content is relatively positioned to appear above the texture */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}