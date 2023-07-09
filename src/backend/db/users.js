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
    image: null,
    username: "adarshbalika",
    password: "adarshbalika123",
    createdAt: yesterdayDate(),
    updatedAt: yesterdayDate(),
  },
  {
    _id: uuid(),
    id: "USER2",
    image: null,
    username: "ankita",
    password: "ankita123",
    createdAt: yesterdayDate(),
    updatedAt: yesterdayDate(),
  },
];
