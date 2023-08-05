import React, { createContext, useState } from "react";

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

  // console.log("AuthContext",authTokens)

  return (
    <AuthContext.Provider
      value={{ authTokens, setAuthTokens, loading, setLoading, callLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
