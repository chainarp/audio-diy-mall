import Link from 'next/link';
import CartIndicator from '@/components/features/cart/CartIndicator';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* ส่วนโลโก้ */}
        <Link href="/" className="text-xl font-bold">
          Audio DIY Mall
        </Link>

        {/* ส่วนเมนูอื่นๆ (สามารถเพิ่มเติมได้ในอนาคต) */}
        <div className="hidden md:flex items-center space-x-4">
          {/* <Link href="/stores">ร้านค้าทั้งหมด</Link> */}
          {/* <Link href="/about">เกี่ยวกับเรา</Link> */}
        </div>
        
        {/* ส่วนผู้ใช้และตะกร้าสินค้า */}
        <div className="flex items-center">
          {/* <Link href="/vendor/dashboard" className="text-sm mr-4">สำหรับผู้ขาย</Link> */}
          {/* <Link href="/profile" className="text-sm mr-4">โปรไฟล์</Link> */}
          <CartIndicator />
        </div>

      </div>
    </nav>
  );
}