import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../context/cartContext";
import { toast } from "react-toastify";
import { BallTriangle } from "react-loader-spinner";



export default function WishList() {
  const [wishListdata, setData] = useState([]);
  let { veiwWishList, addToCart, setCartNumber, deleteProductFromWishList } = useContext(cartContext);
 
    useEffect(() => {
      (async () => {
        let { data } = await veiwWishList();
        setData(data.data);
      })();
    });

  async function addToMyCart(id) {
    let { data } = await addToCart(id);
    if (data.status == "success") {
      toast.success(data.message);
      setCartNumber(data.numOfCartItems);
    }
  }

  async function removeProductFromWishList(id) {
    let { data } = await deleteProductFromWishList(id);
    setData(data.data)
  }

  return (
    <div>
      {wishListdata == 0 ? (
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
      ) : (
        <div className="container nav-m">
          <h2 className="my-5 ps-5">My WishList</h2>
          <div className="col-md-11 shadow p-5 m-auto">
            {wishListdata?.map((product) => {
              return (
                <div
                  className="row border-bottom align-items-center"
                  key={product._id}
                >
                  <div className="col-md-2 py-5">
                    <img src={product.imageCover} alt="" className="w-75" />
                  </div>
                  <div className="col-md-10 pb-3">
                    <h5>{product.title}</h5>
                    <p>{product.price}Egp</p>

                    <div className="d-flex justify-content-between align-items-baseline">
                      <button
                        onClick={() => {
                          removeProductFromWishList(product._id);
                        }}
                        className="btn btn-outline-danger"
                      >
                        <i className="fa-regular fa-trash-can me-2"></i>Remove
                      </button>
                      <div>
                        <button
                          onClick={() => {
                            addToMyCart(product._id);
                          }}
                          className="btn btn-success"
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
