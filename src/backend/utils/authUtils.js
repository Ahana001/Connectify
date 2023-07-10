import { Response } from "miragejs";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";

export const requiresAuth = function (request) {
  const encodedToken = request.requestHeaders.authorization;

  const decodedToken = jwt_decode(encodedToken, "secret");
  if (decodedToken) {
    const user = this.db.users.findBy({ username: decodedToken.username });
    return user;
  }
  return new Response(
    401,
    {},
    { errors: ["The token is invalid. Unauthorized access error."] }
  );
};

export const formatDate = () => dayjs().format("YYYY-MM-DDTHH:mm:ssZ");
export const yesterdayDate = () => {
  const tomorrow = dayjs().subtract(1, "day");
  return tomorrow.format("YYYY-MM-DDTHH:mm:ssZ");
};
export const before30MinDate = () => {
  const tomorrow = dayjs().subtract(30, "minutes");
  return tomorrow.format("YYYY-MM-DDTHH:mm:ssZ");
};
export const beforeOneYearDate = () => {
  const tomorrow = dayjs().subtract(20, "day");
  return tomorrow.format("YYYY-MM-DDTHH:mm:ssZ");
};
