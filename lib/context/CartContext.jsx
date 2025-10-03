"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // ฟังก์ชันนี้จะรัน "หลังจาก" Hydration เสร็จสิ้น
  useEffect(() => {
    const rawCart = localStorage.getItem('cart') || '[]';
    setCartItems(JSON.parse(rawCart));
  }, []); // [] = ทำงานแค่ครั้งเดียว

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const addToCart = (product, quantity) => {
    // ... (Logic การเพิ่มสินค้า ... )
    const existingItemIndex = cartItems.findIndex(item => item.productId === product.id);
    let newCart = [...cartItems];
    if (existingItemIndex > -1) {
      newCart[existingItemIndex].quantity += quantity;
    } else {
      newCart.push({
        productId: product.id, name: product.name,
        image: product.images[0] || '/images/placeholder.jpg',
        price: product.pricing.selling, quantity: quantity,
      });
    }
    updateCart(newCart);
  };

  const increaseQuantity = (productId) => {
    const newCart = cartItems.map(item =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateCart(newCart);
  };

  const decreaseQuantity = (productId) => {
    const newCart = cartItems.map(item =>
      item.productId === productId
        ? { ...item, quantity: Math.max(0, item.quantity - 1) }
        : item
    ).filter(item => item.quantity > 0); // ลบสินค้าที่จำนวนเป็น 0
    updateCart(newCart);
  };

  const removeFromCart = (productId) => {
    const newCart = cartItems.filter(item => item.productId !== productId);
    updateCart(newCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
};