import { createSlice } from "@reduxjs/toolkit";

const wishListState = {
  wishlistItems: JSON.parse(localStorage.getItem("wishlistItems")) || [],
  totalwishlistQuantity: JSON.parse(localStorage.getItem("totalwishlistQuantity")) || []
};

export const wishlistSlice = createSlice({
  name: "Wishlist",
  initialState: wishListState,
  reducers: {
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

    removeWishlistItem: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems)
      );
    },

    getWishlistQuantity: (state) => {
      state.totalwishlistQuantity = state.wishlistItems.length;
      localStorage.setItem(
        "totalwishlistQuantity",
        JSON.stringify(state.totalwishlistQuantity)
      );
    },
  },
});

export const { getWishlistQuantity, addWishlistItem, removeWishlistItem } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
