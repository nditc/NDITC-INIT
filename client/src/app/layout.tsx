import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "./components/Navbar/Navbar";
import NextTopLoader from "nextjs-toploader";
import { lightColor } from "@/utils/color";

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
        <NextTopLoader color={lightColor} />
        <Providers>
          <Navbar />
          {children}{" "}
        </Providers>
      </body>
    </html>
  );
}
