"use client";

import { useState } from 'react';
import categories from '@/data/categories.json';
import CategoryForm from '@/components/features/admin/CategoryForm';

export default function AdminCategoriesPage() {
  const [categoryList, setCategoryList] = useState(categories);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // เรียงลำดับ categories ตาม level และ order
  const sortedCategories = [...categoryList].sort((a, b) => {
    if (a.level !== b.level) return a.level - b.level;
    if (a.parentId !== b.parentId) {
      // เรียงตาม parent ก่อน
      if (!a.parentId) return -1;
      if (!b.parentId) return 1;
      return a.parentId.localeCompare(b.parentId);
    }
    return a.order - b.order;
  });

  // จัดกลุ่มเป็น tree structure สำหรับแสดงผล
  const buildTree = (parentId = null, level = 0) => {
    return sortedCategories
      .filter(cat => cat.parentId === parentId)
      .map(cat => ({
        ...cat,
        children: buildTree(cat.id, level + 1)
      }));
  };

  const categoryTree = buildTree();

  // ฟังก์ชันแสดง tree แบบ flat list
  const flattenTree = (tree, depth = 0) => {
    let result = [];
    tree.forEach(node => {
      result.push({ ...node, depth });
      if (node.children && node.children.length > 0) {
        result = result.concat(flattenTree(node.children, depth + 1));
      }
    });
    return result;
  };

  const flatCategories = flattenTree(categoryTree);

  const handleSubmit = (data) => {
    if (!data) {
      // ยกเลิกการแก้ไข
      setEditingCategory(null);
      setShowForm(false);
      return;
    }

    if (editingCategory) {
      // แก้ไข
      const updated = categoryList.map(cat =>
        cat.id === editingCategory.id
          ? { ...cat, ...data, updatedAt: new Date().toISOString() }
          : cat
      );
      setCategoryList(updated);
      console.log('(จำลอง) แก้ไขหมวดหมู่:', data);
      alert('แก้ไขหมวดหมู่สำเร็จ! (จำลอง)');
      setEditingCategory(null);
      setShowForm(false);
    } else {
      // เพิ่มใหม่
      const newCategory = {
        id: `cat_${Date.now()}-new-temp`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setCategoryList([...categoryList, newCategory]);
      console.log('(จำลอง) เพิ่มหมวดหมู่:', newCategory);
      alert('เพิ่มหมวดหมู่สำเร็จ! (จำลอง)');
      setShowForm(false);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDelete = (categoryId) => {
    // ตรวจสอบว่ามี children หรือไม่
    const hasChildren = categoryList.some(cat => cat.parentId === categoryId);
    if (hasChildren) {
      alert('ไม่สามารถลบได้ เนื่องจากมีหมวดหมู่ย่อยอยู่ภายใต้หมวดหมู่นี้\nกรุณาลบหมวดหมู่ย่อยก่อน');
      return;
    }

    // TODO: ตรวจสอบว่ามีสินค้าในหมวดหมู่นี้หรือไม่

    if (confirm(`ต้องการลบหมวดหมู่ "${categoryList.find(c => c.id === categoryId)?.name}" ใช่หรือไม่?`)) {
      setCategoryList(categoryList.filter(cat => cat.id !== categoryId));
      console.log('(จำลอง) ลบหมวดหมู่:', categoryId);
      alert('ลบหมวดหมู่สำเร็จ! (จำลอง)');
    }
  };

  const toggleActive = (categoryId) => {
    const updated = categoryList.map(cat =>
      cat.id === categoryId
        ? { ...cat, isActive: !cat.isActive, updatedAt: new Date().toISOString() }
        : cat
    );
    setCategoryList(updated);
    console.log('(จำลอง) เปลี่ยนสถานะหมวดหมู่:', categoryId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">จัดการหมวดหมู่สินค้า</h1>
        <button
          onClick={() => {
            setEditingCategory(null);
            setShowForm(!showForm);
          }}
          className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showForm ? 'ซ่อนฟอร์ม' : '+ เพิ่มหมวดหมู่'}
        </button>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="mb-8">
          <CategoryForm
            categories={categoryList}
            onSubmit={handleSubmit}
            editingCategory={editingCategory}
          />
        </div>
      )}

      {/* Categories List - Tree View */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">หมวดหมู่</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">จัดการ</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {flatCategories.map((cat) => {
                const indent = cat.depth * 24; // 24px per level
                const hasChildren = categoryList.some(c => c.parentId === cat.id);

                return (
                  <tr key={cat.id} className={cat.isActive ? '' : 'bg-gray-50 opacity-60'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div style={{ paddingLeft: `${indent}px` }} className="flex items-center">
                        {hasChildren && <span className="mr-2 text-gray-400">└</span>}
                        <span className={`font-medium ${cat.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                          {cat.name}
                        </span>
                      </div>
                      {cat.description && (
                        <div style={{ paddingLeft: `${indent}px` }} className="text-xs text-gray-500 mt-1">
                          {cat.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {cat.slug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span className="px-2 py-1 bg-gray-100 rounded">
                        L{cat.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {cat.order}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleActive(cat.id)}
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          cat.isActive
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {cat.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        แก้ไข
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 px-6 py-3 text-sm text-gray-600">
          ทั้งหมด {categoryList.length} หมวดหมู่ ({categoryList.filter(c => c.isActive).length} Active)
        </div>
      </div>
    </div>
  );
}
