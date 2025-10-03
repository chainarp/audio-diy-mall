"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/context/CartContext';
import ShippingAddressForm from '@/components/features/checkout/ShippingAddressForm';
import PaymentMethodSelector from '@/components/features/checkout/PaymentMethodSelector';
import OrderReview from '@/components/features/checkout/OrderReview';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();

  // State สำหรับที่อยู่จัดส่ง
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address: '',
    phone: ''
  });

  // State สำหรับวิธีการชำระเงิน
  const [paymentMethod, setPaymentMethod] = useState('BANK_TRANSFER');

  // คำนวณยอดรวม
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // ตรวจสอบว่าตะกร้าว่างหรือไม่
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">ตะกร้าสินค้าว่างเปล่า</h1>
        <p className="text-gray-600 mb-6">กรุณาเพิ่มสินค้าลงในตะกร้าก่อนทำการสั่งซื้อ</p>
        <Link href="/" className="inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700">
          กลับไปเลือกสินค้า
        </Link>
      </div>
    );
  }

  // ตรวจสอบความครบถ้วนของข้อมูล
  const isFormValid = () => {
    return (
      shippingAddress.name.trim() !== '' &&
      shippingAddress.address.trim() !== '' &&
      shippingAddress.phone.trim() !== '' &&
      paymentMethod !== ''
    );
  };

  // ฟังก์ชันสำหรับยืนยันคำสั่งซื้อ
  const handleSubmitOrder = () => {
    if (!isFormValid()) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    // TODO: ในอนาคตจะทำการส่งข้อมูลไป Backend API
    // - สร้าง Order
    // - สร้าง OrderItems
    // - สร้าง Payment record (status: PENDING)

    const orderData = {
      cartItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      createdAt: new Date().toISOString()
    };

    console.log('(จำลอง) สร้างคำสั่งซื้อ:', orderData);

    // ล้างตะกร้า
    clearCart();

    // แสดงข้อความสำเร็จ
    alert(`สั่งซื้อสำเร็จ!\n\nยอดรวม: ${totalAmount.toLocaleString()} บาท\nวิธีชำระเงิน: ${getPaymentMethodName(paymentMethod)}\n\nกรุณาชำระเงินภายใน 24 ชั่วโมง`);

    // นำทางไปหน้า Orders (ในอนาคต)
    router.push('/profile/orders');
  };

  const getPaymentMethodName = (method) => {
    const methods = {
      'BANK_TRANSFER': 'โอนเงินผ่านธนาคาร',
      'PROMPTPAY': 'พร้อมเพย์',
      'COD': 'เก็บเงินปลายทาง'
    };
    return methods[method] || method;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ชำระเงิน</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ส่วนซ้าย: ฟอร์มกรอกข้อมูล */}
        <div className="lg:col-span-2 space-y-6">

          {/* ที่อยู่จัดส่ง */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ShippingAddressForm
              address={shippingAddress}
              onAddressChange={setShippingAddress}
            />
          </div>

          {/* วิธีการชำระเงิน */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <PaymentMethodSelector
              selectedMethod={paymentMethod}
              onMethodChange={setPaymentMethod}
            />
          </div>

        </div>

        {/* ส่วนขวา: สรุปคำสั่งซื้อ */}
        <div className="lg:col-span-1">
          <OrderReview
            cartItems={cartItems}
            totalAmount={totalAmount}
          />

          {/* ปุ่มยืนยันคำสั่งซื้อ */}
          <button
            onClick={handleSubmitOrder}
            disabled={!isFormValid()}
            className={`
              w-full mt-6 font-bold py-3 px-6 rounded-lg transition-colors
              ${isFormValid()
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            ยืนยันคำสั่งซื้อ
          </button>

          <Link
            href="/cart"
            className="block w-full text-center mt-3 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← กลับไปแก้ไขตะกร้า
          </Link>
        </div>

      </div>
    </div>
  );
}
