import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ShopPage from "../ShopPage";
import WomensPoster from "../../assets/womenposter.webp";

const WomenPage: React.FC = () => {
  const {
    isLoading,
    error,
    data: WomenPageData,
  } = useQuery(["WomenPage_Data"], () =>
    axios
      .get(`http://127.0.0.1:8000/shop/Women/`, {})
      .then((response) => response.data)
  );

  if (isLoading) return "";

  if (error) return "An error has occurred: " + error;

  return (
    <ShopPage
      productData={WomenPageData}
      mainImage={WomensPoster}
      pageName={"Women"}
      imgHash="fCDwjY%~1-WVv|E3AIPV?aUuIB^i%2Z~vz%2KQJUtkNxs=xDE1afV_Rkr;s9R-s."
    />
  );
};

export default WomenPage;
