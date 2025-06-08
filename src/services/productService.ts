import { apiClient, ENDPOINTS } from "@/api";
import { Product, ProductFilter, PaginatedProducts } from "@/types";
import { ITEMS_PER_PAGE } from "@/utils";

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    return apiClient.get<Product[]>(ENDPOINTS.PRODUCTS.ALL);
  },

  async getProductById(id: number): Promise<Product> {
    return apiClient.get<Product>(ENDPOINTS.PRODUCTS.SINGLE(id));
  },

  async getCategories(): Promise<string[]> {
    return apiClient.get<string[]>(ENDPOINTS.PRODUCTS.CATEGORIES);
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    return apiClient.get<Product[]>(ENDPOINTS.PRODUCTS.BY_CATEGORY(category));
  },

  async getProductsWithFilters(
    filters: ProductFilter,
    page: number = 1,
    limit: number = ITEMS_PER_PAGE,
  ): Promise<PaginatedProducts> {
    let products = await this.getAllProducts();

    if (filters.category) {
      products = products.filter(
        (product) => product.category === filters.category,
      );
    }

    if (filters.minPrice !== undefined) {
      products = products.filter(
        (product) => product.price >= filters.minPrice!,
      );
    }

    if (filters.maxPrice !== undefined) {
      products = products.filter(
        (product) => product.price <= filters.maxPrice!,
      );
    }

    if (filters.sortBy && filters.sortOrder) {
      products = this.sortProducts(products, filters.sortBy, filters.sortOrder);
    }

    const total = products.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = products.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      total,
      page,
      totalPages,
    };
  },

  sortProducts(
    products: Product[],
    sortBy: "price" | "rating" | "title",
    sortOrder: "asc" | "desc",
  ): Product[] {
    const sorted = [...products].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "price":
          comparison = a.price - b.price;
          break;
        case "rating":
          comparison = a.rating.rate - b.rating.rate;
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return sorted;
  },

  async searchProducts(query: string): Promise<Product[]> {
    const products = await this.getAllProducts();
    const lowercaseQuery = query.toLowerCase();

    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery),
    );
  },

  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    const products = await this.getAllProducts();
    return products
      .sort((a, b) => b.rating.rate - a.rating.rate)
      .slice(0, limit);
  },

  async getRelatedProducts(
    productId: number,
    limit: number = 4,
  ): Promise<Product[]> {
    const product = await this.getProductById(productId);
    const categoryProducts = await this.getProductsByCategory(product.category);

    return categoryProducts
      .filter((p) => p.id !== productId)
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
  },
};
