import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { history } from '../../index';
import { ACCESS_TOKEN, getStoreJson, http, http2, saveStore, saveStoreJson, USER_LOGIN } from '../../util/config';

const initialState = {
  userRegister: null,
  sortByTypes: ['Name', 'Price', 'Quantity'],
  sortBy: 'Name',
  userLogin: getStoreJson(USER_LOGIN)
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
    }

  },
});

export const { registerAction, sortByChooseAction, loginAction } = userReducer.actions

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
    const result = await http2.post('/api/Users/signin', userLogin);
    //Cập nhật cho reducer
    const action = loginAction(result.data.content);
    dispatch(action);
    //Lưu localstorage
    saveStoreJson(USER_LOGIN, result.data.content);
    saveStore(ACCESS_TOKEN, result.data.content.accessToken);
    //Gọi axios lấy dữ liệu api từ token  
    //Gọi api getprofile
    // const actionGetProfile = getProfileAction();
    // dispatch(actionGetProfile);

    history.push('/profile');
  }
}
