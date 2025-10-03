"use client"; // <--- บรรทัดนี้สำคัญที่สุด

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error ไปยัง service ภายนอกได้
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2 className="text-2xl font-semibold">มีบางอย่างผิดพลาด!</h2>
      <p className="mt-2 text-gray-600">
        {error.message || 'เกิดข้อผิดพลาดขึ้นในระบบ'}
      </p>  {/* <--- แก้ไขจาก </D> เป็น </p> ตรงนี้ครับ */}
      <button
        onClick={
          // พยายาม render หน้านี้ใหม่อีกครั้ง
          () => reset()
        }
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors"
      >
        ลองอีกครั้ง
      </button>
    </div>
  );
}