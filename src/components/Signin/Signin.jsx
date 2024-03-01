import React, { useContext, useState } from "react";
import axios from 'axios'
import { useFormik } from "formik";
import {Link, useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import { userContext } from "../context/tokenContext";





export default function Signin() {
  let {userToken,setToken} = useContext(userContext)
  
  const [isLoading,setLaoading]= useState(false)
  const [errMs,setErr] =useState(null)
  let navigate = useNavigate()
  
  // Yup
 let validationSchema = Yup.object({
    email:Yup.string().required('email is equired').email('enter a valid email'),
  })

  async function signIn(values) {
    setLaoading(true)
    let {data} =  await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).catch((err)=>{
      console.log(err.response.data.message)
      setErr(err.response.data.message)
      setLaoading(false)
    })
    if(data.message == 'success'){
      navigate('/home')
      localStorage.setItem('userToken',data.token)
      setToken(data.token)
      console.log(userToken)
      setLaoading(false)
    }
  }
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema:validationSchema,
    onSubmit: signIn,
  });
  return (
    <div className="nav-m">
    <h1 className="text-success mt-3">Login Form</h1>
    <form
      onSubmit={formik.handleSubmit}
      className="d-flex justify-content-center "
    >
      <div className="row ">
        <div className="col-md-8 bg-light shadow p-4 my-3 rounded col-10 mx-auto">
          <div className="row gy-4">

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

            {errMs !== null ?
            <p className="text-danger">{errMs}</p>
            :
            ""}
            <div className=" d-flex justify-content-between align-items-center">
            <p className="text-muted fw-bold m-0">Don't have account? <Link to='/signup' className="text-success">Register</Link></p>
              <button disabled={!(formik.dirty)} type="submit" className="btn btn-success">
                Login
                {isLoading ?
                <span><i className="fa-solid fa-spinner fa-spin text-light mx-2"></i></span>
                :
                ''}
              
              </button>
            </div>
            <Link className="text-decoration-none text-success" to='/forgetpassword'>Forgot your password?</Link>
            
          </div>
        </div>
      </div>
    </form>
  </div>
  )
}
