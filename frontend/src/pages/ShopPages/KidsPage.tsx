import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ShopPage from "../ShopPage";
import KidsPoster from "../../assets/childposter.webp";
import LoadingSpinner from "../../components/LoadingSpinner";

const KidsPage: React.FC = () => {
  const {
    isLoading,
    error,
    data: KidsPageData,
  } = useQuery(["KidsPage_Data"], () =>
    axios
      .get(`https://shoppy-ly6w.onrender.com/shop/Kids/`, {})
      .then((response) => response.data)
  );

  if (isLoading) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error;

  return (
    <ShopPage
      productData={KidsPageData}
      mainImage={KidsPoster}
      pageName={"Kids"}
      imgHash="ffQ+_^j[j[oebHs:~oj[ayWVjZR+I[j[ayayayj[R4ayj[oLj[oe%hjsayWXf6WC"
    />
  );
};

export default KidsPage;
