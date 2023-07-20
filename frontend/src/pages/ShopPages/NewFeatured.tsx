import React from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ShopPage from '../ShopPage';
import NewFeature from "../../assets/NewFeature.png";



const NewFeatured:React.FC = () => {
  const { isLoading, error, data:NewFeaturedData} = useQuery(["NewFeatured_Data"], () =>
  axios.get(`http://127.0.0.1:8000/shop/New & Featured/`, {
    })
    .then((response) => response.data)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error;

  console.log("NewFeaturedData",NewFeaturedData)

  return (
    <div>
      <ShopPage productData={NewFeaturedData} MainImage={NewFeature} PageName={"New & Featured"}/>
    </div>
  )
}

export default NewFeatured