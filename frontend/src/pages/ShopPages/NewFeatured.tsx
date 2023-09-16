import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ShopPage from "../ShopPage";
import NewFeature from "../../assets/newfeature.webp";
import LoadingSpinner from "../../components/LoadingSpinner";

const NewFeatured: React.FC = () => {
  const {
    isLoading,
    error,
    data: NewFeaturedData,
  } = useQuery(["NewFeatured_Data"], () =>
    axios
      .get(`https://shoppy-ly6w.onrender.com/shop/New & Featured/`, {})
      .then((response) => response.data)
  );

  if (isLoading) return <LoadingSpinner/>;

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
