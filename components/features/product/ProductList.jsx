import ProductCard from './ProductCard';

/**
 * @param {{ products: import('@/lib/types').Product[] }} props
 */
export default function ProductList({ products }) {
  
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">ไม่พบสินค้าที่พร้อมขายในขณะนี้</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}