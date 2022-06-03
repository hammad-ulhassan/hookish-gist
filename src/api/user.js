import moment from "moment";
import headers from "../credentials";

export const getUser = async ({login}) => {
  const response = await fetch(`https://api.github.com/users/${login}`, {
    headers: headers(),
  });
  if (!response.ok) {
    throw new Error("User Data coud not be fetched!");
  } else {
    const res = await response.json();
    return res;
  }
};
