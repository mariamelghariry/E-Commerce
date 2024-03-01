import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BallTriangle } from 'react-loader-spinner'
import { Link } from "react-router-dom";
import { cartContext } from "../context/cartContext";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

export default function Products() {
 let {addToCart,setCartNumber,addToWishList} = useContext(cartContext)

  async function getProducts() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
  }

  let {data , isLoading} = useQuery("products", getProducts,{});

  async function addToMyCart (id){
  let {data} = await addToCart(id)
  if(data.status == 'success'){
    toast.success(data.message)
    setCartNumber(data.numOfCartItems)
  }
  
  }

  async function addToMyWishList(id){
    let {data} = await addToWishList(id)
    if(data.status == 'success'){
      toast.error(data.message)
    }
    
    }



  return (

    <>
    <div className="row my-5 nav-m">
      
        <>
          {!isLoading?
          <>
          {data?.data.data.map((product) => {
            return (
              <div className="col-lg-4 col-xl-3" key={product._id}>
                <div className="product p-5 m-3 rounded d-flex flex-column gap-2 text-center">
                  <Link to={`/details/${product._id}`} className="text-decoration-none text-black">
                  <img
                    src={product.imageCover}
                    className="w-100"
                    alt={product.title}
                  />
                  <p className="text-success">{product.category.name}</p>
                  <h6>{product.title}</h6>
                  <div className="d-flex justify-content-between">
                    <p>{product.price}Egp</p>
                    <p>
                      {product.ratingsAverage}
                      <i className="fa-solid fa-star rating-color"></i>
                    </p>
                  </div>
                  </Link>
                  
                  <div className="d-flex justify-content-end">
                  <i onClick={()=>{addToMyWishList(product._id)}} class="fa-solid fa-heart fs-4"></i>
                  </div>
                  <button onClick={()=>{addToMyCart(product._id)}} className="btn btn-success">Add to cart</button>
                </div>
              </div>
            );
          })}
          </>
          :
          <div className="vh-100 d-flex justify-content-center align-items-center">
          <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        </div>
          }
        </>
      
    </div>
    </>
  );
}
