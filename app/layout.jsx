import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/lib/context/CartContext';

export const metadata = {
  title: 'Audio DIY Mall',
  description: 'ศูนย์รวมหลอดวิทยุและอุปกรณ์ DIY คุณภาพสูง',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning={true}>
        <CartProvider>
          <Navbar />
          <main className="flex-grow container mx-auto p-4">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
