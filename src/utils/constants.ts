export const ITEMS_PER_PAGE = 12;

export const SORT_OPTIONS = [
  {value: "title-asc", label: "Назва: А-Я"},
  {value: "title-desc", label: "Назва: Я-А"},
  {value: "price-asc", label: "Ціна: від низької до високої"},
  {value: "price-desc", label: "Ціна: від високої до низької"},
  {value: "rating-desc", label: "Рейтинг: від високого до низького"},
  {value: "rating-asc", label: "Рейтинг: від низького до високого"},
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
