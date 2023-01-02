import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
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
    loginAction: (state, action) => {
      state.userLogin = action.payload;
    },
    checkOutOrderAction: (state, action) => {
      const newArrOrder = action.payload;
      newArrOrder?.map((newItem) => {
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
      state.userFavorite = action.payload;
    },
    getProfileAction: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const { registerAction, loginAction, checkOutOrderAction, favoriteProduct, getProfileAction } = userReducer.actions

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
      toast.success('Đăng ký thành công')
      const action = registerAction(result.data.content)
      dispatch(action)
      // go to login
      history.push('/login')
    }
    catch (error) {
      toast.error('Register Failed')
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
      toast.success("Đăng nhập thành công");
      history.push('/');
      // window.location.reload()
    }
    catch (error) {
      toast.error('Login Failed')
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
      // Gọi axios lấy dữ liệu api từ token  
      // Gọi api getprofile
      const actionGetProfile = getProfileAction();
      dispatch(actionGetProfile);
      toast.success("Đăng nhập thành công");
      history.push('/');
    }
    catch (error) {
      toast.error('FaceBook Login Failed')
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
      dispatch(action);
      saveStoreJson(USER_PROFILE, result.data.content)
    }
    catch (error) {
      toast.error('Get Profile Failed')
      console.log(error)
    }
  }
}

export const updateProfile = (user) => {
  return async (dispatch) => {
    try {
      const result = await http.post('/api/Users/updateProfile', user)
      localStorage.removeItem('userProfile')
      toast.success('Update Successfully')
    } catch (error) {
      toast.error('Update Failed')
      console.log(error)
    }
  }
}

export const checkOutOrder = (cart) => {
  return async (dispatch) => {
    try {
      console.log(cart)
      const result = await http.post('/api/Users/order', cart)
    } catch (error) {
      toast.error('Submit Order Failed')
      console.log(error)
    }
  }
}

export const getFavoriteProduct = (userToken) => {
  return async (dispatch) => {
    try {
      const result = await http.get('/api/Users/getproductfavorite', userToken)
      const action = favoriteProduct(result.data.content);
      dispatch(action);
    } catch (error) {
      toast.error('Get Failed')
      console.log(error)
    }
  }
}

export const getLikeProduct = (id) => {
  return async (dispatch) => {
    try {
      const result = await http.get(`/api/Users/like?productId=${id}`)
      toast.success(result.data.content)
    }
    catch (error) {
      toast.error('Like Failed')
      console.log(error)
    }
  }
}
export const getUnLikeProduct = (id) => {
  return async (dispatch) => {
    try {
      const result = await http.get(`/api/Users/unlike?productId=${id}`)
      toast.success(result.data.content)
    }
    catch (error) {
      toast.error('Unlike Failed')
      console.log(error)
    }
  }
}


