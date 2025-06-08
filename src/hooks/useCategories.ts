import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services";

export const useCategories = () => {
  return useQuery<string[], Error>({
    queryKey: ["categories"],
    queryFn: productService.getCategories,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};
