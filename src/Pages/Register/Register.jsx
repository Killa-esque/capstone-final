import React from 'react'
// Form validation
import { useFormik } from 'formik'
// css
import "../../assets/css/register-bg.css";
// image
import logo from "../../assets/images/logo.png";
import { basicSchema } from '../../validation/FormValidation';


const Register = () => {

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      // toggle: true
    },
    // validationSchema: basicSchema,
    // onSubmit: (values) => {
    //   // const actionAsync = loginAPI(values);
    //   // dispatch(actionAsync);
    //   console.log('values')
    // }
  })
  // console.log(first)
  return (

    <form className='container form-control my-5' style={{ maxWidth: '800px', borderRadius: '20px' }}>
      <div className='text-center'>
        <img className='my-2' src={logo} alt="..." />
        <h2 className="text-uppercase text-center mb-5" style={{ color: '#df2020' }}>Create an account</h2>
      </div>

      {/* <!-- Username input --> */}
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="registerUsername" style={{ color: '#212245', fontWeight: 'bold', fontSize: '18px' }}>Username</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.name} type="text" id="registerUsername" className="form-control" placeholder='Enter your name' />
        {errors.name && touched.name && <p className='text-warning'>{errors.name}</p>}
      </div>

      {/* <!-- Email input --> */}
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="registerEmail" style={{ color: '#212245', fontWeight: 'bold', fontSize: '18px' }}>Email</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.email} type="email" id="registerEmail" className="form-control" placeholder='Enter your email' />
        {errors.email && touched.email && <p className='text-warning'>{errors.email}</p>}
      </div>

      {/* <!-- Password input --> */}
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="registerPassword" style={{ color: '#212245', fontWeight: 'bold', fontSize: '18px' }}>Password</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.password} type="password" id="registerPassword" className="form-control" placeholder='Enter your password' />
        {errors.password && touched.password && <p className='text-warning'>{errors.password}</p>}
      </div>

      {/* <!-- Repeat Password input --> */}
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="registerRepeatPassword" style={{ color: '#212245', fontWeight: 'bold', fontSize: '18px' }}>Repeat password</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} type="password" id="registerRepeatPassword" className="form-control" placeholder='Confirm password' />
        {errors.confirmPassword && touched.confirmPassword && <p className='text-warning'>{errors.confirmPassword}</p>}
      </div>

      {/* <!-- Phone Number input --> */}
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="registerPhoneNumber" style={{ color: '#212245', fontWeight: 'bold', fontSize: '18px' }}>Phone Number</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.phoneNumber} type="text" id="registerPhoneNumber" className="form-control" placeholder='Phone number' />
        {errors.phoneNumber && touched.phoneNumber && <p className='text-warning'>{errors.phoneNumber}</p>}
      </div>

      {/* <!-- Submit button --> */}
      <button type="submit" className="btn mb-4 w-100 gradient-custom-4">Register</button>
    </form>

  )
}

export default Register
