import orders from '@/data/orders.json';
import stores from '@/data/stores.json';
import CustomerOrderList from '@/components/features/profile/CustomerOrderList';

export default function OrderHistoryPage() {
  // 1. จำลองว่า Customer คนนี้ (คุณสุดา) กำลัง login อยู่
  const currentUserId = 'user_b8e7f2a1-c3d4-4e5f-8a9b-0c1d2e3f4a5b';

  // 2. ดึงข้อมูลคำสั่งซื้อเฉพาะของ Customer คนนี้
  const userOrders = orders.filter(order => order.customerId === currentUserId);
  
  // 3. (ไม่บังคับ) สร้าง Map ของร้านค้าเพื่อให้ดึงชื่อร้านได้ง่าย
  const storeMap = new Map(stores.map(store => [store.id, store.name]));
  
  // 4. ส่งข้อมูล Orders และ Store Map ไปให้ Component List
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">ประวัติคำสั่งซื้อ</h1>
      <CustomerOrderList orders={userOrders} storeMap={storeMap} />
    </div>
  );
}