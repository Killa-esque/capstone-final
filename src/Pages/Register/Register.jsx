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

    // <form className='container form-control my-5' style={{ maxWidth: '800px', borderRadius: '20px' }} onSubmit={form.handleSubmit}>
    //   <div className='text-center'>
    //     <img className='my-2' src={logo} alt="..." />
    //     <h2 className="text-uppercase text-center mb-5" style={{ color: '#df2020' }}>Create an account</h2>
    //   </div>

    // {/* <!-- Username input --> */}
    // <div className="form-outline mb-4">
    //   <label className="form-label" htmlFor="registerUsername" style={{ color: '#212245', fontWeight: 'bold', fontSize: '18px' }}>Username</label>
    //   <input name='name' onChange={form.handleChange} onBlur={form.handleBlur} type="text" id="registerUsername" className="form-control" placeholder='Enter your name' />
    //   {form.errors.name && form.touched.name && <p className='text-danger'>{form.errors.name}</p>}
    // </div>

    //   {/* <!-- Email input --> */}
    //   <div className="form-outline mb-4">
    //     <label className="form-label" htmlFor="registerEmail" style={{ color: '#212245', fontWeight: 'bold', fontSize: '18px' }}>Email</label>
    //     <input name='email' onChange={form.handleChange} onBlur={form.handleBlur} type="email" id="registerEmail" className="form-control" placeholder='Enter your email' />
    //     {form.errors.email && form.touched.email && <p className='text-danger'>{form.errors.email}</p>}
    //   </div>

    //   {/* <!-- Password input --> */}
    //   <div className="form-outline mb-4">
    //     <label className="form-label" htmlFor="registerPassword" style={{ color: '#212245', fontWeight: 'bold', fontSize: '18px' }}>Password</label>
    //     <input name='password' onChange={form.handleChange} onBlur={form.handleBlur} type="password" id="registerPassword" className="form-control" placeholder='Enter your password' />
    //     {form.errors.password && form.touched.password && <p className='text-danger'>{form.errors.password}</p>}
    //   </div>

    //   {/* <!-- Repeat Password input --> */}
    //   <div className="form-outline mb-4">
    //     <label className="form-label" htmlFor="registerRepeatPassword" style={{ color: '#212245', fontWeight: 'bold', fontSize: '18px' }}>Repeat password</label>
    //     <input name='confirmPassword' onChange={form.handleChange} onBlur={form.handleBlur} type="password" id="registerRepeatPassword" className="form-control" placeholder='Confirm password' />
    //     {form.errors.confirmPassword && form.touched.confirmPassword && <p className='text-danger'>{form.errors.confirmPassword}</p>}
    //   </div>

    //   {/* <!-- Phone Number input --> */}
    //   <div className="form-outline mb-4">
    //     <label className="form-label" htmlFor="registerPhoneNumber" style={{ color: '#212245', fontWeight: 'bold', fontSize: '18px' }}>Phone Number</label>
    //     <input name='phoneNumber' onChange={form.handleChange} onBlur={form.handleBlur} type="text" id="registerPhoneNumber" className="form-control" placeholder='Phone number' />
    //     {form.errors.phoneNumber && form.touched.phoneNumber && <p className='text-danger'>{form.errors.phoneNumber}</p>}
    //   </div>

    //   {/* <div role="group" aria-labelledby="checkbox-group">
    //     <label>
    //       <Field type="checkbox" name="checked" value="One" />
    //       One
    //     </label>
    //     <label>
    //       <Field type="checkbox" name="checked" value="Two" />
    //       Two
    //     </label>
    //     <label>
    //       <Field type="checkbox" name="checked" value="Three" />
    //       Three
    //     </label>
    //   </div> */}

    //   {/* <!-- Submit button --> */}
    //   <button type="submit" className="btn mb-4 w-100">Register</button>
    // </form>

  )
}

export default Register
