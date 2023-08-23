import React, { useEffect,useContext} from 'react'
import { AuthPages } from '../../components/Commonfun'
import Navbar from '../../components/Navbar'
import NavPage from '../../components/NavPage'
import { GlobalValue } from '../../context/GlobalValue'

import axios from 'axios'

// interface SearchPageProps {
//   user_search: string;
// }

const SearchPage:React.FC = () => {
  const { setLoginOpen, setSignupOpen } = useContext(GlobalValue);

  const {userProSearch} = useContext(GlobalValue)

  useEffect(() => {
    if (userProSearch != "" ){
      axios
      .post("http://127.0.0.1:8000/product_search/search/", {
        user_search: userProSearch,
      })
      .then(function (response) {
        console.log("User Product Search",JSON.parse(response.data));
      })
      .catch(function (error) {
        console.log(error)
      });
    }

  }, [userProSearch]);

  return (
    <div className='search_page_container'>
        <AuthPages />
        <Navbar setSignupOpen={setSignupOpen} setLoginOpen={setLoginOpen} />
        <NavPage />
        <h1>Search Page</h1>
    </div>
  )
}

export default SearchPage