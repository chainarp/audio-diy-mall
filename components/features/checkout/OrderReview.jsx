"use client";

import Image from 'next/image';

/**
 * Component สำหรับแสดงสรุปรายการสั่งซื้อ
 * @param {{ cartItems: Array, totalAmount: number }} props
 */
export default function OrderReview({ cartItems, totalAmount }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">สรุปรายการสั่งซื้อ</h3>

      {/* รายการสินค้า */}
      <div className="space-y-3 mb-4">
        {cartItems.map((item) => (
          <div key={item.productId} className="flex items-center gap-3 pb-3 border-b">
            <Image
              src={item.image}
              alt={item.name}
              width={60}
              height={60}
              className="rounded-md object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-600">
                {item.price.toLocaleString()} บาท × {item.quantity}
              </p>
            </div>
            <div className="font-semibold text-gray-900">
              {(item.price * item.quantity).toLocaleString()} บาท
            </div>
          </div>
        ))}
      </div>

      {/* สรุปยอดเงิน */}
      <div className="space-y-2 pt-4 border-t">
        <div className="flex justify-between text-gray-700">
          <span>ยอดรวมสินค้า</span>
          <span>{totalAmount.toLocaleString()} บาท</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>ค่าจัดส่ง</span>
          <span className="text-green-600">ฟรี</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
          <span>ยอดรวมทั้งสิ้น</span>
          <span className="text-blue-600">{totalAmount.toLocaleString()} บาท</span>
        </div>
      </div>
    </div>
  );
}
