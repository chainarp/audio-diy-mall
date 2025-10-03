"use client";

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full">
      <h1 className="text-9xl font-bold text-gray-700">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-2">
        ขออภัยครับ เราไม่พบหน้าที่คุณกำลังมองหา
      </p>
      <Link href="/" className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors">
        กลับสู่หน้าแรก
      </Link>
    </div>
  )
}