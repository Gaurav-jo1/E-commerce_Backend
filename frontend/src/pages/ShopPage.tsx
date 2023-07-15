import React, {useContext} from 'react'
import Navbar from '../components/Navbar'
import NavPage from '../components/NavPage'
import { GlobalValue } from '../context/GlobalValue'

// styling
import "../styles/ShopPage.scss"
const ShopPage:React.FC = () => {

  const {setSignupOpen, setLoginOpen} = useContext(GlobalValue)
  return (
    <div className='ShopPage_container'>
        <div className="ShopPage_navbar-container">
            <Navbar setSignupOpen={setSignupOpen} setLoginOpen={setLoginOpen}/>
        </div>
        <div className="ShopPage_navpage-container">
            <NavPage />
        </div>
        <h1>Shop Page</h1>
    </div>
  )
}

export default ShopPage