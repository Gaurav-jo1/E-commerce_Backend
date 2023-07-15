import {
  ShopImages,
  CardImages,
  SectionImages,
  TypeDictionary,
} from "./CommonInterfaces";

import MainImage1 from "../assets/11.webp";
import MainImage2 from "../assets/41.webp";
import MainImage3 from "../assets/21.webp";
import MainImage4 from "../assets/31.webp";

import HoverImage1 from "../assets/12.webp";
import HoverImage2 from "../assets/42.webp";
import HoverImage3 from "../assets/22.webp";
import HoverImage4 from "../assets/32.webp";

import ImageCard1 from "../assets/card1.webp";
import ImageCard2 from "../assets/card2.webp";

import Mens from "../assets/men.webp";
import Women from "../assets/women.webp";
import Kids from "../assets/kid.webp";

export const myLists: ShopImages = {
  keys1: {
    property1: MainImage1,
    property2: "Sun Crochet Knit Halter Mini Dress",
    property3: 52.0,
    property4: HoverImage1,
  },
  keys2: {
    property1: MainImage2,
    property2: "Iconic Edge Ribbed Henley Cropped Tank",
    property3: 29.99,
    property4: HoverImage2,
  },
  keys3: {
    property1: MainImage3,
    property2: "Better Than Classic Distressed Denim Shorts",
    property3: 38.0,
    property4: HoverImage3,
  },
  keys4: {
    property1: MainImage4,
    property2: "Bringing The Vibes Distressed Denim Shorts",
    property3: 38.0,
    property4: HoverImage4,
  },
};

export const myCards: CardImages = {
  card1: {
    property1: ImageCard1,
    property2: "App Drops",
    property3: "Nike Dunk Low",
    property4: "Get it First",
  },
  card2: {
    property1: ImageCard2,
    property2: "Trending: That 90's vibe with the Nike Air Max 90 Futura",
    property3: "Stylin' Up With Wasu",
    property4: "Read Now",
  },
};

export const mySections: SectionImages = {
  mens: {
    property1: Mens,
    property2: "Men's",
  },
  Women: {
    property1: Women,
    property2: "Women's",
  },
  Kid: {
    property1: Kids,
    property2: "Kid's",
  },
};

export const newFeatureArray: TypeDictionary = {
  NewFeatured: [
    "New Arrivals",
    "Latest Shoes",
    "Latest Clothing",
    "Get 'Em in SNKRS",
    "Exclusives",
    "Bestsellers",
    "Member Exclusive",
    "Summer Essentials",
  ],

  ShopIcons: [
    "Air Force 1",
    "Air Jordan 1",
    "Air Max",
    "Dunk",
    "Blazer",
    "Pegasus",
  ],

  NewForMen: ["Shoes", "Clothing", "Accessories", "Shop All New"],

  NewForWomen: ["Shoes", "Clothing", "Accessories", "Shop All New"],

  NewForKids: ["Shoes", "Clothing", "Accessories", "Shop All New"],
};

export const mensArray: TypeDictionary = {
  Featured: [
    "New Releases",
    "Bestsellers",
    "Member Exclusive",
    "Jordan",
    "Football Club Kits",
    "Customise with Shoppy",
    "Last Sizes Available",
    "Sale",

    "Running Shoe Finder",
    "Sustainable Materials",
  ],
  Shoes: [
    "All Shoes",
    "Newest Sneakers",
    "Lifestyle",
    "Jordan",
    "Running",
    "Basketball",
    "Football",
    "Gym and Training",
    "Sandals and Slides",
    "Last Sizes Available",
    "Customise with Shoppy",
  ],
  Clothing: [
    "All Clothing",
    "Tops and T-Shirts",
    "Shorts",
    "Pants and Leggings",
    "Hoodies and Sweatshirts",
    "Jackets and Gilets",
    "Jerseys and Kits",
    "Jordan",
  ],
  ShopBySport: [
    "Running",
    "Football",
    "Basketball",
    "Gym and Training Yoga",
    "Skateboarding",
    "Tennis",
  ],
};

export const womensArray: TypeDictionary = {
  Featured: [
    "New Releases",
    "Bestsellers",
    "Member Exclusive",
    "Jordan",
    "Bra and Legging Duos",
    "Last Sizes Available",
    "Sale Find Your Feel - Nike",
    "Leggings",
    "Running Shoe Finder",
    "Sustainable Materials",
  ],
  Shoes: [
    "All Shoes",
    "Newest Sneakers",
    "Lifestyle",
    "Jordan",
    "Running",
    "Gym and Training",
    "Sandals and Slides",
    "Basketball",
    "Football",
    "Last Sizes Available",
  ],
  Clothing: [
    "All Clothing",
    "Performance Essentials",
    "Tops and T-Shirts",
    "Sports Bras",
    "Pants and Leggings",
    "Shorts",
    "Hoodies and Sweatshirts",
    "Jackets and Gilets",
    "Skirts and Dresses",
    "Modest Wear",
    "Nike Maternity",
    "Plus Size",
  ],
  ShopBySport: [
    "Yoga",
    "Running",
    "Gym and Training",
    "Basketball",
    "Tennis",
    "Golf",
    "Football",
    "Skateboarding",
  ],
};

export const kidsArray: TypeDictionary = {
  Featured: [
    "New Releases",
    "Newest Sneakers",
    "Bestsellers",
    "Member Exclusive",
    "Jordan",
    "Bags and Backpacks",
    "Last Sizes Available",
    "Sale",
  ],
  BoysShoes: [
    "All Shoes",
    "Older Boys (7 - 14 years)",
    "Younger Boys (4-7 years)",
    "Babies and Toddlers (0 - 4 years)",
    "Lifestyle",
    "Jordan",
    "Running",
    "Basketball",
    "Football",
    "Sandals and Slides",
  ],
  GirlsShoes: [
    "All Shoes Older Girls (7 - 14 years)",
    "Younger Girls (4 - 7 years)",
    "Babies and Toddlers (0- 4 years)",
    "Lifestyle",
    "Jordan",
    "Running",
    "Basketball",
    "Football",
    "Sandal's and Slides",
  ],
  AccessoriesAndEquipment: [
    "All Accessories and Equipment",
    "Bags and Backpacks",
    "Socks",
    "Hats and Headwear",
  ],
};

export const saleArray: TypeDictionary = {
  Featured: ["Shop All Sale"],
  MensSale: ["Shoes", "Clothing"],
  WomensSale: ["Shoes", "Clothing"],
  KidsSale: ["Shoes", "Clothing"],
};
