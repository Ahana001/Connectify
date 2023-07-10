import { v4 as uuid } from "uuid";
import { beforeOneYearDate, yesterdayDate } from "../utils/authUtils";
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
    username: "Oliver",
    password: "Oliver123",
    bio: "",
    profile_link: "",
    createdAt: yesterdayDate(),
    updatedAt: yesterdayDate(),
  },
  {
    _id: uuid(),
    id: "USER3",
    image:
      "https://res.cloudinary.com/dcu6sympq/image/upload/v1688936785/socially/Users/ut6byrpuvtvcnhjfkjvo.avif",
    username: "Sophia",
    password: "Sophia123",
    bio: "Exploring the world one step at a time.",
    profile_link: "",
    createdAt: yesterdayDate(),
    updatedAt: yesterdayDate(),
  },
  {
    _id: uuid(),
    id: "USER4",
    image:
      "https://res.cloudinary.com/dcu6sympq/image/upload/v1688936516/socially/Users/trfucapbumhuir3gq251.png",
    username: "Harper",
    password: "Harper123",
    bio: "Adventure seeker with a camera in hand, capturing moments that ignite the soul.",
    profile_link: "",
    createdAt: yesterdayDate(),
    updatedAt: yesterdayDate(),
  },
  {
    _id: uuid(),
    id: "USER5",
    image:
      "https://res.cloudinary.com/dcu6sympq/image/upload/v1688938283/socially/Users/r9unjokrlotonrdtwmgg.png",
    username: "Amelia",
    password: "Amelia123",
    bio: "",
    profile_link: "",
    createdAt: beforeOneYearDate(),
    updatedAt: beforeOneYearDate(),
  },
  {
    _id: uuid(),
    id: "USER6",
    image:
      "https://res.cloudinary.com/dcu6sympq/image/upload/v1688936516/socially/Users/trfucapbumhuir3gq251.png",
    username: "Alexandra",
    password: "Alexandra123",
    bio: "Embrace the chaos and find your own path",
    profile_link: "",
    createdAt: beforeOneYearDate(),
    updatedAt: beforeOneYearDate(),
  },
];
