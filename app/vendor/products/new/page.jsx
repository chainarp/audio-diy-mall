import storageLocations from '@/data/storageLocations.json';
import stores from '@/data/stores.json';
import categories from '@/data/categories.json';
import ProductForm from '@/components/features/vendor/ProductForm.jsx';

export default function NewProductPage() {
  // 1. จำลองว่า Vendor คนนี้ (วิมล) กำลัง login อยู่
  const currentUserId = 'user_a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d';
  const userStore = stores.find(store => store.ownerId === currentUserId);

  if (!userStore) {
    return <div>ไม่พบร้านค้าของคุณ</div>;
  }

  // 2. ดึงข้อมูล "ที่จัดเก็บ" เฉพาะของร้านค้านี้
  const userStorageLocations = storageLocations.filter(loc => loc.storeId === userStore.id);

  // 3. เรียงลำดับ categories ตาม level และ order
  const sortedCategories = [...categories].sort((a, b) => {
    if (a.level !== b.level) return a.level - b.level;
    return a.order - b.order;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">เพิ่มสินค้าใหม่</h1>

      {/* 4. ส่งข้อมูลที่จัดเก็บ, categories และ storeId
           ไปให้ Client Component ProductForm
      */}
      <ProductForm
        storeId={userStore.id}
        storageLocations={userStorageLocations}
        categories={sortedCategories}
      />
    </div>
  );
}