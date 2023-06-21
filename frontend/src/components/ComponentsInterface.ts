export interface SignComponentProps {
  setSignupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface LoginComponentProps extends SignComponentProps {
  setForgotOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ForgotPassComponentProps {
  setForgotOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRecoverCode: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface RecoverCodePassComponentProps {
  setNewPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setForgotOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

