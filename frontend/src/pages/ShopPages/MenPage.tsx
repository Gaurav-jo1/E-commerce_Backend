import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ShopPage from "../ShopPage";
import MensPoster from "../../assets/mensposter.webp";

const MenPage: React.FC = () => {
  const {
    isLoading,
    error,
    data: MenPageData,
  } = useQuery(["MenPage_Data"], () =>
    axios
      .get(`http://127.0.0.1:8000/shop/Men/`, {})
      .then((response) => response.data)
  );

  if (isLoading) return "";

  if (error) return "An error has occurred: " + error;

  return (
    <div>
      <ShopPage
        productData={MenPageData}
        mainImage={MensPoster}
        pageName={"Mens"}
        imgHash="fHF~dPpyx]9ZPCcZ9|xGWCkWRkWB0h%2Ipwbr;xC-UT0WqxCs:kDn4Ipe:xYfkae"
      />
    </div>
  );
};

export default MenPage;
