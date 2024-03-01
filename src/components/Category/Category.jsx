import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { cartContext } from "../context/cartContext";
import { useQuery } from "react-query";


export default function Category() {
  let {getSpecificCategory} = useContext(cartContext)
  const [categoryList, setCategory] = useState([]);
  const [categoryInfoList, setCategoryInfo] = useState([]);

  async function getCategory() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
  }
  let {data , isLoading} = useQuery("categories", getCategory,{});

//  async function categoryInfo(id){
//     let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/subcategories`)
//     // console.log(data.data.category)
//     setCategoryInfo(data.data)
//     console.log(categoryInfoList)
//   }

  return (
    <>
    { isLoading?
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
    :
    <div className="row my-5 justify-content-center nav-m">
      {data?.data.data.map((product) => {
        return (
            <div  className="col-md-3 position-relative categories overflow-hidden mx-3 my-3 p-0 col-10 rounded" key={product._id}>
              <img src={product.image} alt="" className="w-100"/>
              <div className="position-absolute bottom-0 start-0 w-100 align-items-center bg-white d-flex justify-content-center white-bar">
                <p className="fs-3 text-success">{product.name}</p>
                
              </div>
            </div>
        );
      })}
    </div>
    }
    
    </>
    
  );
}