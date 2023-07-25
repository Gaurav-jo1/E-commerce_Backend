import React from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ShopPage from '../ShopPage';
import WomensPoster from "../../assets/womenposter.webp";

const WomenPage:React.FC = () => {
  const { isLoading, error, data:WomenPageData} = useQuery(["WomenPage_Data"], () =>
  axios.get(`http://127.0.0.1:8000/shop/Women/`, {
    })
    .then((response) => response.data)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error;

  console.log("WomenPageData",WomenPageData)

  return (
    <div>
      <ShopPage productData={WomenPageData} mainImage={WomensPoster} pageName={"Women"}/>
    </div>
  )
}

export default WomenPage