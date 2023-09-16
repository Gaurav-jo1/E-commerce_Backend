import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import { Product } from "../common/CommonInterfaces";
import { queryClient } from "../main";
interface CurrentVarContextType {
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  userCode: string;
  setUserCode: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;

  // Login and Signup Interface
  loginOpen: boolean;
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
  signupOpen: boolean;
  setSignupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  forgotOpen: boolean;
  setForgotOpen: React.Dispatch<React.SetStateAction<boolean>>;
  emailCode: boolean;
  setEmailCode: React.Dispatch<React.SetStateAction<boolean>>;
  newPassword: boolean;
  setNewPassword: React.Dispatch<React.SetStateAction<boolean>>;
  passChanged: boolean;
  setPassChanged: React.Dispatch<React.SetStateAction<boolean>>;

  // User Product Search
  userProSearch: string | undefined;
  setUserProSearch: React.Dispatch<React.SetStateAction<string | undefined>>;

  // Mobile Navigation Bar
  navOptions: boolean;
  setNavOptions: React.Dispatch<React.SetStateAction<boolean>>;

  // User Cart
  CartPageData: Product[] | undefined;

  // Add products
  addProductToCart: (product_id: number)  => void;
}

export const GlobalValue = createContext<CurrentVarContextType>(
  {} as CurrentVarContextType
);

type GlobalProvider = {
  children: React.ReactNode;
};

const GlobalProvider: React.FC<GlobalProvider> = ({ children }) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userCode, setUserCode] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [passChanged, setPassChanged] = useState<boolean>(false);

  // Login and Signup UseStates
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [forgotOpen, setForgotOpen] = useState<boolean>(false);
  const [emailCode, setEmailCode] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<boolean>(false);

  // User Product Search
  const [userProSearch, setUserProSearch] = useState<string | undefined>(() =>
    localStorage.getItem("userProSearch")
      ? localStorage.getItem("userProSearch") || ""
      : undefined
  );

  // Mobile Navigation Bar
  const [navOptions, setNavOptions] = useState<boolean>(false);

  // User Cart
  const { authTokens } = useContext(AuthContext);

  const { data: CartPageData } = useQuery<Product[] | undefined>(
    ["user_cart"],
    () =>
      axios
        .get("https://shoppy-ly6w.onrender.com/cart/products/get/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
        })
        .then((response) => {
          if (response.data) {
            const ids = response.data.map((item: Product) => item.id);
            localStorage.setItem("User_products", JSON.stringify(ids));
          }

          return response.data;
        }),
    { enabled: !!authTokens }
  );

  
  const addProductToCart = (product_id: number) => {
    if (authTokens) {
      axios
        .post(
          "https://shoppy-ly6w.onrender.com/cart/products/add/",
          {
            product_id: product_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(authTokens.access),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          queryClient.invalidateQueries(["user_cart"]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setLoginOpen(true);
    }
  };


  return (
    <GlobalValue.Provider
      value={{
        userEmail,
        userCode,
        userId,
        passChanged,
        loginOpen,
        signupOpen,
        forgotOpen,
        emailCode,
        newPassword,
        setUserEmail,
        setUserCode,
        setUserId,
        setPassChanged,
        setLoginOpen,
        setSignupOpen,
        setForgotOpen,
        setEmailCode,
        setNewPassword,

        userProSearch,
        setUserProSearch,

        navOptions,
        setNavOptions,

        CartPageData,
        addProductToCart
      }}
    >
      {children}
    </GlobalValue.Provider>
  );
};

export default GlobalProvider;
