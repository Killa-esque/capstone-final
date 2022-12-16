import { useField } from 'formik';
import React from 'react'

const CustomSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-outline mb-4">
      <label className="form-label" style={{ color: '#212245', fontWeight: 'bold', fontSize: '18px' }}>{label}</label>
      <select placeholder='Please select your gender' className={meta.touched && meta.error ? 'form-control' : 'form-control'} {...field} {...props} />
      {meta.error && meta.touched && <p className='text-danger'>{meta.error}</p>}
    </div>
  )
}

export default CustomSelect
