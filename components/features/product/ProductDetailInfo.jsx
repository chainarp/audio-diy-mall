"use client";

import { useState } from 'react';
import { useCart } from '@/lib/context/CartContext';

/**
 * @param {{ product: import('@/lib/types').Product }} props
 */
export default function ProductDetailInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`เพิ่ม "${product.name}" จำนวน ${quantity} ชิ้น ลงในตะกร้าแล้ว!`);
  };

  return (
    // ... (JSX ทั้งหมดเหมือนเดิม) ...
    <div className="flex flex-col space-y-4">
      {/* ... (ข้อมูลสินค้า) ... */}
      <div className="flex items-center space-x-4">
        <label htmlFor="quantity" className="font-medium">จำนวน:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          min="1"
          className="w-20 border border-gray-300 rounded-md shadow-sm p-2 text-center"
        />
      </div>
      <button 
        onClick={handleAddToCart}
        className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
      >
        เพิ่มลงตะกร้า
      </button>
      {/* ... (รายละเอียดสินค้า) ... */}
    </div>
  );
}