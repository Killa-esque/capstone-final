import React, { useState } from 'react'
// Form validation
import { Field, Form, Formik, useFormik } from 'formik'
import * as yup from 'yup'
// css
import "../../assets/css/register-bg.css";
import "../../assets/css/button-submit.css"
// image
import logo from "../../assets/images/logo.png";
//
import { registerSchema } from '../../validation/FormValidation';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import { useDispatch } from 'react-redux';
import { registerAPI } from '../../redux/reducers/userReducer';


const Register = () => {


  // Hook
  const dispatch = useDispatch()

  const [valid, setValid] = useState(false);

  return (

    <Formik
      initialValues={{
        email: "",
        password: "",
        name: "",
        gender: 0,
        phoneNumber: "",
        confirmPassword: "",
      }}
      validationSchema={registerSchema}
      onSubmit={(values, actions) => {
        const actionAsync = registerAPI(values);
        dispatch(actionAsync)
      }}
    >
      {props => (
        <Form onSubmit={props.handleSubmit} className='container form-control my-5' style={{ maxWidth: '800px', borderRadius: '20px', padding: '50px 100px' }}>
          <div className='text-center'>
            <img className='my-2' src={logo} alt="..." />
            <h2 className="text-uppercase text-center mb-5" style={{ color: '#df2020' }}>Create an account</h2>
          </div>
          <CustomInput
            label='Username'
            name='name'
            type='text'
            placeholder='Enter your name'
          />
          <CustomInput
            label='Email'
            name='email'
            type='email'
            placeholder='Enter your email'
          />
          <CustomInput
            label='Password'
            name='password'
            type='password'
            placeholder='Enter your password'
          />
          <CustomInput
            label='Repeat your password'
            name='confirmPassword'
            type='password'
            placeholder='Confirm password'
          />
          <CustomInput
            label='Phone'
            name='phoneNumber'
            type='text'
            placeholder='Enter your Phone Number'
          />
          <CustomSelect
            label='Gender'
            name='gender'
            type='text'
            placeholder='Please select your gender'
          >
            <option value={0}>Please select your gender</option>
            <option value={1}>Men</option>
            <option value={2}>Female</option>
          </ CustomSelect>
          <div className='text-center'>
            <button className='btn-grad' style={{ margin: 0 }} type="submit">Register</button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Register
