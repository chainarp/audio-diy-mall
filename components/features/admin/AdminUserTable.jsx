"use client";

import { useState } from 'react';

export default function AdminUserTable({ users }) {
  // 1. ใช้ State เพื่อให้ตารางอัปเดตทันทีเมื่อ Role เปลี่ยน
  // (ในโปรเจกต์จริง State นี้จะถูกซิงค์กับ Database)
  const [userList, setUserList] = useState(users);

  const handleRoleChange = (userId, newRole) => {
    // 2. (จำลอง) ส่งข้อมูลไปอัปเดตที่ API
    // ในอนาคต: fetch(`/api/users/${userId}`, { method: 'PATCH', body: JSON.stringify({ role: newRole }) })
    console.log(`(จำลอง) เปลี่ยน Role ของ User ID: ${userId} เป็น: ${newRole}`);
    
    // 3. อัปเดต State ในหน้าเว็บทันทีเพื่อแสดงผล
    setUserList(currentList => 
      currentList.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อผู้ใช้ (Name)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">อีเมล</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">บทบาท (Role)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สมัครเมื่อ</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {userList.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt="" />
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.facebookId}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {/* 4. ช่องเลือก Role ที่สามารถแก้ไขได้ */}
                <select 
                  value={user.role} 
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                >
                  <option value="CUSTOMER">Customer</option>
                  <option value="VENDOR">Vendor</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}