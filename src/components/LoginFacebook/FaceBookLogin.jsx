import React from 'react'
// import FacebookLogin from 'react-facebook-login'
import { useDispatch } from 'react-redux';
import { getTokenFacebook } from '../../redux/reducers/userReducer';

export default function FaceBookLogin() {
  const dispatch = useDispatch();
  const responseFacebook = (response) => {
    dispatch(getTokenFacebook(response))
  }
  return (
    <div>
      {/* <FacebookLogin
        appId="690988225891975"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass='w-100 bg-primary fw-bold py-1 border-0 text-white rounded'
      /> */}
      <></>
    </div>
  )
}

