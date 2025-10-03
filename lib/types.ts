// /lib/types.ts

// =================================================================
// 1. Core Models (โมเดลข้อมูลหลัก)
// =================================================================

/**
 * แทนข้อมูลผู้ใช้ในระบบ ซึ่งสามารถมีได้หลายบทบาท
 */
export type User = {
  /** Unique ID ของผู้ใช้, รูปแบบ: user_... */
  id: string;
  /** ID ที่ได้จาก Facebook เพื่อใช้ในการ Login */
  facebookId: string;
  /** ชื่อเต็มของผู้ใช้ */
  name: string;
  /** อีเมลของผู้ใช้ */
  email: string;
  /** URL รูปโปรไฟล์ของผู้ใช้ */
  avatarUrl: string;
  /** บทบาทของผู้ใช้ในระบบ */
  role: 'ADMIN' | 'VENDOR' | 'CUSTOMER';
  /** ที่อยู่สำหรับจัดส่ง (อาจไม่มีได้) */
  shippingAddress: Address | null; // <-- เพิ่มบรรทัดนี้
  /** วันเวลาที่สร้างบัญชี (ISO 8601 format) */
  createdAt: string;
};


/**
 * แทนข้อมูลร้านค้า ซึ่งทำหน้าที่เป็นคลังสินค้า (Warehouse) ของ Vendor
 */
export type Store = {
  /** Unique ID ของร้านค้า, รูปแบบ: store_... */
  id: string;
  /** Foreign Key ที่เชื่อมไปยัง User.id ของเจ้าของร้าน */
  ownerId: string;
  /** ชื่อร้านค้าที่แสดงให้ลูกค้าเห็น */
  name: string;
  /** ชื่อร้านค้าสำหรับใช้ใน URL (ไม่มีเว้นวรรค, ไม่มีอักษรพิเศษ) */
  slug: string;
  /** URL ของไฟล์โลโก้ */
  logoUrl: string;
  /** สโลแกนสั้นๆ ของร้าน */
  tagline: string;
  /** คำอธิบายร้านค้าแบบเต็ม */
  description: string;
  /** อีเมลสำหรับติดต่อร้านค้า */
  contactEmail: string;
  /** สถานะการเปิดใช้งานของร้าน */
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

/**
 * แทนข้อมูลที่จัดเก็บ (เช่น กล่อง, ชั้นวาง) ภายในร้านค้า
 */
export type StorageLocation = {
  /** Unique ID ของที่จัดเก็บ, รูปแบบ: loc_... */
  id: string;
  /** Foreign Key ที่เชื่อมไปยัง Store.id */
  storeId: string;
  /** ประเภทของที่จัดเก็บ */
  type: 'BOX' | 'SHELF' | 'DRAWER';
  /** ป้ายกำกับที่มนุษย์อ่านเข้าใจ เช่น "A-01: Power Tubes" */
  label: string;
  /** คำอธิบายเพิ่มเติม (อาจไม่มีก็ได้) */
  description: string | null;
  createdAt: string;
};

/**
 * แทนหมวดหมู่สินค้าแบบ Hierarchical (4 levels max)
 */
export type Category = {
  /** Unique ID ของหมวดหมู่, รูปแบบ: cat_... */
  id: string;
  /** ชื่อหมวดหมู่ */
  name: string;
  /** URL-friendly slug */
  slug: string;
  /** คำอธิบายหมวดหมู่ */
  description: string | null;
  /** Foreign Key ไปยัง Category.id (null = root level) */
  parentId: string | null;
  /** ระดับความลึก (0=root, 1=level1, 2=level2, 3=level3) */
  level: number;
  /** ลำดับการแสดงผล */
  order: number;
  /** เปิด/ปิดการแสดงผล */
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

/**
 * แทนข้อมูลสินค้า 1 ชิ้นในคลัง
 */
export type Product = {
  /** Unique ID ของสินค้า, รูปแบบ: prod_... */
  id: string;
  storeId: string;
  storageLocationId: string;
  /** Foreign Key ไปยัง Category.id */
  categoryId: string;
  /** ชื่อสินค้าที่แสดงผล */
  name: string;
  /** เบอร์หลอด (สำหรับสินค้าประเภทหลอด) */
  tubeNumber: string | null;
  /** ยี่ห้อสินค้า */
  brand: string;
  /** คำอธิบายสินค้าแบบละเอียด */
  description: string;
  /** รายการ URL ของรูปภาพสินค้า */
  images: string[];
  /** ข้อมูลสภาพสินค้า */
  condition: ProductCondition;
  /** ข้อมูลผลการทดสอบ (อาจไม่มีก็ได้) */
  testing: ProductTesting | null;
  /** ข้อมูลราคา */
  pricing: ProductPricing;
  /** สถานะของสินค้าในระบบ */
  status: 'IN_STOCK' | 'FOR_SALE' | 'SOLD';
  /** จำนวนสินค้าที่มีในคลัง */
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
};

// =================================================================
// 2. E-commerce Flow Types (โมเดลสำหรับกระบวนการซื้อขาย)
// =================================================================

/**
 * แทนข้อมูลตะกร้าสินค้าของลูกค้า 1 คน
 */
export type Cart = {
  id: string;
  customerId: string;
  createdAt: string;
  updatedAt: string;
};

/**
 * แทนข้อมูลสินค้า 1 รายการในตะกร้า
 */
export type CartItem = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  addedAt: string;
};

/**
 * แทนข้อมูลคำสั่งซื้อที่เกิดขึ้นแล้ว
 */
export type Order = {
  id: string;
  customerId: string;
  storeId: string;
  /** เลขที่คำสั่งซื้อที่มนุษย์อ่านเข้าใจ */
  orderNumber: string;
  /** ยอดรวมสุทธิของคำสั่งซื้อ */
  totalAmount: number;
  /** สถานะของคำสั่งซื้อ */
  status: 'PENDING_PAYMENT' | 'PROCESSING' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED';
  /** ที่อยู่สำหรับจัดส่ง */
  shippingAddress: Address;
  createdAt: string;
};

/**
 * แทนข้อมูลสินค้า 1 รายการในคำสั่งซื้อ
 */
export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  /** ราคาของสินค้า ณ เวลาที่สั่งซื้อ (เพื่อป้องกันปัญหาราคาเปลี่ยนแปลง) */
  priceAtTimeOfOrder: number;
};

