import React from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ShopPage from '../ShopPage';

import SalePoster from "../../assets/saleposter.webp";

const SalePage:React.FC = () => {
  const { isLoading, error, data: SalePageData} = useQuery(["SalePage_Data"], () =>
  axios.get(`http://127.0.0.1:8000/shop/Sale/`, {
    })
    .then((response) => response.data)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error;

  console.log("SalePageData",SalePageData)

  return (
    <div>
      <ShopPage productData={SalePageData} mainImage={SalePoster} pageName={"Sale"} />
    </div>
  )
}

export default SalePage