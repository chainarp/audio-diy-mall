"use client"; // ทั้งหน้านี้เป็น Client Component

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/context/CartContext';

export default function CartPage() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  // คำนวณยอดรวม
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">ตะกร้าสินค้าของคุณ</h1>
      
      {/* 5. ตรวจสอบว่าตะกร้าว่างหรือไม่ */}
      {cartItems.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600">ตะกร้าของคุณว่างเปล่า</p>
          <Link href="/" className="inline-block mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">
            เลือกซื้อสินค้าต่อ
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 6. ส่วนแสดงรายการสินค้าในตะกร้า (ด้านซ้าย) */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.productId} className="flex flex-col md:flex-row items-center bg-white p-4 rounded-lg shadow-md">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  width={80} 
                  height={80} 
                  className="rounded-md object-cover" 
                />
                <div className="ml-0 md:ml-4 mt-2 md:mt-0 flex-1">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-sm text-gray-600">{item.price.toLocaleString()} บาท / ชิ้น</p>
                </div>
                <div className="flex items-center space-x-3 mt-2 md:mt-0">
                  <button onClick={() => decreaseQuantity(item.productId)} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">-</button>
                  <span className="w-10 text-center font-medium">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.productId)} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">+</button>
                </div>
                <div className="ml-4 font-semibold text-lg mt-2 md:mt-0">
                  {(item.price * item.quantity).toLocaleString()} บาท
                </div>
                <button onClick={() => removeFromCart(item.productId)} className="ml-4 text-red-500 hover:text-red-700 font-bold">
                  X
                </button>
              </div>
            ))}
          </div>

          {/* 7. ส่วนสรุปยอด (ด้านขวา) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-xl font-semibold border-b pb-3 mb-4">สรุปยอดคำสั่งซื้อ</h2>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>ยอดรวม</span>
                <span>{totalAmount.toLocaleString()} บาท</span>
              </div>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>ค่าจัดส่ง</span>
                <span>(คำนวณในหน้าถัดไป)</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
                <span>ยอดสุทธิ</span>
                <span>{totalAmount.toLocaleString()} บาท</span>
              </div>
              <Link href="/checkout" className="block w-full text-center bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors mt-6">
                เข้าสู่หน้าชำระเงิน
              </Link>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}