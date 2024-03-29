import React from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import logo from "../../assets/images/logo.png";
import shoesRegister from "../../assets/images/shoes-register.jpg";
import { Form, NavLink } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ErrorMessage, Formik } from 'formik';
import { getProfileApi, loginApi } from '../../redux/reducers/userReducer';
import { loginSchema } from '../../validation/FormValidation';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import FaceBookLogin from '../../components/LoginFacebook/FaceBookLogin';


const Login = () => {

  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={async (values, actions) => {
        const actionAsync = loginApi(values);
        await dispatch(actionAsync)
        await dispatch(getProfileApi())
      }}
    >
      {({ errors, touched, values, handleBlur, handleChange, handleSubmit }) => (
        <Form className='pb-5 pt-3' onSubmit={handleSubmit}>
          <div className='text-center'>
            <h2 className="text-uppercase text-center mb-5 fs-1" style={{ color: '#df2020' }}>LOGIN</h2>
          </div>
          <MDBContainer className="my-5  rounded">
            <MDBCard>
              <MDBRow className='g-0'>
                <MDBCol md='5'>
                  <MDBCardImage src={shoesRegister} alt="login form" className='rounded-start w-100 h-100' style={{ objectFit: 'cover' }} />
                </MDBCol>
                <MDBCol md='7'>
                  <MDBCardBody className='d-flex flex-column justify-content-center py-5 px-5'>
                    <div className='d-flex flex-row align-items-center'>
                      <div className='d-flex'>
                        <img className='' src={logo} alt="..." />
                        <h2 className="text-uppercase text-center mt-2 mx-3 fs-1" style={{ color: '#df2020', display: 'inline' }}>Shoes Store</h2>
                      </div>
                    </div>
                    <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px', padding: 0 }}>Sign into your account</h5>
                    <TextField
                      id="outlined-basic"
                      defaultValue={values.email}
                      label="Email"
                      variant="outlined"
                      className="form-control form-control-lg my-2"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur} />
                    <div className='' style={{ height: '20px' }}>
                      {errors.email && touched && <p className='text-danger'>{<ErrorMessage name="email">{msg => <div className='text-danger px-2'>{msg}</div>}</ErrorMessage>}</p>}
                    </div>
                    <TextField
                      defaultValue={values.password}
                      id="outlined-password-input"
                      label="Password"
                      type="password"
                      className="form-control form-control-lg my-2"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur} />
                    <div className='' style={{ height: '20px' }} >
                      {errors.password && touched && <p className='text-danger'>{<ErrorMessage name="password">{msg => <div className='text-danger px-2'>{msg}</div>}</ErrorMessage>}</p>}
                    </div>

                    {/* <MDBBtn className="mb-4 px-5 mt-3" color='dark' size='lg' type='submit'>Login</MDBBtn> */}
                    <motion.button
                      whileTap={{ scale: 1.1 }}
                      className="btn btn-dark mt-2"
                      type='submit'
                    >
                      Login
                    </motion.button>
                    <div className='mt-2'>
                      <FaceBookLogin />
                    </div>

                    <Link to={'/register'} className='mt-2' style={{ color: '#393f81', display: 'inline' }}>Register here</Link>
                  </MDBCardBody>
                  <div className='text-center'>
                    <p>© All rights reserved.</p>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBContainer>
        </Form>
      )}
    </Formik >
  )
}

export default Login
