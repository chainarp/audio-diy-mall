import Link from 'next/link';

export default function VendorProductTable({ products, storageLocations }) {
  // สร้าง Map เพื่อให้ค้นหาชื่อที่จัดเก็บได้ง่าย
  const locationMap = new Map(storageLocations.map(loc => [loc.id, loc.label]));

  const getStatusClass = (status) => {
    switch (status) {
      case 'FOR_SALE': return 'bg-green-100 text-green-800';
      case 'IN_STOCK': return 'bg-blue-100 text-blue-800';
      case 'SOLD': return 'bg-gray-200 text-gray-800';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สินค้า</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ราคาขาย</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ราคาทุน</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ที่เก็บ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">จัดการ</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((prod) => (
            <tr key={prod.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{prod.name}</div>
                <div className="text-sm text-gray-500">{prod.brand}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(prod.status)}`}>
                  {prod.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{prod.pricing.selling.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prod.pricing.cost.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {locationMap.get(prod.storageLocationId) || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <Link href={`/vendor/products/${prod.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                  แก้ไข
                </Link>
                <button className="text-red-600 hover:text-red-900">
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}