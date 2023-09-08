type SetBooleanStateAction = React.Dispatch<React.SetStateAction<boolean>>;

// Sign up Page
export interface SignComponentProps {
  setSignupOpen: SetBooleanStateAction;
  setLoginOpen: SetBooleanStateAction;
}

// Login Page
export interface LoginComponentProps extends SignComponentProps {
  setForgotOpen: SetBooleanStateAction;
}

// Forgot Component
export interface ForgotPassComponentProps {
  setForgotOpen: SetBooleanStateAction;
  setLoginOpen: SetBooleanStateAction;
  setEmailCode: SetBooleanStateAction;
}

// Email Verification Component

export interface EmailCodeComponentProps {
  setNewPassword: SetBooleanStateAction;
  setEmailCode: SetBooleanStateAction;
}

// New Password Component
export interface NewPassComponentProps {
  setNewPassword: SetBooleanStateAction;
  setLoginOpen: SetBooleanStateAction;
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
    property3: string;
  };
}

export interface SectionImages {
  [section: string]: {
    property0: string;
    property1: string;
    property2: string;
  };
}

// Auth Components
export interface AuthContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// ShopPage
export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
}

interface ShopPageData {
  id: number;
  position_id: number;
  product: Product;
}
export interface ShopPageProps {
  productData: ShopPageData[];
  pageName: string;
  mainImage: string;
  imgHash: string;
}

export interface MyProductInterface {
  id: number;
  name: string;
  image: string;
}

export interface MyUserInterface {
  id: number;
  user: string;
  picture: string;
}