export const ITEMS_PER_PAGE = 12;

export const SORT_OPTIONS = [
  { value: "title-asc", label: "Name: A-Z" },
  { value: "title-desc", label: "Name: Z-A" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Rating: High to Low" },
  { value: "rating-asc", label: "Rating: Low to High" },
];

export const ROUTES = {
  HOME: "/",
  CATALOG: "/catalog",
  PRODUCT_DETAIL: "/product/:id",
  CART: "/cart",
  CHECKOUT: "/checkout",
};

export const STORAGE_KEYS = {
  CART: "ecommerce_cart",
  USER: "ecommerce_user",
  RECENT_PRODUCTS: "ecommerce_recent",
};

export const PRICE_RANGE = {
  MIN: 0,
  MAX: 1000,
  STEP: 10,
};

export const CHECKOUT_STEPS = {
  SHIPPING: "shipping",
  PAYMENT: "payment",
  REVIEW: "review",
  CONFIRMATION: "confirmation",
};
