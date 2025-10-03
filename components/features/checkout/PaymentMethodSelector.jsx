"use client";

/**
 * Component สำหรับเลือกวิธีการชำระเงิน
 * @param {{ selectedMethod: import('@/lib/types').PaymentMethod, onMethodChange: (method: import('@/lib/types').PaymentMethod) => void }} props
 */
export default function PaymentMethodSelector({ selectedMethod, onMethodChange }) {
  const paymentMethods = [
    {
      id: 'BANK_TRANSFER',
      name: 'โอนเงินผ่านธนาคาร',
      description: 'โอนเงินผ่านบัญชีธนาคาร (แนบสลิปหลังโอน)',
      icon: '🏦'
    },
    {
      id: 'PROMPTPAY',
      name: 'พร้อมเพย์',
      description: 'ชำระผ่าน QR Code พร้อมเพย์',
      icon: '📱'
    },
    {
      id: 'COD',
      name: 'เก็บเงินปลายทาง',
      description: 'ชำระเงินสดเมื่อได้รับสินค้า',
      icon: '💵'
    }
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold mb-4">เลือกวิธีการชำระเงิน</h3>
      {paymentMethods.map((method) => (
        <label
          key={method.id}
          className={`
            flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all
            ${selectedMethod === method.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
            }
          `}
        >
          <input
            type="radio"
            name="paymentMethod"
            value={method.id}
            checked={selectedMethod === method.id}
            onChange={(e) => onMethodChange(e.target.value)}
            className="mt-1 mr-3"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{method.icon}</span>
              <span className="font-medium text-gray-900">{method.name}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{method.description}</p>
          </div>
        </label>
      ))}
    </div>
  );
}
