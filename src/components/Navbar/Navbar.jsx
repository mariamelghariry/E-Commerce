import React, { useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/tokenContext";
import { cartContext } from "../context/cartContext";


export default function Navbar() {
  let {userToken,setToken} = useContext(userContext);
  let{cartNumber,getCart,setCartNumber} = useContext(cartContext)

  let navigate = useNavigate()

  function logout(){
    localStorage.removeItem('userToken');
    setToken(null);
    navigate ('/signin') 
  }

  useEffect(() => {
    (async () => {
      let { data } = await getCart();
      setCartNumber(data.numOfCartItems)
    })();
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top mb-5 z-index">
        <div className="container">
          <a className="navbar-brand" href="#">
            <i className="fa-solid fa-cart-shopping text-success fs-3"></i>
            <span className="fw-bold fs-3">FreshCart</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userToken !== null?
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="wishlist">
                WishList
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="product">
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="category">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="brands">
                Brands
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="Cart">
                <i className="fa-solid fa-shopping-cart text-success"></i>
                <span className="badge bg-success text-light">{cartNumber}</span>
              </Link>
            </li>
          </ul>
          :
          ''}
            
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              {userToken == null?
              <>
              <li>
                <Link className="nav-link" to="signup">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="signin">
                  Login
                </Link>
              </li>
              </>
              :""}
              {userToken !== null?
              <>
              
              <li onClick={()=>{logout()}} className="nav-item">
                <Link className="nav-link" to="#">
                  Logout
                </Link>
              </li>
              </>

              :''}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
