import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function ForgetPassword() {
  let validationShema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      
  });
 
  async function sendCode(values) {
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      values
    );
    if (data.statusMsg == "success") {
      document.querySelector('.forgetPassword').classList.add('d-none')
      document.querySelector('.verifyPasswordd').classList.remove('d-none')
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationShema,
    onSubmit: sendCode,
  });

  let validationShema2 = Yup.object({
    resetCode: Yup.string()
      .required("Code is required")
      
  });
  let Navigate = useNavigate()

  async function verifyCode(values) {
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      values
    );
    if (data.status == "Success") {
      console.log('ok')
      Navigate('/resetpassword')
    }
  }

  let verifyFormik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: validationShema2,
    onSubmit: verifyCode,
  });
  return (
    <div>
      <div className="forgetPassword nav-m my-5 d-flex flex-column gap-2">
        <h3>Forget your password?</h3>
        <form onSubmit={formik.handleSubmit} action="w-75 mx-auto my-5">
          <label htmlFor="">Enter your E-mail</label>
          <input
            onBlur={formik.handleBlur}
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            id="email"
            name="email"
            className="form-control my-3"
          />
          {formik.errors.email && formik.touched.email ? (
            <p className="text-danger">{formik.errors.email}</p>
          ) : (
            ""
          )}
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn btn-success"
          >
            Send Code
          </button>
        </form>
      </div>
      <div className="verifyPasswordd d-none">
      <div className=" nav-m my-5 d-flex flex-column gap-2">
        <h3>Verify Code</h3>
        <form onSubmit={verifyFormik.handleSubmit} action="w-75 mx-auto my-5">
          <label htmlFor="">Enter verification code</label>
          <input
            onBlur={verifyFormik.handleBlur}
            type="text"
            value={verifyFormik.values.resetCode}
            onChange={verifyFormik.handleChange}
            id="resetCode"
            name="resetCode"
            className="form-control my-3"
          />
          {verifyFormik.errors.resetCode && verifyFormik.touched.resetCode ? (
            <p className="text-danger">{verifyFormik.errors.resetCode}</p>
          ) : (
            ""
          )}
          <button
            disabled={!(verifyFormik.isValid && verifyFormik.dirty)}
            type="submit"
            className="btn btn-success"
          >
            Send Code
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}
