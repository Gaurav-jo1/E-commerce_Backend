import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import { Product } from "../common/CommonInterfaces";

type SetBooleanStateAction = React.Dispatch<React.SetStateAction<boolean>>;

interface CurrentVarContextType {
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  userCode: string;
  setUserCode: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;

  // Login and Signup Interface
  loginOpen: boolean;
  setLoginOpen: SetBooleanStateAction;
  signupOpen: boolean;
  setSignupOpen: SetBooleanStateAction;
  forgotOpen: boolean;
  setForgotOpen: SetBooleanStateAction;
  emailCode: boolean;
  setEmailCode: SetBooleanStateAction;
  newPassword: boolean;
  setNewPassword: SetBooleanStateAction;
  passChanged: boolean;
  setPassChanged: SetBooleanStateAction;

  // User Product Search
  userProSearch: string | undefined;
  setUserProSearch: React.Dispatch<React.SetStateAction<string | undefined>>;

  // Mobile Navigation Bar
  navOptions: boolean;
  setNavOptions: SetBooleanStateAction;

  // User Cart
  CartPageData: Product[]
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
  localStorage.getItem("userProSearch") ? localStorage.getItem("userProSearch") || "" : undefined);

  // Mobile Navigation Bar
  const [navOptions ,setNavOptions] = useState<boolean>(false);

  // User Cart
  const { authTokens } = useContext(AuthContext);

  const isAuthenticated = authTokens && !!authTokens.access;

  const { data: CartPageData } = useQuery(
    ["user_cart"],
    () =>
      axios
        .get("http://127.0.0.1:8000/cart/products/get/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
        })
        .then((response) => response.data),
    { enabled: isAuthenticated }
  );

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
      }}
    >
      {children}
    </GlobalValue.Provider>
  );
};

export default GlobalProvider;
