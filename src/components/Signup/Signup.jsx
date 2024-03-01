import React, { useState } from "react";
import axios from 'axios'
import { useFormik } from "formik";
import {Link, useNavigate} from 'react-router-dom'
import * as Yup from 'yup'

export default function Signup() {
  const [isLoading,setLaoading]= useState(false)
  const [errMs,setErr] =useState(null)
  let navigate = useNavigate()
  // custom validation
  // function validate(values) {
  //   let errors = {};
  //   if (!values.name) {
  //     errors.name = "Name is required";
  //   } else if (values.name.length < 3) {
  //     errors.name = "min Length is 3 char";
  //   } else if (values.name.length > 10) {
  //     errors.name = "max length is 10 char";
  //   }
  //   if(!values.phone){
  //     errors.phone = 'Phone number is required'
  //   }else if(!/^01[1250][0-9]{8}$/.test(values.phone)){
  //     errors.phone = 'Enter  a valid phone number'
  //   }
  //   if(!values.email){
  //     errors.email = 'Email is required'
  //   }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
  //     errors.email='Enter a valid email'
  //   }
  //   if(!values.password){
  //     errors.password = 'Password is required'
  //   }else if(!/^[A-Z][a-z0-9]{7,10}$/.test(values.password)){
  //     errors.password = 'First character must be capital and password cant be less than 8 characters'
  //   }
  //   if(!values.rePassword){
  //     errors.rePassword = 'Confirm password is required'
  //   }else if (values.password !== values.rePassword){
  //     errors.rePassword = 'Not matched'
  //   }

  //   return errors;
  // }
  // Yup
 let validationSchema = Yup.object({
    name:Yup.string().min(3,'minlength is 3').max(15,'maxlength is 15').required('this name is required'),
    email:Yup.string().required('email is equired').email('enter a valid email'),
    phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/ ,'enter a valid phone number'),
    password:Yup.string().required('this password is required').matches(/^[A-Z][a-z0-9]{6,8}$/,'First character must be capital and password cant be less than 8 characters'),
    rePassword:Yup.string().required('confirm password is required').oneOf([Yup.ref('password')],'not matched')
  })

  async function signUp(values) {
    setLaoading(true)
    let {data} =  await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).catch((err)=>{
      setErr(err.response.data.message)
      setLaoading(false)
    })
    if(data.message == 'success'){
      navigate('/signin')
      setLaoading(false)
    }
  }
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema:validationSchema,
    onSubmit: signUp,
  });
  return (
    <div className="nav-m">
      <h1 className="text-success mt-3">Register Form</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="d-flex justify-content-center "
      >
        <div className="row ">
          <div className="col-md-8 bg-light shadow p-4 my-3 rounded col-10 mx-auto">
            <div className="row gy-4">
              <div className="col-md-12">
                <label htmlFor="userName">Name</label>
                <input
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  type="text"
                  id="userName"
                  name="name"
                  className="form-control"
                />
                {formik.errors.name && formik.touched.name ?
                  <p className="text-danger">{formik.errors.name}</p> : ''}
              </div>
              <div className="col-md-12">
                <label htmlFor="userEmail">Email</label>
                <input
                onBlur={formik.handleBlur}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  type="email"
                  id="userEmail"
                  name="email"
                  className="form-control"
                />
                {formik.errors.email && formik.touched.email ?
                  <p className="text-danger">{formik.errors.email}</p> : ''}
              </div>
              <div className="col-md-12">
                <label htmlFor="userPhone">Phone</label>
                <input
                onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  type="tel"
                  id="userPhone"
                  name="phone"
                  className="form-control"
                />
                {formik.errors.phone && formik.touched.phone ?
                  <p className="text-danger">{formik.errors.phone}</p> : ''}
              </div>
              <div className="col-md-12">
                <label htmlFor="userPassword">Password</label>
                <input
                onBlur={formik.handleBlur}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type="password"
                  id="userPassword"
                  name="password"
                  className="form-control"
                />
                {formik.errors.password && formik.touched.password ?
                  <p className="text-danger">{formik.errors.password}</p> : ''}
              </div>
              <div className="col-md-12">
                <label htmlFor="userConfirm">RePassword</label>
                <input
                onBlur={formik.handleBlur}
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  type="password"
                  id="userConfirm"
                  name="rePassword"
                  className="form-control"
                />
                {formik.errors.rePassword && formik.touched.rePassword ?
                  <p className="text-danger">{formik.errors.rePassword}</p> : ''}
              </div>
              {errMs !== null ?
              <p className="text-danger">{errMs}</p>
              :
              ""}
              <div className=" d-flex justify-content-between align-items-center">
              <p className="text-muted fw-bold m-0">I already have account <Link to='/signin' className="text-success">Login</Link></p>
                <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn btn-success">
                  Register
                  {isLoading ?
                  <span><i className="fa-solid fa-spinner fa-spin text-light mx-2"></i></span>
                  :
                  ''}
                
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
