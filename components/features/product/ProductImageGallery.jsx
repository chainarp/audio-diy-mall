"use client";

import { useState } from 'react';
import Image from 'next/image';

/**
 * @param {{ images: string[] }} props
 */
export default function ProductImageGallery({ images }) {
  // ตรวจสอบว่ามีรูปภาพหรือไม่ ถ้าไม่มีใช้ placeholder
  const validImages = (images && images.length > 0) ? images : ['/images/placeholder.jpg'];
  
  // ใช้ State เพื่อเก็บ URL ของรูปภาพหลักที่กำลังแสดง
  const [selectedImage, setSelectedImage] = useState(validImages[0]);

  return (
    <div className="w-full">
      {/* รูปภาพหลัก */}
      <div className="relative w-full h-96 border rounded-lg overflow-hidden">
        <Image
          src={selectedImage}
          alt="Product Image"
          fill
          style={{ objectFit: 'contain' }} // ใช้ 'contain' เพื่อให้เห็นรายละเอียดหลอดชัดๆ
        />
      </div>
      
      {/* รูปภาพย่อ (Thumbnails) */}
      <div className="flex space-x-2 mt-4">
        {validImages.map((imgUrl, index) => (
          <button 
            key={index}
            onClick={() => setSelectedImage(imgUrl)}
            className={`
              relative w-20 h-20 border rounded-md overflow-hidden 
              ${imgUrl === selectedImage ? 'border-blue-500 border-2' : 'border-gray-200'}
            `}
          >
            <Image
              src={imgUrl}
              alt={`Thumbnail ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}