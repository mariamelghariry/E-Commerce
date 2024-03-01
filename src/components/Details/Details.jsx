import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cartContext } from "../context/cartContext";
import { toast } from "react-toastify";

export default function Details() {
 let {addToCart,setCartNumber} =  useContext(cartContext)
  const [productDetails, setDetails] = useState(null);

  let params = useParams();
  let productId = params.id;

  async function getProduct() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`
    );
    // console.log(data.data);
    setDetails(data.data);
  }

  async function addToMyCart(id){
    let {data} = await addToCart(id)
    if(data.status == 'success'){
      toast.success(data.message)
      setCartNumber(data.numOfCartItems)
    }
  }


  useEffect(() => {
    getProduct();
  });

  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-3">
            <img src={productDetails?.imageCover} alt="" className="w-100" />
            </div>
            <div className="col-md-9 d-flex flex-column justify-content-around">
              <div>
              <h2>{productDetails?.title}</h2>
              <p>{productDetails?.description}</p>
              </div>
              <div>
              <p>{productDetails?.category.name}</p>
              <div className="d-flex justify-content-between">
              <p className="d-flex gap-1 align-items-baseline"><span className="text-success">Price</span>{productDetails?.price}</p>
              <p className="d-flex gap-1 align-items-baseline"><span>{productDetails?.ratingsAverage}</span><i className="fa-solid fa-star text-warning"></i></p>
              </div>
              <button onClick={()=>{addToMyCart(productDetails._id)}} className="btn btn-success w-100">Add to cart</button>
            </div>
            </div>
            
          
        </div>
      </div>
    </div>
  );
}
