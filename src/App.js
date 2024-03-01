import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
import Category from "./components/Category/Category";
import WishList from "./components/WishList/WishList";
import Cart from "./components/Cart/Cart";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Notfound from "./components/Notfound/Notfound";
import UserContextProvider from "./components/context/tokenContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Details from "./components/Details/Details";
import CartContextProvider from "./components/context/cartContext";
import { ToastContainer, toast } from 'react-toastify';
import Checkout from "./components/checkout/checkout";
import Allorders from "./components/allorders/allorders";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";




const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    errorElement:<Notfound/>,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "product",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList/>
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Allorders/>
          </ProtectedRoute>
        ),
      },
      {
        path: "category",
        element: (
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout/>
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "details/:id",
        element: (
          <ProtectedRoute>
            <Details />
          </ProtectedRoute>
        ),
      },
      { path: "signin", element: <Signin /> },
      { path: "signup", element: <Signup /> },
      { path: "forgetpassword", element: <ForgetPassword/> },
      { path: "resetpassword", element: <ResetPassword/> },
    ],
  },
]);

function App() {
  return (
    <CartContextProvider>
      <UserContextProvider>
        <RouterProvider router={router} />
        <ToastContainer theme="colored"/>
      </UserContextProvider>
    </CartContextProvider>
  );
}

export default App;
