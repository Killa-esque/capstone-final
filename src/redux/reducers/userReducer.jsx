import { createSlice } from '@reduxjs/toolkit'
import { history } from '../../index';
import { ACCESS_TOKEN, getStore, getStoreJson, http, saveStore, saveStoreJson, TOKEN_FACEBOOK, USER_CART, USER_FAVORITE, USER_HISTORY, USER_LOGIN, USER_PROFILE } from '../../util/config';

const initialState = {
  userRegister: null,
  sortByTypes: ['Name', 'Price', 'Quantity'],
  sortBy: 'Name',
  userLogin: getStoreJson(USER_LOGIN),
  userProfile: getStoreJson(USER_PROFILE),
  userOrderHistory: [],
  userFavorite: [],

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
        let isExist = state.userOrderHistory?.find(oldItem => oldItem.id === newItem.id);
        if (!isExist) {
          state.userProfile.ordersHistory?.push(newItem);
        }
        else {
          isExist.quantity++;
        }
        return null;
      })
      state.userOrderHistory = action.payload;
      saveStoreJson(USER_CART, state.userOrderHistory)
    },
    favoriteProduct: (state, action) => {
      state.userFavorite?.push(action.payload);
      saveStoreJson(USER_FAVORITE, state.userFavorite)
    },
    getProfileAction: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const { registerAction, sortByChooseAction, loginAction, checkOutOrderAction, favoriteProduct, getProfileAction } = userReducer.actions

export default userReducer.reducer


// async function
export const registerAPI = (userRegister) => {
  return async (dispatch) => {
    try {
      // Destructuring
      const userDispatch = { ...userRegister }
      // Delete confirmPassword
      delete userDispatch.confirmPassword
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
    catch (error) {
      console.log(error)
    }
  }
}
export const getSortBy = (types) => {
  console.log(types)
  return async (dispatch) => {
    try {
      const action = sortByChooseAction(types);
      dispatch(action)
    }
    catch (error) {
      console.log(error)
    }
  }
}

export const loginApi = (userLogin) => {
  console.log('userLogin', userLogin)
  return async dispatch => {
    try {
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
    catch (error) {
      console.log(error)
    }
  }
}

export const getTokenFacebook = (response) => {
  console.log(response.accessToken)
  return async dispatch => {
    try {
      const result = await http.post('/api/Users/facebooklogin', { facebookToken: response.accessToken });
      console.log('hello')
      //Cập nhật cho reducer
      const action = loginAction(result.data.content);
      dispatch(action);
      //Lưu localstorage
      saveStoreJson(USER_LOGIN, result.data.content);
      saveStore(ACCESS_TOKEN, result.data.content.accessToken);
      saveStore(TOKEN_FACEBOOK, response.accessToken);
      console.log(getStore(ACCESS_TOKEN));
      // Gọi axios lấy dữ liệu api từ token  
      // Gọi api getprofile
      const actionGetProfile = getProfileAction();
      dispatch(actionGetProfile);
      history.push('/profile');
    }
    catch (error) {
      console.log(error)
    }
  }
}

export const getProfileApi = () => {
  return async dispatch => {
    try {
      const result = await http.post('/api/Users/getProfile')
      //Sau khi lấy dữ liệu từ api về đưa lên reducer qua action creator 
      const action = getProfileAction(result.data.content);
      console.log('profile', result.data.content)
      dispatch(action);
      saveStoreJson(USER_PROFILE, result.data.content)
    }
    catch (error) {
      console.log(error)
    }
  }
}

export const updateProfile = (user) => {
  return async (dispatch) => {
    try {
        const result = await http.post('/api/Users/updateProfile', user)
        console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
}


export const checkOutOrder = (cart) => {
  return async (dispatch) => {
    try {
      const action = checkOutOrderAction(cart);
      dispatch(action);
    } catch (error) {
      console.log(error)
    }
  }
}

export const getFavoriteProduct = (favProd) => {
  return async (dispatch) => {
    try {
      const action = favoriteProduct(favProd);
      dispatch(action);
    } catch (error) {
      console.log(error)
    }
  }
}

export const getNewProfile = (newProfile) => {
  return async (dispatch) => {
    try {
      const result = await http.post('/api/Users/updateProfile', newProfile)
      console.log(result.data.content)
    } catch (error) {
      console.log(error)
    }
  }
}



