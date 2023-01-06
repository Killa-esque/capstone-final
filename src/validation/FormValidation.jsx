import * as yup from 'yup'

// Password regex
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

// Person name regex
const nameRegex = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .max(40)
    .matches(nameRegex, 'Please enter valid name')
    .required('Required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Required'),
  password: yup
    .string()
    .min(8)
    .matches(passwordRegex, { message: "Your password is not strong enough" })
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match')
    .required('Required'),
  phoneNumber: yup
    .string()
    .required('Required'),
  gender: yup
    .boolean()
    .required('Please choose your sex')
  // .oneOf([true, false], 'Please choose your sex')
})

export const loginSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email is invalid!'),
  password: yup.string().required('Password is required')
})
