import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const totalAmountCheck = () => {
  if (isNaN(Number(localStorage.getItem('totalAmount')))) {
    return 0
  }
  return Number(localStorage.getItem('totalAmount'))
}
const totalQuantityCheck = () => {
  if (isNaN(Number(localStorage.getItem('totalQuantity')))) {
    return 0
  }
  return Number(localStorage.getItem('totalQuantity'))
}
const productCartCheck = () => {
  if (JSON.parse(localStorage.getItem('productCart')) === null) {
    return []
  }
  return JSON.parse(localStorage.getItem('productCart'))
}
const initialState = {
  productList: [],
  totalQuantity: totalQuantityCheck(),
  totalAmount: totalAmountCheck(),
  productCart: productCartCheck(),
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
      const newItem = action.payload;
      // Check if product already exists or not
      const existingItem = state.productCart?.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;
      // not: add new item to cart
      if (!existingItem) {
        state.productCart?.push({
          id: newItem.id,
          name: newItem.name,
          image: newItem.image,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
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
    },
    increaseItem: (state, action) => {
      const id = action.payload;
      // Find the product you want to increase quantity
      const existingItem = state.productCart?.find((item) => item.id === id);
      state.totalQuantity++;
      const productList = JSON.parse(localStorage.getItem('productList'))
      const checkItem = productList?.find((item) => item.id === 1);
      // Check the quantity of only one product left
      if (existingItem.quantity <= checkItem.quantity) {
        existingItem.quantity++;
        existingItem.totalPrice = Number(existingItem.totalPrice) + Number(existingItem.price);
      }
      // Calculate the total amount of products in the cart after reducing the number of products
      state.totalAmount = state.productCart?.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

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


  },
});

export const { getAllProductsByCategoryAction, getAllProductsAction, deleteItem, addItem, removeItem, increaseItem, getProductByIdAction, clearCartAction } =
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
      localStorage.setItem('productList', JSON.stringify(result.data.content))
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
