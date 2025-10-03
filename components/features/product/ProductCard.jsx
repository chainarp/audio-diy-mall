import Link from 'next/link';
import Image from 'next/image'; // ใช้ next/image เพื่อประสิทธิภาพที่ดีกว่า

/**
 * @param {{ product: import('@/lib/types').Product }} props
 */
export default function ProductCard({ product }) {
  
  // ป้องกัน Error หากไม่มีรูปภาพ
  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0] 
    : '/images/placeholder.jpg'; // (ควรมีรูป placeholder)

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={product.name}
            fill // ให้รูปภาพเต็มพื้นที่
            style={{ objectFit: 'cover' }} // ทำให้รูปภาพ cover พื้นที่
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500">{product.brand}</p>
          <h3 className="mt-1 text-lg font-semibold text-gray-900 truncate">
            {product.name}
          </h3>
          <p className="mt-2 text-xl font-bold text-gray-800">
            {product.pricing.selling.toLocaleString()} บาท
          </p>
        </div>
      </div>
    </Link>
  );
}