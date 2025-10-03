import { notFound } from 'next/navigation';
import productsData from '@/data/products.json';
import storesData from '@/data/stores.json';

// Import Components ที่เราสร้างไว้
import ProductImageGallery from '@/components/features/product/ProductImageGallery';
import ProductDetailInfo from '@/components/features/product/ProductDetailInfo';
import StoreCard from '@/components/features/store/StoreCard';

export default function ProductDetailPage({ params }) {
  
  // 1. ดึง ID ของสินค้าจาก URL
  const productId = params.id;

  // 2. ค้นหาสินค้าจาก Mock Data
  const product = productsData.find(p => p.id === productId);

  // 3. ถ้าไม่พบสินค้า ให้แสดงหน้า 404
  if (!product) {
    notFound(); // เรียกใช้ฟังก์ชัน 404 ของ Next.js
  }

  // 4. ค้นหาร้านค้าที่เป็นเจ้าของสินค้านี้
  const store = storesData.find(s => s.id === product.storeId);

  // 5. ประกอบร่างหน้าเว็บ
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* คอลัมน์ซ้าย: รูปภาพ */}
        <div>
          <ProductImageGallery images={product.images} />
        </div>
        
        {/* คอลัมน์ขวา: ข้อมูลสินค้า */}
        <div>
          <ProductDetailInfo product={product} />
        </div>
      </div>
      
      {/* ส่วนล่าง: ข้อมูลร้านค้า */}
      <StoreCard store={store} />
    </div>
  );
}