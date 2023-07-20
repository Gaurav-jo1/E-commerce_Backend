import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { AuthPages } from "../components/Commonfun";
import Navbar from "../components/Navbar";
import NavPage from "../components/NavPage";
import { GlobalValue } from "../context/GlobalValue";

const CartPage:React.FC = () => {
  const { setLoginOpen, setSignupOpen } = useContext(GlobalValue);
  return (
    <div>
      <AuthPages />
      <Navbar setSignupOpen={setSignupOpen} setLoginOpen={setLoginOpen} />
      <NavPage />
      <h1>CartPage</h1>
      <Link to="/"> Homepage </Link>
    </div>
  )
}

export default CartPage;