import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services";
import { Product, ProductFilter, PaginatedProducts } from "@/types";

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: productService.getAllProducts,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useProduct = (id: number) => {
  return useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useProductsWithFilters = (
  filters: ProductFilter,
  page: number,
  limit: number,
) => {
  return useQuery<PaginatedProducts, Error>({
    queryKey: ["products", "filtered", filters, page, limit],
    queryFn: () => productService.getProductsWithFilters(filters, page, limit),
    staleTime: 3 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery<Product[], Error>({
    queryKey: ["products", "category", category],
    queryFn: () => productService.getProductsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useSearchProducts = (query: string) => {
  return useQuery<Product[], Error>({
    queryKey: ["products", "search", query],
    queryFn: () => productService.searchProducts(query),
    enabled: query.length >= 2,
    staleTime: 3 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useFeaturedProducts = (limit: number = 8) => {
  return useQuery<Product[], Error>({
    queryKey: ["products", "featured", limit],
    queryFn: () => productService.getFeaturedProducts(limit),
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

export const useRelatedProducts = (productId: number, limit: number = 4) => {
  return useQuery<Product[], Error>({
    queryKey: ["products", "related", productId, limit],
    queryFn: () => productService.getRelatedProducts(productId, limit),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
