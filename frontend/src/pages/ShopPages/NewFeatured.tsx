import React from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ShopPage from '../ShopPage';
import NewFeature from "../../assets/newfeature.webp";
import LoadingSpinner from '../../components/LoadingSpinner';

const NewFeatured:React.FC = () => {
  const { isLoading, error, data:NewFeaturedData} = useQuery(["NewFeatured_Data"], () =>
  axios.get(`http://127.0.0.1:8000/shop/New & Featured/`, {
    })
    .then((response) => response.data)
  );

  if (isLoading) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error;

  return (
    <div>
      <ShopPage productData={NewFeaturedData} mainImage={NewFeature} pageName={"New & Featured"}/>
    </div>
  )
}

export default NewFeatured