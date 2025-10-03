"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// รับ prop 'store' ที่ส่งมาจาก Server Component (page.jsx)
export default function StoreSettingsForm({ store }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. จุดสำคัญ: เราใช้ข้อมูลเดิมจาก 'store' มาเป็นค่าเริ่มต้นของ State
  const [name, setName] = useState(store.name);
  const [tagline, setTagline] = useState(store.tagline);
  const [description, setDescription] = useState(store.description);
  const [contactEmail, setContactEmail] = useState(store.contactEmail);
  const [slug, setSlug] = useState(store.slug); // Slug ปกติจะไม่ให้แก้บ่อยๆ

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedStoreData = {
      name,
      tagline,
      description,
      contactEmail,
      slug,
    };

    // 2. (จำลอง) ส่งข้อมูลไปอัปเดตที่ API
    // ในอนาคต เราจะใช้ method 'PUT' หรือ 'PATCH' ไปที่ /api/stores/[storeId]
    /*
    try {
      const response = await fetch(`/api/stores/${store.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStoreData),
      });
      // ...
    } catch (error) {
      // ...
    }
    */
    
    console.log("Updated Store Data:", updatedStoreData);
    alert('อัปเดตข้อมูลร้านค้า (จำลอง) สำเร็จ!');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6 max-w-2xl">
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">ชื่อร้านค้า</label>
        <input 
          type="text" id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">URL (Slug)</label>
        <input 
          type="text" id="slug" 
          value={slug} 
          onChange={(e) => setSlug(e.target.value)} 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100" 
          readOnly // แนะนำว่าไม่ควรให้เปลี่ยน slug บ่อยๆ
        />
        <p className="text-xs text-gray-500 mt-1">URL ของร้านคุณ: /stores/{slug}</p>
      </div>

      <div>
        <label htmlFor="tagline" className="block text-sm font-medium text-gray-700">สโลแกน (Tagline)</label>
        <input 
          type="text" id="tagline" 
          value={tagline} 
          onChange={(e) => setTagline(e.target.value)} 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
        />
      </div>

      <div>
        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">อีเมลติดต่อ</label>
        <input 
          type="email" id="contactEmail" 
          value={contactEmail} 
          onChange={(e) => setContactEmail(e.target.value)} 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">คำอธิบายร้านค้า</label>
        <textarea 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          rows="4" 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        ></textarea>
      </div>
      
      <div className="flex justify-end">
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
        </button>
      </div>
    </form>
  );
}