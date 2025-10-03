import users from '@/data/users.json';
import AdminUserTable from '@/components/features/admin/AdminUserTable';

export default function UserManagementPage() {
  // 1. ดึงข้อมูลผู้ใช้ทั้งหมด
  const allUsers = users;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">จัดการผู้ใช้ (User Management)</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* 2. ส่งข้อมูลผู้ใช้ทั้งหมดเข้าไปใน Client Component */}
        <AdminUserTable users={allUsers} />
      </div>
    </div>
  );
}