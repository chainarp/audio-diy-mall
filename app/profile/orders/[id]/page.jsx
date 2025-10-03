import orders from '@/data/orders.json';
import orderItems from '@/data/orderItems.json';
import products from '@/data/products.json';
import CustomerOrderDetail from '@/components/features/profile/CustomerOrderDetail';

// "params" คือ object ที่ Next.js ส่งมาให้
// ซึ่งจะบรรจุค่า [id] ที่เราได้จาก URL
export default function OrderDetailPage({ params }) {
  
  // 1. ดึง ID ของ Order จาก URL
  const orderId = params.id;

  // 2. ค้นหาข้อมูลหลักของ Order
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return <div>ไม่พบคำสั่งซื้อ</div>;
  }

  // 3. ค้นหารายการสินค้า "ทั้งหมด" ที่อยู่ใน Order นี้
  const itemsInOrder = orderItems.filter(item => item.orderId === orderId);

  // 4. สร้าง Map ของสินค้าทั้งหมดไว้เพื่อค้นหาข้อมูล (ชื่อ, รูปภาพ) ได้ง่าย
  const productMap = new Map(products.map(p => [p.id, p]));

  // 5. "Join" ข้อมูล: นำ OrderItems มารวมกับข้อมูล Product
  const fullOrderItems = itemsInOrder.map(item => {
    const productDetails = productMap.get(item.productId);
    return {
      ...item,
      productName: productDetails ? productDetails.name : 'Product not found',
      productImage: productDetails ? productDetails.images[0] : '/images/placeholder.jpg',
    };
  });

  // 6. ส่งข้อมูลที่รวบรวมแล้วไปให้ Component
  return (
    <CustomerOrderDetail 
      order={order} 
      items={fullOrderItems} 
    />
  );
}