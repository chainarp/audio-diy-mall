'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // สามารถ log error ไปยัง service ภายนอกได้ที่นี่
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center text-center h-full">
      <h2 className="text-2xl font-semibold">มีบางอย่างผิดพลาด!</h2>
      <p className="text-gray-500 mt-2">
        {error.message || 'เกิดข้อผิดพลาดขึ้นในระบบ'}
      </p>
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
  )
}