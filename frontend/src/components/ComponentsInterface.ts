export interface SignComponentProps {
  setSignupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface LoginComponentProps extends SignComponentProps {
  // additional properties specific to LoginComponentProps
  setForgotOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NewPassComponentProps {
  setNewPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setForgotOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
