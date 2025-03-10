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
