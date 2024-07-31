import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Layout/Navbar";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Layout/Footer";
import ExtendedColors from "../../color.config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "INIT",
  description: "Ascend The Assembly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + " " + "dark:bg-[#141028]"}>
        <NextTopLoader color={ExtendedColors["primary"]["400"]} />
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
