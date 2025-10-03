import users from '@/data/users.json';
import CustomerProfileForm from '@/components/features/profile/CustomerProfileForm';

export default function ProfilePage() {
  // 1. จำลองว่า Customer คนนี้ (คุณสุดา) กำลัง login อยู่
  const currentUserId = 'user_b8e7f2a1-c3d4-4e5f-8a9b-0c1d2e3f4a5b';
  
  // 2. ดึงข้อมูลผู้ใช้ปัจจุบัน
  const currentUser = users.find(user => user.id === currentUserId);

  if (!currentUser) {
    return <div>ไม่พบข้อมูลผู้ใช้</div>;
  }

  // 3. ส่งข้อมูลผู้ใช้ (currentUser) ไปให้ฟอร์ม
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">โปรไฟล์ของฉัน</h1>
      <CustomerProfileForm user={currentUser} />
    </div>
  );
}