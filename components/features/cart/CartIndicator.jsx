"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext'; 

export default function CartIndicator() {
  const { cartItems } = useCart();
  const [itemCount, setItemCount] = useState(0);

  // อัปเดตตัวเลข เมื่อ cartItems จาก Context เปลี่ยน
  useEffect(() => {
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setItemCount(totalCount);
  }, [cartItems]); // 👈 ทำงานทุกครั้งที่ cartItems เปลี่ยน

  return (
    <Link href="/cart" className="relative flex items-center p-2">
      <span className="text-2xl">🛒</span>
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
}