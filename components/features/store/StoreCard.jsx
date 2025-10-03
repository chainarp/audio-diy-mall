import Link from 'next/link';
import Image from 'next/image';

/**
 * @param {{ store: import('@/lib/types').Store | undefined }} props
 */
export default function StoreCard({ store }) {
  if (!store) {
    return <div className="text-center text-gray-500">ไม่พบข้อมูลร้านค้า</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8 border">
      <h2 className="text-xl font-semibold mb-4">จำหน่ายโดย</h2>
      <div className="flex items-center space-x-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border">
          <Image
            src={store.logoUrl || '/images/placeholder.jpg'}
            alt={`${store.name} logo`}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{store.name}</h3>
          <p className="text-sm text-gray-600">{store.tagline}</p>
        </div>
      </div>
      <Link href={`/stores/${store.slug}`} className="block w-full text-center bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors mt-4">
        ไปที่หน้าร้านค้า
      </Link>
    </div>
  );
}