import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useFormik } from "formik";
import { cartContext } from '../context/cartContext';



export default function Checkout() {
 let{checkoutPayment,getCart} = useContext(cartContext)
  const [isLoading,setLaoading]= useState(false)
  const [errMs,setErr] =useState(null)
  const [cartid,setCartId] = useState('')


  useEffect(() => {
    (async () => {
      let { data } = await getCart();
      // console.log(data.data._id)
      setCartId(data.data._id)
    })();
  });


  async function payment(values) {
  let data = await checkoutPayment(cartid,values)
  console.log(data)
  if(data.data.status == 'success'){
    window.location=data.data.session.url
  }

  }
  let formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: ""
    },
    onSubmit: payment,
  });
  return (
    <div>
    <h1 className="text-success mt-3">Payment Form</h1>
    <form
      onSubmit={formik.handleSubmit}
      className="d-flex justify-content-center "
    >
      <div className="row ">
        <div className="col-md-8 bg-light shadow p-4 my-3 rounded col-10 mx-auto">
          <div className="row gy-4">

            <div className="col-md-12">
              <label htmlFor="userDetails">Details</label>
              <input
              
                value={formik.values.details}
                onChange={formik.handleChange}
                type="text"
                id="userDetails"
                name="details"
                className="form-control"
              />
            </div>

            <div className="col-md-12">
              <label htmlFor="urCity">City</label>
              <input
              
                value={formik.values.city}
                onChange={formik.handleChange}
                type="text"
                id="urCity"
                name="city"
                className="form-control"
              />
              
            </div>
            <div className="col-md-12">
              <label htmlFor="urPhone">Phone</label>
              <input
              
                value={formik.values.phone}
                onChange={formik.handleChange}
                type="text"
                id="urPhone"
                name="phone"
                className="form-control"
              />
              
            </div>

            <div className=" d-flex justify-content-between align-items-center">
          
              <button type="submit" className="btn btn-success">
                Pay
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </form>
  </div>
  )
}
