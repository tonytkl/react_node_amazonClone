import { jwtDecode } from "jwt-decode";

export const getLocalToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    var decoded = jwtDecode(token);
    var currentTime = Date.now().valueOf() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return [false, null];
    } else {
      return [true, token];
    }
  } else {
    return [false, null];
  }
};

export const toTitleCase = (str) => {
  return str
    .split(/[ -]/)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};
