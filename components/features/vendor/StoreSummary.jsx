export default function StoreSummary({ store }) {
  return (
    <div>
      <h2 className="text-2xl font-bold border-b pb-2">{store.name}</h2>
      <div className="mt-4 space-y-2 text-gray-700">
        <p><strong>สโลแกน:</strong> {store.tagline}</p>
        <p><strong>อีเมลติดต่อ:</strong> {store.contactEmail}</p>
        <p><strong>สถานะ:</strong> {store.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}</p>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          แก้ไขข้อมูลร้านค้า
        </button>
      </div>
    </div>
  );
}