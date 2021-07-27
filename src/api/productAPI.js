import instance from "./instance";
import { isAuthenticated } from "auth";
const { accessToken } = isAuthenticated();

export const getAll = () => {
  const url = "/664/products";
  return instance.get(url);
};
export const get = (id) => {
  const url = `/664/products/${id}`;
  return instance.get(url);
};
export const remove = (id) => {
  const url = `/600/products/${id}`;
  return instance.delete(url);
};
export const edit = (item) => {
  const url = `/600/products/${item.id}`;
  return instance.put(url, item, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};
export const add = (item) => {
  const url = "/600/products";
  return instance.post(url, item);
};
