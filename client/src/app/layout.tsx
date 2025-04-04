import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Layout/Navbar";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Layout/Footer";
import ExtendedColors from "../../color.config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/components/Admin/Dashboard/Dashboard.css";
// const inter = Inter({ subsets: ["latin"] });  disabled for offline usage

export const metadata: Metadata = {
  title: "INIT 5.0",
  description: "Conquer The Matrix",
  icons: { icon: "/android-chrome-192x192" },
  manifest: "/seo/site.webmanifest",
  openGraph: {
    images: [
      {
        url: "/seo/android-chrome-512x512",
        width: 512,
        height: 512,
        alt: "INIT Logo",
      },
    ],
  },
  twitter: {
    images: [
      {
        url: "/seo/android-chrome-512x512",
        width: 512,
        height: 512,
        alt: "INIT Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={"bg-primary-650"}>
        <NextTopLoader color={ExtendedColors["primary"]["400"]} />
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <ToastContainer
            bodyClassName={"Inter"}
            theme="dark"
            limit={3}
            toastStyle={{
              backgroundColor: ExtendedColors.secondary["600"],
            }}
          />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
