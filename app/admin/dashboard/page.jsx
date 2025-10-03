import users from '@/data/users.json';
import stores from '@/data/stores.json';
import products from '@/data/products.json';
import StatCard from '@/components/features/admin/StatCard'; // เราจะสร้าง Component นี้กัน

export default function AdminDashboardPage() {
  
  // 1. คำนวณข้อมูลสรุปจาก Mock Data ทั้งหมด
  const totalUsers = users.length;
  const totalStores = stores.length;
  const totalProductsForSale = products.filter(p => p.status === 'FOR_SALE').length;
  const totalProductsInStock = products.filter(p => p.status === 'IN_STOCK').length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* 2. แสดงผลข้อมูลสรุปโดยใช้ StatCard Component */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="ผู้ใช้ทั้งหมด (All Users)" value={totalUsers} />
        <StatCard title="ร้านค้าทั้งหมด (All Stores)" value={totalStores} />
        <StatCard title="สินค้าที่วางขาย (For Sale)" value={totalProductsForSale} />
        <StatCard title="สินค้าในคลัง (In Stock)" value={totalProductsInStock} />
      </div>

      <div className="mt-8">
        {/* ในอนาคต เราจะวาง Component สำหรับแสดงรายการ "ร้านค้าที่รออนุมัติ" 
          หรือ "รายงานอื่นๆ" ไว้ที่นี่ 
        */}
      </div>
    </div>
  );
}