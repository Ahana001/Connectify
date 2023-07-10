import { v4 as uuid } from "uuid";
import {
  before30MinDate,
  beforeOneYearDate,
  yesterdayDate,
} from "../utils/authUtils";

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
    author_username: "Oliver",
    createdAt: before30MinDate(),
    updatedAt: before30MinDate(),
  },
  {
    _id: uuid(),
    id: "POST3",
    picture_url:
      "https://res.cloudinary.com/dcu6sympq/image/upload/v1688962462/socially/r0pj8fquub014mcabj8t.jpg",
    content:
      "Yes, pets are emotionally attached to their owners. Their love is true and unconditional. The most surprising thing is pets will always love their owners back even if they are mean to them. By love, we mean a deep attachment or connection we have with our pets.",
    author_username: "Sophia",
    createdAt: before30MinDate(),
    updatedAt: before30MinDate(),
  },
  {
    _id: uuid(),
    id: "POST4",
    picture_url:
      "https://res.cloudinary.com/dcu6sympq/image/upload/v1688962797/socially/zyqksrwdtyjqouf4v51d.jpg",
    content:
      "It's even better to arrive a little early. This way you can calmly find your seat and prepare any documents or devices you'll need. This is especially true if you'll be doing any form of presentation during the meeting. This is even more important for virtual meetings.",
    author_username: "Sophia",
    createdAt: yesterdayDate(),
    updatedAt: yesterdayDate(),
  },
  {
    _id: uuid(),
    id: "POST5",
    picture_url:
      "https://res.cloudinary.com/dcu6sympq/image/upload/v1688963268/socially/hbibmqdn1lj1zwoycsek.webp",
    content:
      "Welcome to Wildwood Peak, a breathtaking adventure destination nestled in the heart of untouched wilderness. Prepare to embark on an exhilarating journey through rugged terrains, dense forests, and awe-inspiring landscapes. Whether you're a thrill-seeker or a nature enthusiast, Wildwood Peak offers an array of heart-pumping activities to satisfy your craving for adventure.",
    author_username: "Harper",
    createdAt: before30MinDate(),
    updatedAt: before30MinDate(),
  },
  {
    _id: uuid(),
    id: "POST6",
    picture_url:
      "https://res.cloudinary.com/dcu6sympq/image/upload/v1688963585/socially/wut9mi9gaqyp4ygwc56h.jpg",
    content:
      "Watermelon is made up of mostly—you guess it—water, about 90 percent to be exact, which makes it a refreshing and hydrating treat. One serving of watermelon or about two cups of diced melon contains just 80 calories and 21 grams of carbohydrate. While it does contain sugar (about 17 grams), this sugar, fructose, is naturally found in fruit which makes it a far better option than added or processed sugars as it’s easier for our bodies to process and won’t spike your blood sugar as drastically as a bag of sour watermelon candy, for example. The juicy fruit is also loaded with vitamins A, B6, and C, which boost your immunity, and potassium, which can potentially help ward off muscle cramps.",
    author_username: "adarshbalika",
    createdAt: before30MinDate(),
    updatedAt: before30MinDate(),
  },
  {
    _id: uuid(),
    id: "POST7",
    picture_url:
      "https://res.cloudinary.com/dcu6sympq/image/upload/v1688964267/socially/ki2ykahpjxzc7ru2qjur.jpg",
    content:
      "Gulmarg : Gulmarg is called the skiing destination on India and has the third largest skiing resort in the world. The amazing slopes here are great for skiing and it’s so adventurous and challenging that it’s advisable to go with a trainer even if you are a pro at the sport.In addition to skiing, you can also enjoy activities like snowboarding and sledging in Gulmarg. These activities are specially for children who might find skiing way too challenging.",
    author_username: "adarshbalika",
    createdAt: before30MinDate(),
    updatedAt: before30MinDate(),
  },
  {
    _id: uuid(),
    id: "POST8",
    picture_url:
      "https://res.cloudinary.com/dcu6sympq/image/upload/v1688963983/socially/wuzprzuj6uinud8htbcg.jpg",
    content:
      "Easiest chocolate modak recipe for Ganesh Chaturthi! The festive season doesn’t get any better than this with the ultimate fusion version. These are quick and easy to make vs traditional steamed modak.",
    author_username: "adarshbalika",
    createdAt: beforeOneYearDate(),
    updatedAt: beforeOneYearDate(),
  },
  {
    _id: uuid(),
    id: "POST9",
    picture_url:
      "https://res.cloudinary.com/dcu6sympq/image/upload/v1688964063/socially/kaumlb3zkbxa9fxqlngv.jpg",
    content:
      "This is the popular south Indian sweet dish made with semolina, ghee, sugar and saffron. If you literally translate, rava means semolina or suji and kesari means orangey saffron color.Because it is a sweet dish, it is eaten as a dessert after a meal or along with a meal. It is also offered as a naivedyam (prasad) to the God during pooja or festivals (like Ganesh Chaturthi, Navratri, Krisha Ashtami) and then distributed amongst the devotees.",
    author_username: "adarshbalika",
    createdAt: beforeOneYearDate(),
    updatedAt: beforeOneYearDate(),
  },
  {
    _id: uuid(),
    id: "POST10",
    picture_url:
      "https://res.cloudinary.com/dcu6sympq/image/upload/v1688964536/socially/ol74pcjaicjyerc4fbbw.jpg",
    content:
      "Mewar Festival of Udaipur denotes the coming of spring. The celebration is a necessary piece of Udaipur way of life and custom. Individuals in different parts of the place energetically participate in this celebration. The city flaunts a bright look during this Festival.",
    author_username: "Amelia",
    createdAt: before30MinDate(),
    updatedAt: before30MinDate(),
  },
  {
    _id: uuid(),
    id: "POST11",
    picture_url:
      "https://res.cloudinary.com/dcu6sympq/image/upload/v1688964702/socially/xryoob3ke436acywiouw.jpg",
    content:
      "The Rainbow Fish has beautiful, iridescent scales. He is vain because hes the most beautiful fish in the sea. No other fish will play with him because he won not share his scales. So the Rainbow Fish is sad. He gets some advice from an octopus who tells him to share his scales. So he does. He only keeps one for himself.",
    author_username: "adarshbalika",
    createdAt: before30MinDate(),
    updatedAt: before30MinDate(),
  },
  {
    _id: uuid(),
    id: "POST12",
    picture_url:
      "https://res.cloudinary.com/dcu6sympq/image/upload/v1688965053/socially/dbr5vjdlid6m94archmy.webp",
    content:
      "Jaipur, also known as the Pink City is a perfect vacation destination for those seeking a blend of history, culture, and relaxation. Located in Rajasthan, Jaipur is home to some of India most iconic landmarks, including the Hawa Mahal, Amer Fort, and City Palace. The city's architecture, characterized by its pink-hued buildings and intricate details, is a sight to behold and a photographer's paradise. Avail yourself of the Jaipur tour package for 3 days 2 nights to explore this city's rich cultural heritage, vibrant markets, traditional crafts, and delicious cuisine.",
    author_username: "Amelia",
    createdAt: before30MinDate(),
    updatedAt: before30MinDate(),
  },
];
