import stores from '@/data/stores.json';
import users from '@/data/users.json';
import AdminStoreTable from '@/components/features/admin/AdminStoreTable';

export default function StoreManagementPage() {
  // 1. ในฐานะ Admin เราดึงข้อมูล "ทั้งหมด" โดยไม่ต้องกรอง
  const allStores = stores;
  const allUsers = users;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">จัดการร้านค้า (Store Management)</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* 2. ส่งข้อมูลทั้งหมดเข้าไปใน Client Component */}
        <AdminStoreTable 
          stores={allStores} 
          users={allUsers} 
        />
      </div>
    </div>
  );
}