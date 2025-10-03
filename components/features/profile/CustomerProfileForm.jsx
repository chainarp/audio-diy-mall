"use client";

import { useState } from 'react';

export default function CustomerProfileForm({ user }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. ใช้ข้อมูลเดิมจาก 'user' มาเป็นค่าเริ่มต้นของ State
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  
  // 2. จัดการ State สำหรับ Object ที่ซ้อนกัน (Nested Object)
  const [shippingAddress, setShippingAddress] = useState(user.shippingAddress || {
    name: user.name,
    address: '',
    phone: '',
  });

  // ฟังก์ชันสำหรับอัปเดต State ของที่อยู่
  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedUserData = {
      ...user,
      name,
      email,
      shippingAddress,
    };

    // (จำลอง) ส่งข้อมูลไปอัปเดตที่ API
    console.log("Updated User Data:", updatedUserData);
    alert('อัปเดตโปรไฟล์ (จำลอง) สำเร็จ!');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
      
      {/* ข้อมูลส่วนตัว */}
      <fieldset className="border p-4 rounded-md">
        <legend className="text-xl font-semibold px-2">ข้อมูลส่วนตัว</legend>
        <div className="space-y-4 mt-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">ชื่อ</label>
            <input 
              type="text" id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">อีเมล</label>
            <input 
              type="email" id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
            />
          </div>
        </div>
      </fieldset>

      {/* ที่อยู่สำหรับจัดส่ง */}
      <fieldset className="border p-4 rounded-md">
        <legend className="text-xl font-semibold px-2">ที่อยู่สำหรับจัดส่ง</legend>
        <div className="space-y-4 mt-2">
          <div>
            <label htmlFor="addressName" className="block text-sm font-medium text-gray-700">ชื่อผู้รับ</label>
            <input 
              type="text" id="addressName" name="name"
              value={shippingAddress.name} 
              onChange={handleAddressChange} 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">ที่อยู่</label>
            <textarea 
              id="address" name="address"
              value={shippingAddress.address} 
              onChange={handleAddressChange} 
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            ></textarea>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">เบอร์โทรศัพท์</label>
            <input 
              type="tel" id="phone" name="phone"
              value={shippingAddress.phone} 
              onChange={handleAddressChange} 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
            />
          </div>
        </div>
      </fieldset>
      
      <div className="flex justify-end">
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกโปรไฟล์'}
        </button>
      </div>
    </form>
  );
}