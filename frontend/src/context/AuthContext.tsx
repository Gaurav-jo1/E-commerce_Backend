import React, { useState, useEffect, createContext } from "react";

import axios from "axios";

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
      .post("http://127.0.0.1:8000/user_login/api/token/refresh/", {
        refresh: authTokens.refresh,
      })
      .then(function (response) {
        setAuthTokens(response.data);
        console.log(response.data)
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        setLoading(true);
      })
      .catch(function (error) {
        console.log(error);
        callLogout();
      });
  }

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
      value={{ authTokens, setAuthTokens, loading, setLoading, callLogout }}
    >
      {loading ? children : null}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
