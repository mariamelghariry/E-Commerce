import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../context/cartContext";
import { Link } from "react-router-dom";
import { BallTriangle } from 'react-loader-spinner'

export default function Cart() {
  let { getCart, deleteCart, updateCart, setCartNumber,cartNumber } =
    useContext(cartContext);
  const [data, setData] = useState([]);
  const [cartPrice, setPrice] = useState([]);

  useEffect(() => {
    (async () => {
      let { data } = await getCart();
      setData(data.data.products);
      setPrice(data.data.totalCartPrice);
    })();
  });

  async function removeProduct(id) {
    let { data } = await deleteCart(id);
    setData(data.data.products);
    setCartNumber(data.numOfCartItems);
  }
  async function updateProduct(id, count) {
    if (count == 0) {
      deleteCart(id);
    } else {
      let { data } = await updateCart(id, count);
      setData(data.data.products);
      setCartNumber(data.numOfCartItems);
    }
  }

  async function removeProduct(id) {
    let { data } = await deleteCart(id);
    setData(data.data.products);
    setCartNumber(data.numOfCartItems);
  }


  return (
    <div>
      { data == 0 ?
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
    <div className="container nav-m">
        <h2 className="my-5 ps-5">Shopping Cart</h2>
        <div className="row">
          <div className="col-md-11 shadow p-5 m-auto">
          <div className="d-flex justify-content-between">
          <p className="fw-bold fs-4">
              <span className="text-success me-2 fw-bold fs-3">
                Total Price:
              </span>
              {cartPrice}Egp
            </p>
          <Link to="/checkout">
          <button className="btn btn-success text-end">Online Payment</button>
          </Link>
        </div>
        <p className="text-success fs-4 fw-bold">Total items in cart : {cartNumber}</p>
            {data.map((product) => {
              return (
                <div
                  className="row border-bottom align-items-center"
                  key={product._id}
                >
                  <div className="col-md-2 py-5">
                    <img
                      src={product.product.imageCover}
                      alt=""
                      className="w-75"
                    />
                  </div>
                  <div className="col-md-10 pb-3">
                    <h5>{product.product.title}</h5>
                    <p>{product.price}Egp</p>

                    <div className="d-flex justify-content-between align-items-baseline">
                      <button
                        onClick={() => {
                          removeProduct(product.product._id);
                        }}
                        className="btn btn-outline-danger"
                      >
                        <i className="fa-regular fa-trash-can me-2"></i>Remove
                      </button>
                      <div>
                        <button
                          onClick={() => {
                            updateProduct(
                              product.product._id,
                              product.count + 1
                            );
                          }}
                          className="btn btn-outline-success"
                        >
                          +
                        </button>
                        <span className="mx-2">{product.count}</span>
                        <button
                          onClick={() => {
                            updateProduct(
                              product.product._id,
                              product.count - 1
                            );
                          }}
                          className="btn btn-outline-success"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>}
    </div>
  );
}
