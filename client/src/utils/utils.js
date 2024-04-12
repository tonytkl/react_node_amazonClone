export const getLocalToken = () => {
  const token = localStorage.getItem("token");
  return token ? [true, token] : [false, null];
};

export const titleCase = (str) => {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};
