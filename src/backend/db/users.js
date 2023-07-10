import { v4 as uuid } from "uuid";
import { yesterdayDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    id: "USER1",
    image:
      "https://res.cloudinary.com/dcu6sympq/image/upload/v1688928123/socially/Users/yi5vwuggaa5wpgt5qd1z.png",
    username: "adarshbalika",
    password: "adarshbalika123",
    bio: "Be yourself!",
    profile_link: "https://ankita-dev.netlify.app/",
    createdAt: yesterdayDate(),
    updatedAt: yesterdayDate(),
  },
  {
    _id: uuid(),
    id: "USER2",
    image:
      "https://res.cloudinary.com/dcu6sympq/image/upload/v1688928219/socially/Users/lnfx9m1yioj67nucxtpp.webp",
    username: "Raj",
    password: "Raj123",
    bio: "",
    profile_link: "",
    createdAt: yesterdayDate(),
    updatedAt: yesterdayDate(),
  },
];
