"use client"; // บอก Next.js ว่านี่คือ Client Component เพราะต้องใช้ State

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // ใช้สำหรับ redirect หลัง submit

export default function ProductForm({ storeId, storageLocations, categories }) {
  const router = useRouter();

  // 1. สร้าง State สำหรับเก็บค่าของทุก Input ในฟอร์ม
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [tubeNumber, setTubeNumber] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [sellingPrice, setSellingPrice] = useState(0);
  const [costPrice, setCostPrice] = useState(0);
  const [status, setStatus] = useState('IN_STOCK');
  const [conditionType, setConditionType] = useState('USED');
  const [conditionNotes, setConditionNotes] = useState('');
  const [storageLocationId, setStorageLocationId] = useState(storageLocations[0]?.id || '');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. ฟังก์ชันจัดการเมื่อกด Submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันหน้าเว็บโหลดใหม่
    setIsSubmitting(true);

    const newProduct = {
      storeId: storeId,
      storageLocationId: storageLocationId,
      categoryId: categoryId,
      name: name,
      tubeNumber: tubeNumber || null,
      brand: brand,
      description: description,
      images: ['/images/products/placeholder.jpg'], // Placeholder image
      condition: {
        type: conditionType,
        notes: conditionNotes,
      },
      testing: null, // เราจะเพิ่มทีหลัง
      pricing: {
        cost: Number(costPrice),
        selling: Number(sellingPrice),
      },
      status: status,
      stockQuantity: 1, // สมมติว่าเพิ่มทีละ 1
    };

    // 3. (จำลอง) ส่งข้อมูลไปที่ API
    // ในอนาคต เราจะเปิดใช้งานส่วนนี้เพื่อส่งข้อมูลไปที่ Backend จริงๆ
    /*
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      // เมื่อสำเร็จ ให้ redirect ไปหน้าจัดการสินค้า
      router.push('/vendor/products');

    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
    */

    // สำหรับตอนนี้ ให้ log ข้อมูลออกมาดูก่อน
    console.log('New Product Data:', newProduct);
    alert('สร้างสินค้า (จำลอง) สำเร็จ! ดูข้อมูลใน Console');
    setIsSubmitting(false);
    router.push('/vendor/products'); // กลับไปหน้า List
  };

  // 4. ส่วนของ JSX ที่เป็นฟอร์ม
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
      
      {/* Basic Info */}
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">ข้อมูลพื้นฐาน</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">ชื่อสินค้า</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">ยี่ห้อ (Brand)</label>
            <input type="text" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">หมวดหมู่สินค้า</label>
            <select id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
              {categories.map(cat => {
                const indent = '  '.repeat(cat.level);
                return (
                  <option key={cat.id} value={cat.id}>
                    {indent}{cat.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="tubeNumber" className="block text-sm font-medium text-gray-700">เบอร์หลอด (ถ้ามี)</label>
            <input type="text" id="tubeNumber" value={tubeNumber} onChange={(e) => setTubeNumber(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="เช่น KT88, 300B" />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mt-4">คำอธิบาย</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
        </div>
      </div>

      {/* Pricing */}
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">ราคา</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700">ราคาขาย (บาท)</label>
            <input type="number" id="sellingPrice" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label htmlFor="costPrice" className="block text-sm font-medium text-gray-700">ราคาทุน (บาท)</label>
            <input type="number" id="costPrice" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
        </div>
      </div>

      {/* Inventory & Condition */}
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">คลังสินค้าและสภาพ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label htmlFor="storageLocation" className="block text-sm font-medium text-gray-700">ที่จัดเก็บ</label>
            <select id="storageLocation" value={storageLocationId} onChange={(e) => setStorageLocationId(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
              {storageLocations.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">สถานะ</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
              <option value="IN_STOCK">ในคลัง (IN_STOCK)</option>
              <option value="FOR_SALE">พร้อมขาย (FOR_SALE)</option>
            </select>
          </div>
          <div>
            <label htmlFor="conditionType" className="block text-sm font-medium text-gray-700">สภาพสินค้า</label>
            <select id="conditionType" value={conditionType} onChange={(e) => setConditionType(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
              <option value="USED">มือสอง (USED)</option>
              <option value="NOS">ใหม่เก่าเก็บ (NOS)</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="conditionNotes" className="block text-sm font-medium text-gray-700 mt-4">หมายเหตุ (สภาพสินค้า)</label>
          <input type="text" id="conditionNotes" value={conditionNotes} onChange={(e) => setConditionNotes(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400">
          {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกสินค้า'}
        </button>
      </div>
    </form>
  );
}