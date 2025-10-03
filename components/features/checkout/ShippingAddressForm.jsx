"use client";

/**
 * Component สำหรับกรอกที่อยู่จัดส่ง
 * @param {{ address: import('@/lib/types').Address, onAddressChange: (address: import('@/lib/types').Address) => void }} props
 */
export default function ShippingAddressForm({ address, onAddressChange }) {
  const handleChange = (field, value) => {
    onAddressChange({
      ...address,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">ที่อยู่สำหรับจัดส่ง</h3>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          ชื่อผู้รับ <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={address.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="ชื่อ-นามสกุล"
          required
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          ที่อยู่ <span className="text-red-500">*</span>
        </label>
        <textarea
          id="address"
          value={address.address}
          onChange={(e) => handleChange('address', e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="บ้านเลขที่ ถนน ตำบล/แขวง อำเภอ/เขต จังหวัด รหัสไปรษณีย์"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          เบอร์โทรศัพท์ <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          value={address.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="08X-XXX-XXXX"
          required
        />
      </div>
    </div>
  );
}
