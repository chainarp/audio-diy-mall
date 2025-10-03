import Link from 'next/link';

export default function CustomerOrderList({ orders, storeMap }) {

  const getStatusClass = (status) => {
    switch (status) {
      case 'SHIPPED': return 'bg-blue-100 text-blue-800';
      case 'PROCESSING': return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">เลขที่คำสั่งซื้อ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่สั่งซื้อ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ร้านค้า</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ยอดรวม</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                ยังไม่มีประวัติคำสั่งซื้อ
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{order.orderNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {storeMap.get(order.storeId) || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {order.totalAmount.toLocaleString()} บาท
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/profile/orders/${order.id}`} className="text-indigo-600 hover:text-indigo-900">
                    ดูรายละเอียด
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}