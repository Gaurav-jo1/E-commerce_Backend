import { ShopImages, CardImages, SectionImages } from "./CommonInterfaces";

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
    property2: "Bohemian Sun Crochet Knit Halter Mini Dress",
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
