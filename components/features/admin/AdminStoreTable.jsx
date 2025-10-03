"use client"; // ต้องเป็น Client Component เพื่อให้ปุ่มทำงานได้

export default function AdminStoreTable({ stores, users }) {
  
  // 1. สร้าง Map เพื่อให้ค้นหาชื่อเจ้าของ (Owner) ได้ง่าย
  const userMap = new Map(users.map(user => [user.id, user.name]));

  // 2. ฟังก์ชันจำลองการจัดการ Store
  const handleApprove = (storeId) => {
    // ในอนาคต เราจะยิง API ไปที่ Backend เพื่ออัปเดตสถานะ
    console.log(`(จำลอง) อนุมัติร้านค้า ID: ${storeId}`);
    alert(`(จำลอง) อนุมัติร้านค้า ID: ${storeId}`);
  };

  const handleDeactivate = (storeId) => {
    // ในอนาคต เราจะยิง API
    console.log(`(จำลอง) ระงับร้านค้า ID: ${storeId}`);
    alert(`(จำลอง) ระงับร้านค้า ID: ${storeId}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อร้านค้า</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">เจ้าของ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">จัดการ</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stores.map((store) => (
            <tr key={store.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{store.name}</div>
                <div className="text-sm text-gray-500">{store.slug}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                {userMap.get(store.ownerId) || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {store.isActive ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Inactive
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                {/* 3. แสดงปุ่มตามสถานะของร้าน */}
                {store.isActive ? (
                  <button 
                    onClick={() => handleDeactivate(store.id)} 
                    className="text-red-600 hover:text-red-900"
                  >
                    ระงับ
                  </button>
                ) : (
                  <button 
                    onClick={() => handleApprove(store.id)} 
                    className="text-green-600 hover:text-green-900"
                  >
                    อนุมัติ
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}