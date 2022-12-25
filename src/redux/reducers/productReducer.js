import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getStoreJson, saveStoreJson, USER_CART } from "../../util/config";
const initialState = {
  productList: [],
  totalQuantity: 0,
  totalAmount: 0,
  productCart: USER_CART,
  productDetail: [],
  page: 1
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getAllProductsByCategoryAction: (state, action) => {
      state.productList = action.payload;
    },
    getAllProductsAction: (state, action) => {
      state.productList = action.payload;
    },
    getProductByIdAction: (state, action) => {
      state.productDetail = action.payload;
    },
    addItem: (state, action) => {
      console.log(action.payload)
      const newItem = action.payload;
      // Check if product already exists or not
      const existingItem = state.productCart?.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;
      // not: add new item to cart
      if (!existingItem) {
        console.log('!existingItem')
        state.productCart?.push({
          id: newItem.id,
          name: newItem.name,
          image: newItem.image,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
        console.log(state.productCart)
      } else {
        console.log('existingItem')
        // Already have: => increasing quantity, at the same time recalculate the total price = existing money + new amount
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      //  Calculate the total amount of the products in the cart
      state.totalAmount = state.productCart?.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      )
      saveStoreJson(USER_CART, state.productCart);
    },
    removeItem: (state, action) => {
      const id = action.payload;
      // Find the product you want to decrease quantity
      const existingItem = state.productCart?.find((item) => item.id === id);
      state.totalQuantity--;

      // Check the quantity of only one product left
      if (existingItem.quantity === 1) {
        // Remove from productCart array
        state.productCart = state.productCart.filter((item) => item.id !== id);
      } else {
        // If there is more than 1 product, reduce the quantity and 
        // update the new amount = total amount - product price
        existingItem.quantity--;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) - Number(existingItem.price);
      }

      // Calculate the total amount of products in the cart after reducing the number of products
      state.totalAmount = state.productCart?.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },

    deleteItem(state, action) {
      const id = action.payload;
      const existingItem = state.productCart?.find((item) => item.id === id);

      if (existingItem) {
        state.productCart = state.productCart?.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.productCart?.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },

    clearCartAction: (state, action) => {
      state.productCart = [];
    }

  },
});

export const { getAllProductsByCategoryAction, getAllProductsAction, deleteItem, addItem, removeItem, getProductByIdAction, clearCartAction } =
  productReducer.actions;

export default productReducer.reducer;

// async action
export const getAllProductsApi = () => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Product",
        method: "GET",
      });
      dispatch(getAllProductsAction(result.data.content));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllProductsByCategoryApi = (id) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `https://shop.cyberlearn.vn/api/Product/getProductByCategory?categoryId=${id}`,
        method: "GET",
      });

      dispatch(getAllProductsByCategoryAction(result.data.content));
      console.log(result.data.content)
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductById = id => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
        method: "GET"
      })
      dispatch(getProductByIdAction(result.data.content))
    } catch (error) {
      console.log(error)
    }
  }
}

export const clearCart = (arrNull) => {
  return async (dispatch) => {
    dispatch(clearCartAction([]))
  }
}
