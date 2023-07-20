import React from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ShopPage from '../ShopPage';
import KidsPoster from "../../assets/childPoster.png";


const KidsPage:React.FC = () => {
  const { isLoading, error, data: KidsPageData} = useQuery(["KidsPage_Data"], () =>
  axios.get(`http://127.0.0.1:8000/shop/Kids/`, {
    })
    .then((response) => response.data)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error;

  console.log("KidsPageData",KidsPageData)

  return (
    <div>
      <ShopPage productData={KidsPageData} MainImage={KidsPoster}  PageName={"Kids"}/>
    </div>
  )
}

export default KidsPage