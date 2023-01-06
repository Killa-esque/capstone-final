import React, { } from 'react'
// Form validation
import { Field, Form, Formik } from 'formik'
// css
import "../../assets/css/register-bg.css";
import "../../assets/css/button-submit.css"
// image
import logo from "../../assets/images/logo.png";
//
import { registerSchema } from '../../validation/FormValidation';
import CustomInput from '../../components/CustomInput/CustomInput';
import { useDispatch } from 'react-redux';
import { registerAPI } from '../../redux/reducers/userReducer';


const Register = () => {


  // Hook
  const dispatch = useDispatch()


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
          <Field className="form-select form-select-md mb-4 mt-2" as="select" name="gender">
            <option value="true">Male</option>
            <option value="false">Female</option>
          </Field>
          {props.errors.gender && props.touched.gender ? (
            <div className='text-danger'>{props.errors.gender}</div>
          ) : null}
          <div className='text-center'>
            <button className='btn-grad' style={{ margin: 0 }} type="submit">Register</button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Register
