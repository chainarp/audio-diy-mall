import Link from 'next/link';
import products from '@/data/products.json';
import stores from '@/data/stores.json';
import storageLocations from '@/data/storageLocations.json';
import VendorProductTable from '@/components/features/vendor/VendorProductTable';

export default function VendorProductsPage() {
  // 1. จำลองว่า Vendor คนนี้ (วิมล) กำลัง login อยู่
  const currentUserId = 'user_a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d';

  // 2. ดึงข้อมูลร้านค้าและสินค้าเฉพาะของ Vendor คนนี้
  const userStore = stores.find(store => store.ownerId === currentUserId);

  // กรณีไม่เจอร้านค้า (อาจจะยังไม่ได้สร้าง)
  if (!userStore) {
    return <div>ยังไม่มีร้านค้า กรุณาสร้างร้านค้าก่อน</div>;
  }

  const userProducts = products.filter(prod => prod.storeId === userStore.id);
  const userStorageLocations = storageLocations.filter(loc => loc.storeId === userStore.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">จัดการคลังสินค้า (My Inventory)</h1>
        <Link href="/vendor/products/new" className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
          + เพิ่มสินค้าใหม่
        </Link>
      </div>

      {/* 3. ส่งข้อมูลที่กรองแล้วไปให้ Component ตารางแสดงผล */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <VendorProductTable 
          products={userProducts} 
          storageLocations={userStorageLocations} 
        />
      </div>
    </div>
  );
}