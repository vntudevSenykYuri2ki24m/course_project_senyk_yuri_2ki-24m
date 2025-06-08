export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://fakestoreapi.com";

export const ENDPOINTS = {
  PRODUCTS: {
    ALL: "/products",
    SINGLE: (id: number) => `/products/${id}`,
    CATEGORIES: "/products/categories",
    BY_CATEGORY: (category: string) => `/products/category/${category}`,
    LIMIT: (limit: number) => `/products?limit=${limit}`,
    SORT: (sort: string) => `/products?sort=${sort}`,
  },
  CARTS: {
    ALL: "/carts",
    SINGLE: (id: number) => `/carts/${id}`,
    USER_CART: (userId: number) => `/carts/user/${userId}`,
    ADD: "/carts",
    UPDATE: (id: number) => `/carts/${id}`,
    DELETE: (id: number) => `/carts/${id}`,
  },
  USERS: {
    ALL: "/users",
    SINGLE: (id: number) => `/users/${id}`,
    ADD: "/users",
    UPDATE: (id: number) => `/users/${id}`,
    DELETE: (id: number) => `/users/${id}`,
  },
  AUTH: {
    LOGIN: "/auth/login",
  },
};
