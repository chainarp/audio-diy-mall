import productsData from '@/data/products.json';
import ProductList from '@/components/features/product/ProductList';

export default function HomePage() {
  
  // 1. (Server Component) ดึงข้อมูลและกรองเฉพาะสินค้าที่มีสถานะเป็น 'FOR_SALE'
  // จุดตรวจสอบ: ให้แน่ใจว่าในไฟล์ data/products.json ของคุณมีสินค้าที่มี status นี้อยู่จริง
  const productsForSale = productsData.filter(p => p.status === 'FOR_SALE');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ส่วนหัวของหน้า */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          Audio DIY Mall
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          ศูนย์รวมหลอดวิทยุวินเทจและอุปกรณ์ DIY คุณภาพสูง
        </p>
      </section>

      {/* ส่วนแสดงรายการสินค้า */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">สินค้าแนะนำ</h2>
        {/* 2. ส่งข้อมูลที่กรองแล้วไปให้ ProductList */}
        <ProductList products={productsForSale} />
      </section>
    </div>
  );
}
