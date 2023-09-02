import { ShopImages, CardImages, SectionImages,} from "./CommonInterfaces";

import MainImage1 from "../assets/11.webp";
import MainImage2 from "../assets/41.webp";
import MainImage3 from "../assets/21.webp";
import MainImage4 from "../assets/31.webp";

import HoverImage1 from "../assets/12.webp";
import HoverImage2 from "../assets/42.webp";
import HoverImage3 from "../assets/22.webp";
import HoverImage4 from "../assets/32.webp";

import ImageCard1 from "../assets/card1.webp";
import ImageCard2 from "../assets/card111.webp";

import Men from "../assets/men.webp";
import Women from "../assets/women.webp";
import Kids from "../assets/kids.webp";

export const myLists: ShopImages = {
  keys1: {
    property1: MainImage1,
    property2: "Sleevesless High-Neck Dress",
    property3: 52.0,
    property4: HoverImage1,
  },
  keys2: {
    property1: MainImage2,
    property2: "Button-Up Tank Top",
    property3: 29.99,
    property4: HoverImage2,
  },
  keys3: {
    property1: MainImage3,
    property2: "Light Green Ruffle Dress",
    property3: 38.0,
    property4: HoverImage3,
  },
  keys4: {
    property1: MainImage4,
    property2: "Blue Tiered Midi Skirt",
    property3: 38.0,
    property4: HoverImage4,
  },
};

export const myCards: CardImages = {
  card1: {
    property1: ImageCard1,
    property3: "LifeStyle Footwear",
  },
  card2: {
    property1: ImageCard2,
    property3: "Shoppy Dunk Low",
  },
};

export const mySections: SectionImages = {
  Men: {
    property0: "Men",
    property1: Men,
    property2: "Men",
  },
  Women: {
    property0: "Women",
    property1: Women,
    property2: "Women",
  },
  Kids: {
    property0: "Kid",
    property1: Kids,
    property2: "Kid",
  },
};

