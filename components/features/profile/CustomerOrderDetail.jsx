import Link from 'next/link';

export default function CustomerOrderDetail({ order, items }) {

  const getStatusClass = (status) => {
    switch (status) {
      case 'SHIPPED': return 'bg-blue-100 text-blue-800';
      case 'PROCESSING': return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* ส่วนหัว: สรุปข้อมูล Order */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold">รายละเอียดคำสั่งซื้อ</h1>
            <p className="text-gray-600 mt-1">Order ID: {order.orderNumber}</p>
            <p className="text-sm text-gray-500">
              สั่งซื้อเมื่อ: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-left md:text-right">
            <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusClass(order.status)}`}>
              สถานะ: {order.status}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ส่วนที่ 2: รายการสินค้า */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold border-b pb-2 mb-4">รายการสินค้า</h2>
          <ul className="divide-y divide-gray-200">
            {items.map(item => (
              <li key={item.id} className="py-4 flex">
                <img 
                  src={item.productImage} 
                  alt={item.productName} 
                  className="h-20 w-20 rounded-md object-cover" 
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-gray-900">{item.productName}</h3>
                  <p className="text-sm text-gray-500">จำนวน: {item.quantity}</p>
                  <p className="text-sm text-gray-500">
                    ราคา (ณ วันที่ซื้อ): {item.priceAtTimeOfOrder.toLocaleString()} บาท
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ส่วนที่ 3: ที่อยู่จัดส่งและยอดรวม */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">ที่อยู่สำหรับจัดส่ง</h2>
            <div className="space-y-1 text-gray-700">
              <p className="font-medium">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.phone}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">สรุปยอด</h2>
            <div className="flex justify-between text-gray-700">
              <p>ยอดรวม</p>
              <p>{order.totalAmount.toLocaleString()} บาท</p>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 mt-4 border-t pt-4">
              <p>ยอดสุทธิ</p>
              <p>{order.totalAmount.toLocaleString()} บาท</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}