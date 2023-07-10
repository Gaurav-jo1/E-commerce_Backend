// Sign up Page
export interface SignComponentProps {
  setSignupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Login Page
export interface LoginComponentProps extends SignComponentProps {
  setForgotOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Forgot Component
export interface ForgotPassComponentProps {
  setForgotOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailCode: React.Dispatch<React.SetStateAction<boolean>>;
}

// Email Verification Component

export interface EmailCodeComponentProps {
  setNewPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailCode: React.Dispatch<React.SetStateAction<boolean>>;
}

// New Password Component
export interface NewPassComponentProps {
  setNewPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


// Main Page Interface
export interface ShopImages {
  [key: string]: {
    property1: string;
    property2: string;
    property3: number;
    property4: string;
  };
}

export interface CardImages {
  [card: string]: {
    property1: string;
    property2: string;
    property3: string;
    property4: string;
  };
}

export interface SectionImages {
  [section: string]: {
    property1: string;
    property2: string;
  };
}

// NavPage Interface