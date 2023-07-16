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

  // NavBar Navigation
  navValue: string;
  setNavValue: React.Dispatch<React.SetStateAction<string>>;
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

  
  // NavBar Navigation
  const [navValue, setNavValue] = useState<string>("New & Featured");
  console.log(navValue)

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
        navValue,
        setUserEmail,
        setUserCode,
        setUserId,
        setPassChanged,
        setLoginOpen,
        setSignupOpen,
        setForgotOpen,
        setEmailCode,
        setNewPassword,
        setNavValue,
      }}
    >
      {children}
    </GlobalValue.Provider>
  );
};

export default GlobalProvider;
