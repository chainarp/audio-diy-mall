"use client";

import { useState } from 'react';

/**
 * Form สำหรับเพิ่ม/แก้ไขหมวดหมู่สินค้า
 * @param {{ categories: Array, onSubmit: (data) => void, editingCategory?: import('@/lib/types').Category }} props
 */
export default function CategoryForm({ categories, onSubmit, editingCategory = null }) {
  const isEditing = !!editingCategory;

  // State สำหรับฟอร์ม
  const [name, setName] = useState(editingCategory?.name || '');
  const [slug, setSlug] = useState(editingCategory?.slug || '');
  const [description, setDescription] = useState(editingCategory?.description || '');
  const [parentId, setParentId] = useState(editingCategory?.parentId || '');
  const [order, setOrder] = useState(editingCategory?.order || 1);
  const [isActive, setIsActive] = useState(editingCategory?.isActive ?? true);
  const [autoSlug, setAutoSlug] = useState(true);

  // Auto-generate slug จากชื่อ
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // ลบอักขระพิเศษ
      .replace(/\s+/g, '-')     // เปลี่ยน space เป็น -
      .replace(/-+/g, '-');     // ลบ - ซ้ำๆ
  };

  const handleNameChange = (value) => {
    setName(value);
    if (autoSlug && !isEditing) {
      setSlug(generateSlug(value));
    }
  };

  const handleSlugChange = (value) => {
    setSlug(value);
    setAutoSlug(false); // ปิด auto-generate เมื่อแก้ไข slug เอง
  };

  // คำนวณ level จาก parentId
  const calculateLevel = (selectedParentId) => {
    if (!selectedParentId) return 0;
    const parent = categories.find(cat => cat.id === selectedParentId);
    return parent ? parent.level + 1 : 0;
  };

  // Filter categories ที่สามารถเป็น parent ได้ (level < 3 เท่านั้น)
  const availableParents = categories.filter(cat => {
    // ไม่สามารถเลือกตัวเองเป็น parent
    if (isEditing && cat.id === editingCategory.id) return false;

    // จำกัด depth ไม่เกิน 4 levels (0-3)
    if (cat.level >= 3) return false;

    // TODO: ป้องกัน circular reference (ไม่ให้เลือก children เป็น parent)

    return true;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const level = calculateLevel(parentId);

    // Validate depth
    if (level > 3) {
      alert('ไม่สามารถสร้างหมวดหมู่ลึกเกิน 4 ระดับได้ (0-3)');
      return;
    }

    const categoryData = {
      name,
      slug,
      description: description || null,
      parentId: parentId || null,
      level,
      order: Number(order),
      isActive,
    };

    onSubmit(categoryData);

    // Reset form ถ้าไม่ได้แก้ไข
    if (!isEditing) {
      setName('');
      setSlug('');
      setDescription('');
      setParentId('');
      setOrder(1);
      setIsActive(true);
      setAutoSlug(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h3 className="text-xl font-semibold mb-4">
        {isEditing ? 'แก้ไขหมวดหมู่' : 'เพิ่มหมวดหมู่ใหม่'}
      </h3>

      {/* ชื่อหมวดหมู่ */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          ชื่อหมวดหมู่ <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="เช่น Vacuum Tubes"
        />
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
          Slug (URL-friendly) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={(e) => handleSlugChange(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="เช่น vacuum-tubes"
        />
        <p className="text-xs text-gray-500 mt-1">
          ใช้ตัวอักษร a-z, 0-9, และ - เท่านั้น
        </p>
      </div>

      {/* คำอธิบาย */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          คำอธิบาย
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="คำอธิบายสั้นๆ เกี่ยวกับหมวดหมู่นี้"
        />
      </div>

      {/* Parent Category */}
      <div>
        <label htmlFor="parentId" className="block text-sm font-medium text-gray-700 mb-1">
          หมวดหมู่แม่ (Parent Category)
        </label>
        <select
          id="parentId"
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">-- ไม่มี (Root Level) --</option>
          {availableParents.map(cat => {
            const indent = '  '.repeat(cat.level);
            return (
              <option key={cat.id} value={cat.id}>
                {indent}{cat.name} (Level {cat.level})
              </option>
            );
          })}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          ระดับปัจจุบัน: Level {calculateLevel(parentId)} (สูงสุด Level 3)
        </p>
      </div>

      {/* Order & Active */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
            ลำดับการแสดงผล
          </label>
          <input
            type="number"
            id="order"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            min="1"
            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="isActive" className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              เปิดใช้งาน (Active)
            </span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        {isEditing && (
          <button
            type="button"
            onClick={() => onSubmit(null)}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            ยกเลิก
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isEditing ? 'บันทึกการแก้ไข' : 'เพิ่มหมวดหมู่'}
        </button>
      </div>
    </form>
  );
}
