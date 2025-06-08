import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import {
    useProducts,
    useProduct,
    useProductsWithFilters,
    useProductsByCategory,
    useSearchProducts,
    useFeaturedProducts,
    useRelatedProducts,
} from "./useProducts";
import { productService } from "@/services";

jest.mock("@/services", () => ({
    productService: {
        getAllProducts: jest.fn(),
        getProductById: jest.fn(),
        getProductsWithFilters: jest.fn(),
        getProductsByCategory: jest.fn(),
        searchProducts: jest.fn(),
        getFeaturedProducts: jest.fn(),
        getRelatedProducts: jest.fn(),
    },
}));

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                gcTime: 0,
            },
        },
    });

    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

describe("Product Hooks", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("useProducts", () => {
        test("викликає getAllProducts та повертає дані", async () => {
            const mockProducts = [{ id: 1, name: "Продукт 1" }, { id: 2, name: "Продукт 2" }];
            (productService.getAllProducts as jest.Mock).mockResolvedValue(mockProducts);

            const { result } = renderHook(() => useProducts(), {
                wrapper: createWrapper(),
            });

            expect(result.current.isLoading).toBe(true);

            await waitFor(() => {
                expect(result.current.isSuccess).toBe(true);
            });

            expect(productService.getAllProducts).toHaveBeenCalledTimes(1);
            expect(result.current.data).toEqual(mockProducts);
        });

        test("обробляє помилку під час отримання продуктів", async () => {
            const error = new Error("Помилка отримання продуктів");
            (productService.getAllProducts as jest.Mock).mockRejectedValue(error);

            const { result } = renderHook(() => useProducts(), {
                wrapper: createWrapper(),
            });

            await waitFor(() => {
                expect(result.current.isError).toBe(true);
            });

            expect(result.current.error).toEqual(error);
        });
    });

    describe("useProduct", () => {
        test("викликає getProductById з правильним ID та повертає дані", async () => {
            const productId = 1;
            const mockProduct = { id: productId, name: "Тестовий продукт" };
            (productService.getProductById as jest.Mock).mockResolvedValue(mockProduct);

            const { result } = renderHook(() => useProduct(productId), {
                wrapper: createWrapper(),
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBe(true);
            });

            expect(productService.getProductById).toHaveBeenCalledWith(productId);
            expect(result.current.data).toEqual(mockProduct);
        });

        test("не викликає API, якщо ID відсутній", async () => {
            const { result } = renderHook(() => useProduct(0), {
                wrapper: createWrapper(),
            });

            expect(result.current.fetchStatus).toBe("idle");
            expect(productService.getProductById).not.toHaveBeenCalled();
        });
    });

    describe("useProductsWithFilters", () => {
        test("викликає getProductsWithFilters з правильними параметрами", async () => {
            const filters = { category: "електроніка", minPrice: 100 };
            const page = 1;
            const limit = 10;
            const mockResponse = {
                products: [{ id: 1, name: "Продукт" }],
                total: 1,
                page: 1,
                limit: 10
            };

            (productService.getProductsWithFilters as jest.Mock).mockResolvedValue(mockResponse);

            const { result } = renderHook(() => useProductsWithFilters(filters, page, limit), {
                wrapper: createWrapper(),
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBe(true);
            });

            expect(productService.getProductsWithFilters).toHaveBeenCalledWith(filters, page, limit);
            expect(result.current.data).toEqual(mockResponse);
        });
    });

    describe("useProductsByCategory", () => {
        test("викликає getProductsByCategory з правильною категорією", async () => {
            const category = "електроніка";
            const mockProducts = [{ id: 1, name: "Електронний пристрій" }];
            (productService.getProductsByCategory as jest.Mock).mockResolvedValue(mockProducts);

            const { result } = renderHook(() => useProductsByCategory(category), {
                wrapper: createWrapper(),
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBe(true);
            });

            expect(productService.getProductsByCategory).toHaveBeenCalledWith(category);
            expect(result.current.data).toEqual(mockProducts);
        });

        test("не викликає API, якщо категорія відсутня", async () => {
            const { result } = renderHook(() => useProductsByCategory(""), {
                wrapper: createWrapper(),
            });

            expect(result.current.fetchStatus).toBe("idle");
            expect(productService.getProductsByCategory).not.toHaveBeenCalled();
        });
    });

    describe("useSearchProducts", () => {
        test("викликає searchProducts з пошуковим запитом", async () => {
            const query = "телефон";
            const mockProducts = [{ id: 1, name: "Смартфон" }];
            (productService.searchProducts as jest.Mock).mockResolvedValue(mockProducts);

            const { result } = renderHook(() => useSearchProducts(query), {
                wrapper: createWrapper(),
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBe(true);
            });

            expect(productService.searchProducts).toHaveBeenCalledWith(query);
            expect(result.current.data).toEqual(mockProducts);
        });

        test("не викликає API, якщо запит коротший за 2 символи", async () => {
            const { result } = renderHook(() => useSearchProducts("a"), {
                wrapper: createWrapper(),
            });

            expect(result.current.fetchStatus).toBe("idle");
            expect(productService.searchProducts).not.toHaveBeenCalled();
        });
    });

    describe("useFeaturedProducts", () => {
        test("викликає getFeaturedProducts з правильним лімітом", async () => {
            const limit = 4;
            const mockProducts = [{ id: 1, name: "Акційний товар" }];
            (productService.getFeaturedProducts as jest.Mock).mockResolvedValue(mockProducts);

            const { result } = renderHook(() => useFeaturedProducts(limit), {
                wrapper: createWrapper(),
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBe(true);
            });

            expect(productService.getFeaturedProducts).toHaveBeenCalledWith(limit);
            expect(result.current.data).toEqual(mockProducts);
        });

        test("використовує ліміт за замовчуванням, якщо ліміт не вказано", async () => {
            (productService.getFeaturedProducts as jest.Mock).mockResolvedValue([]);

            renderHook(() => useFeaturedProducts(), {
                wrapper: createWrapper(),
            });

            await waitFor(() => {
                expect(productService.getFeaturedProducts).toHaveBeenCalledWith(8);
            });
        });
    });

    describe("useRelatedProducts", () => {
        test("викликає getRelatedProducts з правильними параметрами", async () => {
            const productId = 1;
            const limit = 3;
            const mockProducts = [{ id: 2, name: "Схожий продукт" }];
            (productService.getRelatedProducts as jest.Mock).mockResolvedValue(mockProducts);

            const { result } = renderHook(() => useRelatedProducts(productId, limit), {
                wrapper: createWrapper(),
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBe(true);
            });

            expect(productService.getRelatedProducts).toHaveBeenCalledWith(productId, limit);
            expect(result.current.data).toEqual(mockProducts);
        });

        test("не викликає API, якщо ID продукту відсутній", async () => {
            const { result } = renderHook(() => useRelatedProducts(0), {
                wrapper: createWrapper(),
            });

            expect(result.current.fetchStatus).toBe("idle");
            expect(productService.getRelatedProducts).not.toHaveBeenCalled();
        });

        test("використовує ліміт за замовчуванням, якщо ліміт не вказано", async () => {
            const productId = 1;
            (productService.getRelatedProducts as jest.Mock).mockResolvedValue([]);

            renderHook(() => useRelatedProducts(productId), {
                wrapper: createWrapper(),
            });

            await waitFor(() => {
                expect(productService.getRelatedProducts).toHaveBeenCalledWith(productId, 4);
            });
        });
    });
});