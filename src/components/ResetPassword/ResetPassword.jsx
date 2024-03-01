import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function ResetPassword() {
let navigate = useNavigate()
  async function ResetPassword(values){
    let { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      values
    );
    if(data.token){
     navigate('/signin')
    }
  }

let formik = useFormik({
  initialValues:{
    email:'',
    newPassword:''
  },
  onSubmit:ResetPassword
})

  return (
    <div className='nav-m'>
      <form onSubmit={formik.handleSubmit} action="" className='d-flex flex-column gap-2 w-75 my-5 m-auto'>
        <label htmlFor="">Email</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id='email' value={formik.values.email} className='form-control '/>
        <label htmlFor="">New Password</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='newPassword' value={formik.values.newPassword} className='form-control'/>
        <button type='submit'  className='btn btn-success my-3 '>Reset Password</button>
      </form>
      </div>
  )
}
