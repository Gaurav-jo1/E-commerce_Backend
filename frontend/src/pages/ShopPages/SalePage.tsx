import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ShopPage from "../ShopPage";

import SalePoster from "../../assets/saleposter.webp";
import LoadingSpinner from "../../components/LoadingSpinner";

const SalePage: React.FC = () => {
  const {
    isLoading,
    error,
    data: SalePageData,
  } = useQuery(["SalePage_Data"], () =>
    axios
      .get(`https://shoppy-ly6w.onrender.com/shop/Sale/`, {})
      .then((response) => response.data)
  );

  if (isLoading) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error;

  return (
    <ShopPage
      productData={SalePageData}
      mainImage={SalePoster}
      pageName={"Sale"}
      imgHash="fBGS}*_40h~A-QEj-SM|tQt6E1-:bwjF%0M|R-xaOZafs8NGxuRjkWWBV@kCW=WB"
    />
  );
};

export default SalePage;