// =================================================================
// 3. Nested Helper Types (โมเดลย่อยสำหรับใช้ประกอบ)
// =================================================================

/**
 * นิยามข้อมูลสภาพของสินค้า
 */
export type ProductCondition = {
  type: 'NOS' | 'USED'; // ใหม่เก่าเก็บ หรือ มือสอง
  notes: string;
};

/**
 * นิยามข้อมูลผลการทดสอบสินค้า
 */
export type ProductTesting = {
  device: string;
  results: string;
};

/**
 * นิยามข้อมูลราคาของสินค้า
 */
export type ProductPricing = {
  cost: number; // ราคาทุน (สำหรับ Vendor)
  selling: number; // ราคาขาย (สำหรับ Customer)
};

/**
 * นิยามข้อมูลที่อยู่
 */
export type Address = {
  name: string;
  address: string;
  phone: string;
};

/**
 * แทนข้อมูลการชำระเงิน
 */
export type Payment = {
  /** Unique ID ของการชำระเงิน, รูปแบบ: pay_... */
  id: string;
  /** Foreign Key ที่เชื่อมไปยัง Order.id */
  orderId: string;
  /** จำนวนเงินที่ชำระ */
  amount: number;
  /** วิธีการชำระเงิน */
  method: PaymentMethod;
  /** สถานะการชำระเงิน */
  status: PaymentStatus;
  /** เลขอ้างอิงธุรกรรม (slip/receipt number) */
  transactionId: string | null;
  /** วันเวลาที่ชำระเงินสำเร็จ */
  paidAt: string | null;
  /** วันเวลาที่สร้างรายการ */
  createdAt: string;
};

/**
 * ประเภทวิธีการชำระเงิน
 */
export type PaymentMethod =
  | 'BANK_TRANSFER'  // โอนเงินผ่านธนาคาร
  | 'PROMPTPAY'      // พร้อมเพย์
  | 'COD';           // เก็บเงินปลายทาง

/**
 * สถานะการชำระเงิน
 */
export type PaymentStatus =
  | 'PENDING'        // รอชำระเงิน
  | 'COMPLETED'      // ชำระเงินสำเร็จ
  | 'FAILED'         // ชำระเงินล้มเหลว
  | 'REFUNDED';      // คืนเงินแล้ว