export const createAccount = async (user) => {
  const api = await fetch("https://drip-mart-u94f-api.vercel.app/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const res = await api.json();
  return res;
};
export const userLogin = async (user) => {
  const api = await fetch("https://drip-mart-u94f-api.vercel.app/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const res = await api.json();
  return res;
};
const headers = {
  headers: { Authorization: localStorage.getItem("token") },
};

const token = localStorage.getItem("token");
export const fetcAllProduct = async () => {
  const api = await fetch("https://drip-mart-u94f-api.vercel.app/product", headers);
  const res = await api.json();
  return res;
};
export const addToFavouritre = async (id) => {
  const api = await fetch(`https://drip-mart-u94f-api.vercel.app/favourites/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ id }),
  });
  const res = await api.json();
  return res;
};
export const getFavouriteLiset = async () => {
  const api = await fetch("https://drip-mart-u94f-api.vercel.app/favourites/", headers);
  const res = await api.json();
  return res;
};
