import stores from '@/data/stores.json';
import StoreSettingsForm from '@/components/features/vendor/StoreSettingsForm';

export default function SettingsPage() {
  // 1. จำลองว่า Vendor คนนี้ (วิมล) กำลัง login อยู่
  const currentUserId = 'user_a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d';
  
  // 2. ดึงข้อมูลร้านค้าปัจจุบันของเขา
  const userStore = stores.find(store => store.ownerId === currentUserId);

  if (!userStore) {
    return <div>ไม่พบร้านค้าของคุณ</div>;
  }

  // 3. ส่งข้อมูลร้านค้า (userStore) ทั้งหมดไปเป็น prop ให้กับฟอร์ม
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">ตั้งค่าร้านค้า</h1>
      <StoreSettingsForm store={userStore} />
    </div>
  );
}