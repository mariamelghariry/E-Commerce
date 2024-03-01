import axios from "axios";
import { createContext, useState } from "react";

export let cartContext = createContext();

export default function CartContextProvider(props) {
  const [cartNumber,setCartNumber] = useState(0)
  let BaseUrl = `https://ecommerce.routemisr.com`;
  let headers = { token: localStorage.getItem("userToken") };
  function addToCart(id) {
    return axios.post(
      `${BaseUrl}/api/v1/cart`,
      {
        productId: id,
      },
      {
        headers: headers,
      }
    );
  }
  function getCart(id) {
    return axios.get(
      `${BaseUrl}/api/v1/cart`,
      {
        headers: headers,
      }
    );
  }

  function updateCart(id,count) {
    return axios.put(
      `${BaseUrl}/api/v1/cart/${id}`,
      {
        count: count,
      },
      {
        headers: headers,
      }
    );
  }
  function deleteCart(id) {
    return axios.delete(
      `${BaseUrl}/api/v1/cart/${id}`,
      {
        headers: headers,
      }
    );
  }
  // function deleteFullCart() {
  //   return axios.delete(
  //     `${BaseUrl}/api/v1/cart`,
  //     {
  //       headers: headers,
  //     }
  //   );
  // }

  function checkoutPayment(id,formData){
    return axios.post(
      `${BaseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
      {
        shippingAddress:formData

      },
      {
        headers: headers,
      }
    );

  }

  function addToWishList(id) {
    return axios.post(
      `${BaseUrl}/api/v1/wishlist`,
      {
        productId: id,
      },
      {
        headers: headers,
      }
    );
  }

  function veiwWishList(id) {
    return axios.get(
      `${BaseUrl}/api/v1/wishlist`,
      {
        headers: headers,
      }
    );
  }

  function deleteProductFromWishList(id) {
    return axios.delete(
      `${BaseUrl}/api/v1/wishlist/${id}`,
      {
        headers: headers,
      }
    );
  }

  
  function getCategory(id) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`);
  }
  
  return <cartContext.Provider value={{addToCart,setCartNumber,cartNumber,getCart,updateCart,deleteCart,checkoutPayment,addToWishList,veiwWishList,deleteProductFromWishList,getCategory}}>
    {props.children}
    </cartContext.Provider>;
}
