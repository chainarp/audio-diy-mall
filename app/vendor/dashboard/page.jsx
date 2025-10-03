import stores from '@/data/stores.json';
import storageLocations from '@/data/storageLocations.json';
import products from '@/data/products.json';

// Import Components
import StoreSummary from '@/components/features/vendor/StoreSummary';
import StorageLocationList from '@/components/features/vendor/StorageLocationList';
import ProductInventoryList from '@/components/features/vendor/ProductInventoryList';

export default function VendorDashboardPage() {
  
  // 1. จำลองว่า Vendor คนนี้ (วิมล) กำลัง login อยู่
  const currentUserId = 'user_a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d';

  // 2. ค้นหาข้อมูลทั้งหมดที่เกี่ยวกับ Vendor คนนี้
  const userStore = stores.find(store => store.ownerId === currentUserId);
  
  if (!userStore) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
        <p className="mt-4">คุณยังไม่มีร้านค้า กรุณาสร้างร้านค้าก่อน</p>
      </div>
    );
  }

  const userStorageLocations = storageLocations.filter(loc => loc.storeId === userStore.id);
  const userProducts = products.filter(prod => prod.storeId === userStore.id);

  // 3. ส่งข้อมูลที่กรองแล้วไปให้ Components เพื่อแสดงผล
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <StoreSummary store={userStore} />
        </div>
        
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <StorageLocationList locations={userStorageLocations} />
        </div>

        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
          <ProductInventoryList products={userProducts} storageLocations={userStorageLocations} />
        </div>

      </div>
    </div>
  );
}