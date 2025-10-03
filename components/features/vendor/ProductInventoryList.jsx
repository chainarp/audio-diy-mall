export default function ProductInventoryList({ products, storageLocations }) {
  
  // สร้าง Map เพื่อให้ค้นหาชื่อที่จัดเก็บได้ง่ายและเร็ว
  const locationMap = new Map(storageLocations.map(loc => [loc.id, loc.label]));

  const getStatusClass = (status) => {
    switch (status) {
      case 'FOR_SALE': return 'bg-green-100 text-green-800';
      case 'IN_STOCK': return 'bg-blue-100 text-blue-800';
      case 'SOLD': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold border-b pb-2">คลังสินค้า (Inventory)</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สินค้า</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ราคาขาย</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ที่เก็บ</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map(prod => (
              <tr key={prod.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{prod.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(prod.status)}`}>
                    {prod.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{prod.pricing.selling.toLocaleString()} บาท</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{locationMap.get(prod.storageLocationId) || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}