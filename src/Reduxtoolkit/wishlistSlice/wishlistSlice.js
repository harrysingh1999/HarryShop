import { createSlice } from "@reduxjs/toolkit";

const cartState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  wishlistItems: JSON.parse(localStorage.getItem("wishlistItems")) || [],
  totalCartQuantity: JSON.parse(localStorage.getItem("totalCartQuantity")) || 0,
  totalCartItem: JSON.parse(localStorage.getItem("totalCartItem")) || 0,
  totalwishlistQuantity:
    JSON.parse(localStorage.getItem("totalwishlistQuantity")) || 0,
  totalCartAmount: JSON.parse(localStorage.getItem("totalCartAmount")) || 0,
};

export const cartSlice = createSlice({
  name: "Cart",
  initialState: cartState,
  reducers: {
    addCartItem: (state, action) => {
      const dispatchedItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (dispatchedItemIndex >= 0) {
        state.cartItems[dispatchedItemIndex].qty += 1;
      } else {
        const dispatchedItem = { ...action.payload, qty: 1 };
        state.cartItems.push(dispatchedItem);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    addWishlistItem: (state, action) => {
      const dispatchedItemIndex = state.wishlistItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (dispatchedItemIndex >= 0) {
        state.wishlistItems;
      } else {
        state.wishlistItems.push(action.payload);
      }

      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems)
      );
    },

    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.totalCartItem = state.cartItems.length
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("totalCartItem", JSON.stringify(state.totalCartItem));
    },

    removeWishlistItem: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems)
      );
    },

    decrementItemQty: (state, action) => {
      state.cartItems.map((item) => item.id === action.payload && item.qty--);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    incrementItemQty: (state, action) => {
      state.cartItems.map((item) => item.id === action.payload && item.qty++);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    getTotal: (state) => {
      state.totalCartAmount = state.cartItems.reduce((acc, item) => {
        return acc + item.qty * item.price * 84;
      }, 0);
      localStorage.setItem(
        "totalCartAmount",
        JSON.stringify(state.totalCartAmount)
      );
    },

    getCartItemQuantity: (state) => {
      state.totalCartItem = state.cartItems.length;
      localStorage.setItem(
        "totalCartItem",
        JSON.stringify(state.totalCartItem)
      );
    },

    getTotalQuantity: (state) => {
      state.totalCartQuantity = state.cartItems.reduce(
        (acc, item) => acc + item.qty,
        0
      );
      localStorage.setItem(
        "totalCartQuantity",
        JSON.stringify(state.totalCartQuantity)
      );
    },

    getWishlistQuantity: (state) => {
      let wishlistQuantity = state.wishlistItems.length;
      state.totalwishlistQuantity = wishlistQuantity;
      localStorage.setItem(
        "totalwishlistQuantity",
        JSON.stringify(state.totalwishlistQuantity)
      );
    },

    emptyCart: (state) => {
      state.cartItems = [];
      state.totalCartAmount = 0;
      state.totalCartQuantity = 0;
      state.totalCartItem = 0;
      localStorage.removeItem("cartItems");
      localStorage.removeItem("totalCartItem");
      localStorage.removeItem("totalCartAmount");
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  incrementItemQty,
  decrementItemQty,
  getTotal,
  getTotalQuantity,
  emptyCart,
  getWishlistQuantity,
  addWishlistItem,
  removeWishlistItem,
  getCartItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
