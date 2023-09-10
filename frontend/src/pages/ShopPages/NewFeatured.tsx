import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ShopPage from "../ShopPage";
import NewFeature from "../../assets/newfeature.webp";

const NewFeatured: React.FC = () => {
  const {
    isLoading,
    error,
    data: NewFeaturedData,
  } = useQuery(["NewFeatured_Data"], () =>
    axios
      .get(`http://127.0.0.1:8000/shop/New & Featured/`, {})
      .then((response) => response.data)
  );

  if (isLoading) return "";

  if (error) return "An error has occurred: " + error;

  return (
    <ShopPage
      productData={NewFeaturedData}
      mainImage={NewFeature}
      pageName={"New & Featured"}
      imgHash="fgN13@OeoMWVlSEWx@Roa{odM|oytQt7oJaKaLe.SPS5WXayWVWVoff6j@ofjFoJ"
    />
  );
};

export default NewFeatured;
