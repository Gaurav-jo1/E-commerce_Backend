import React, { createContext, useState } from "react";

interface CurrentVarContextType {
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  userCode: string;
  setUserCode: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  passChanged: boolean;
  setPassChanged: React.Dispatch<React.SetStateAction<boolean>>;
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
  return (
    <GlobalValue.Provider
      value={{ userEmail, userCode, userId, setUserEmail,
        setUserCode, setUserId, passChanged, setPassChanged}} >
      {children}
    </GlobalValue.Provider>
  );
};

export default GlobalProvider;
