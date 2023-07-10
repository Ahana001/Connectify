import { v4 as uuid } from "uuid";
import { before30MinDate, yesterdayDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    id: "POST1",
    picture_url:
      "https://res.cloudinary.com/dcu6sympq/image/upload/v1687887108/socially/inbkdpk3jyydj9bhb2qf.webp",
    content:
      "This easy smoothie recipe offers more than just good sips. Here are a few watermelon smoothie benefits: Because of the high water content in watermelon, this smoothie is exceptionally hydrating.Watermelon is packed with Vitamin-C, Vitamin-A, and numerous antioxidants.By adding strawberries to this smoothie, you’re also getting oodles of added antioxidants and fiber.",
    author_username: "adarshbalika",
    createdAt: yesterdayDate(),
    updatedAt: yesterdayDate(),
  },
  {
    _id: uuid(),
    id: "POST2",
    picture_url:
      "https://res.cloudinary.com/dcu6sympq/image/upload/v1688795309/socially/marble-cookies-recipe1221FOO-bd49c4f746244480a79186666767a006_dynasg.webp",
    content:
      "These stunning marbled cookies are easier to make than you might think. All that's needed to achieve the look is to separate part of the dough and add just a few drops of food coloring gel. Then, a simple stacking technique and some kneading results in a rich cookie dough that's marbled with color throughout. Freezing the cookies before baking is key to avoid spreading, so be patient. If you'd like, have fun with different colors of sanding sugar for the sparkle element or experiment with other colors for the marbled look.",
    author_username: "Raj",
    createdAt: before30MinDate(),
    updatedAt: before30MinDate(),
  },
];
