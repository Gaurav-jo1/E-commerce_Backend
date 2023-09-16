import React, { useState, useEffect, createContext } from "react";

import axios from "axios";
import { queryClient } from "../main";
import { AxiosResponse, AxiosError } from 'axios';

export type AccessTokensType = {
  access: string | undefined;
  refresh: string | undefined;
};

interface CurrentUserContextType {
  authTokens: AccessTokensType;
  setAuthTokens: React.Dispatch<React.SetStateAction<AccessTokensType>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  callLogout: () => void;
  handleDelete: (product_id: number)  => void;
}

export const AuthContext = createContext<CurrentUserContextType>(
  {} as CurrentUserContextType
);

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [authTokens, setAuthTokens] = useState<AccessTokensType>(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens") || "")
      : undefined
  );

  function callLogout() {
    setAuthTokens({ access: undefined, refresh: undefined });
    localStorage.removeItem("authTokens");
  }

  function updateAccess() {
    axios
      .post("https://shoppy-ly6w.onrender.com/user_login/api/token/refresh/", {
        refresh: authTokens.refresh,
      })
      .then((response: AxiosResponse) => {
        setAuthTokens(response.data);
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        setLoading(true);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        callLogout();
        setLoading(true);
      });
  }

  const handleDelete = (product_id: number): void => {
    axios
      .delete(`https://shoppy-ly6w.onrender.com/cart/products/delete/${product_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response: AxiosResponse) => {
        console.log(response);
        queryClient.invalidateQueries(["user_cart"]);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };


  useEffect(() => {
    if (authTokens && !loading) {
      updateAccess();
    }

    if (!authTokens) {
      setLoading(true);
    }

    const twentyMinutes = 1000 * 60 * 20;
    const interval = setInterval(() => {
      if (authTokens) {
        updateAccess();
      }
    }, twentyMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]); // eslint-disable-line

  return (
    <AuthContext.Provider
      value={{ authTokens, setAuthTokens, loading, setLoading, callLogout, handleDelete }}
    >
      {loading ? children : null}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
