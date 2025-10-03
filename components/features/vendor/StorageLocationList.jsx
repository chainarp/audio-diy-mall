export default function StorageLocationList({ locations }) {
  return (
    <div>
      <h2 className="text-2xl font-bold border-b pb-2">ที่จัดเก็บ (Storage)</h2>
      <div className="mt-4 space-y-3">
        {locations.length > 0 ? (
          locations.map(loc => (
            <div key={loc.id} className="p-3 bg-gray-100 rounded-md">
              <p className="font-semibold">{loc.label}</p>
              <p className="text-sm text-gray-600">{loc.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">ยังไม่มีที่จัดเก็บ</p>
        )}
        <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
          + เพิ่มที่จัดเก็บใหม่
        </button>
      </div>
    </div>
  );
}