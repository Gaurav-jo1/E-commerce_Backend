import React, { createContext, useState } from "react";

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

  // Profile Page
  profilePage: boolean;
  setProfilePage: SetBooleanStateAction;
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

  // Profile Page
  const [profilePage ,setProfilePage] = useState<boolean>(false)

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

        profilePage,
        setProfilePage
      }}
    >
      {children}
    </GlobalValue.Provider>
  );
};

export default GlobalProvider;
