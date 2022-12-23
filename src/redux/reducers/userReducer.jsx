import { createSlice } from '@reduxjs/toolkit'
import { history } from '../../index';
import { ACCESS_TOKEN, getStore, getStoreJson, http, saveStore, saveStoreJson, USER_LOGIN } from '../../util/config';

const initialState = {
  userRegister: null,
  sortByTypes: ['Name', 'Price', 'Quantity'],
  sortBy: 'Name',
  userLogin: getStoreJson(USER_LOGIN),
  userProfile: null,
  userOrderHistory: [],
  userFavorite: []
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    registerAction: (state, action) => {
      state.userRegister = action.payload;
    },
    sortByChooseAction: (state, action) => {
      state.sortBy = action.payload;
    },
    loginAction: (state, action) => {
      state.userLogin = action.payload;
    },
    checkOutOrderAction: (state, action) => {
      const newArrOrder = action.payload;
      newArrOrder?.map((newItem, index) => {
        let isExist = state.userOrderHistory.find(oldItem => oldItem.id === newItem.id);
        if (!isExist) {
          state.userOrderHistory.push(newItem);
        }
        else {
          isExist.quantity++;
        }
        return null;
      })
      state.userOrderHistory = action.payload;
    },
    favoriteProduct: (state, action) => {
      state.userFavorite.push(action.payload);
    },
    getProfileAction: (state, action) => {
      state.userProfile = action.payload;
    }

  },
});

export const { registerAction, sortByChooseAction, loginAction, checkOutOrderAction, favoriteProduct, getProfileAction } = userReducer.actions

export default userReducer.reducer


// async function
export const registerAPI = (userRegister) => {
  // Destructuring
  const userDispatch = { ...userRegister }
  // Delete confirmPassword
  delete userDispatch.confirmPassword
  return async (dispatch) => {
    if (userDispatch.gender === "1") {
      userDispatch.gender = true
    }
    else if (userDispatch.gender === "2") {
      userDispatch.gender = false
    }
    // Update reducer
    const result = await http.post('/api/Users/signup', userDispatch)
    alert('Đăng ký thành công')
    const action = registerAction(result.data.content)
    dispatch(action)
    // go to login
    history.push('/login')
  }
}
export const getSortBy = (types) => {
  console.log(types)
  return async (dispatch) => {
    const action = sortByChooseAction(types);
    dispatch(action)
  }
}

export const loginApi = (userLogin) => {
  console.log('userLogin', userLogin)
  return async dispatch => {
    const result = await http.post('/api/Users/signin', userLogin);
    //Cập nhật cho reducer
    const action = loginAction(result.data.content);
    dispatch(action);
    //Lưu localstorage
    saveStoreJson(USER_LOGIN, result.data.content);
    saveStore(ACCESS_TOKEN, result.data.content.accessToken);
    console.log(getStore(ACCESS_TOKEN));
    // Gọi axios lấy dữ liệu api từ token  
    // Gọi api getprofile
    const actionGetProfile = getProfileAction();
    dispatch(actionGetProfile);
    history.push('/profile');
  }
}

export const getProfileApi = () => {
  return async dispatch => {
    const result = await http.post('/api/Users/getProfile')
    //Sau khi lấy dữ liệu từ api về đưa lên reducer qua action creator 
    const action = getProfileAction(result.data.content);
    console.log('profile', result.data.content)
    dispatch(action);
  }
}

export const checkOutOrder = (cart) => {
  return async (dispatch) => {
    const action = checkOutOrderAction(cart);
    dispatch(action);
  }
}

export const getFavoriteProduct = (favProd) => {
  return async (dispatch) => {
    const action = favoriteProduct(favProd);
    dispatch(action);
  }
}


