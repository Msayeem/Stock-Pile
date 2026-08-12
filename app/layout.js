import "./globals.css";

import { AppNavbar } from "@/components/Navbar";
import { Toaster } from "sonner";
import Footer from "./components/Footer";

export const metadata = {
  title: {
    default: "StockPile — Product & Order Management",
    template: "%s | StockPile",
  },
  description:
    "StockPile is a modern product and order management platform. Browse products, manage inventory, and track your orders in one place.",
  keywords: ["inventory", "products", "orders", "management", "stockpile"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        
          {/* Top navigation bar */}
          <AppNavbar />

          {/* Page content */}
          <main className="min-h-screen bg-[--background] pt-16 ">
            {children}
          </main>

          {/* Global toast notifications */}
          <Toaster
            position="bottom-right"
            richColors
            theme="dark"
            toastOptions={{
              style: {
                fontFamily: "Inter, system-ui, sans-serif",
                borderRadius: "12px",
              },
            }}
          />
       <Footer></Footer>
      </body>
    </html>
  );
}
