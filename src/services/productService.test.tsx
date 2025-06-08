import { apiClient, ENDPOINTS } from "@/api";
import { productService } from "./productService";
import { Product, ProductFilter } from "@/types";

jest.mock("@/api", () => ({
    apiClient: {
        get: jest.fn(),
    },
    ENDPOINTS: {
        PRODUCTS: {
            ALL: "products",
            SINGLE: (id: number) => `products/${id}`,
            CATEGORIES: "products/categories",
            BY_CATEGORY: (category: string) => `products/category/${category}`,
        },
    },
}));

describe("productService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockProducts: Product[] = [
        {
            id: 1,
            title: "Product 1",
            price: 10,
            description: "Description 1",
            category: "Category A",
            image: "image1.jpg",
            rating: { rate: 4.5, count: 100 },
        },
        {
            id: 2,
            title: "Product 2",
            price: 20,
            description: "Description 2",
            category: "Category B",
            image: "image2.jpg",
            rating: { rate: 4.0, count: 80 },
        },
        {
            id: 3,
            title: "Product 3",
            price: 15,
            description: "Description 3",
            category: "Category A",
            image: "image3.jpg",
            rating: { rate: 3.5, count: 60 },
        },
        {
            id: 4,
            title: "Awesome Product",
            price: 25,
            description: "Premium product",
            category: "Category B",
            image: "image4.jpg",
            rating: { rate: 5.0, count: 120 },
        },
    ];

    test("getAllProducts викликає правильний endpoint", async () => {
        (apiClient.get as jest.Mock).mockResolvedValue(mockProducts);

        const result = await productService.getAllProducts();

        expect(apiClient.get).toHaveBeenCalledWith(ENDPOINTS.PRODUCTS.ALL);
        expect(result).toEqual(mockProducts);
    });

    test("getProductById викликає правильний endpoint з id", async () => {
        (apiClient.get as jest.Mock).mockResolvedValue(mockProducts[0]);

        const result = await productService.getProductById(1);

        expect(apiClient.get).toHaveBeenCalledWith(ENDPOINTS.PRODUCTS.SINGLE(1));
        expect(result).toEqual(mockProducts[0]);
    });

    test("getCategories викликає правильний endpoint", async () => {
        const categories = ["Category A", "Category B"];
        (apiClient.get as jest.Mock).mockResolvedValue(categories);

        const result = await productService.getCategories();

        expect(apiClient.get).toHaveBeenCalledWith(ENDPOINTS.PRODUCTS.CATEGORIES);
        expect(result).toEqual(categories);
    });

    test("getProductsByCategory викликає правильний endpoint з категорією", async () => {
        const categoryProducts = mockProducts.filter(p => p.category === "Category A");
        (apiClient.get as jest.Mock).mockResolvedValue(categoryProducts);

        const result = await productService.getProductsByCategory("Category A");

        expect(apiClient.get).toHaveBeenCalledWith(ENDPOINTS.PRODUCTS.BY_CATEGORY("Category A"));
        expect(result).toEqual(categoryProducts);
    });

    test("getProductsWithFilters фільтрує за категорією", async () => {
        (apiClient.get as jest.Mock).mockResolvedValue(mockProducts);

        const filters: ProductFilter = { category: "Category A" };
        const result = await productService.getProductsWithFilters(filters);

        expect(result.products.length).toBe(2);
        expect(result.products.every(p => p.category === "Category A")).toBe(true);
        expect(result.total).toBe(2);
    });

    test("getProductsWithFilters фільтрує за мінімальною ціною", async () => {
        (apiClient.get as jest.Mock).mockResolvedValue(mockProducts);

        const filters: ProductFilter = { minPrice: 15 };
        const result = await productService.getProductsWithFilters(filters);

        expect(result.products.length).toBe(3);
        expect(result.products.every(p => p.price >= 15)).toBe(true);
    });

    test("getProductsWithFilters фільтрує за максимальною ціною", async () => {
        (apiClient.get as jest.Mock).mockResolvedValue(mockProducts);

        const filters: ProductFilter = { maxPrice: 20 };
        const result = await productService.getProductsWithFilters(filters);

        expect(result.products.length).toBe(3);
        expect(result.products.every(p => p.price <= 20)).toBe(true);
    });

    test("getProductsWithFilters сортує за ціною", async () => {
        (apiClient.get as jest.Mock).mockResolvedValue(mockProducts);

        const filters: ProductFilter = { sortBy: "price", sortOrder: "asc" };
        const result = await productService.getProductsWithFilters(filters);

        expect(result.products[0].price).toBe(10);
        expect(result.products[1].price).toBe(15);
        expect(result.products[2].price).toBe(20);
        expect(result.products[3].price).toBe(25);
    });

    test("getProductsWithFilters сортує за рейтингом", async () => {
        (apiClient.get as jest.Mock).mockResolvedValue(mockProducts);

        const filters: ProductFilter = { sortBy: "rating", sortOrder: "desc" };
        const result = await productService.getProductsWithFilters(filters);

        expect(result.products[0].rating.rate).toBe(5.0);
        expect(result.products[1].rating.rate).toBe(4.5);
        expect(result.products[2].rating.rate).toBe(4.0);
        expect(result.products[3].rating.rate).toBe(3.5);
    });

    test("getProductsWithFilters сортує за назвою", async () => {
        (apiClient.get as jest.Mock).mockResolvedValue(mockProducts);

        const filters: ProductFilter = { sortBy: "title", sortOrder: "asc" };
        const result = await productService.getProductsWithFilters(filters);

        expect(result.products[0].title).toBe("Awesome Product");
        expect(result.products[1].title).toBe("Product 1");
        expect(result.products[2].title).toBe("Product 2");
        expect(result.products[3].title).toBe("Product 3");
    });

    test("getProductsWithFilters пагінує результати", async () => {
        (apiClient.get as jest.Mock).mockResolvedValue(mockProducts);

        const result = await productService.getProductsWithFilters({}, 1, 2);

        expect(result.products.length).toBe(2);
        expect(result.total).toBe(4);
        expect(result.page).toBe(1);
        expect(result.totalPages).toBe(2);
    });

    test("searchProducts шукає товари за ключовим словом", async () => {
        (apiClient.get as jest.Mock).mockResolvedValue(mockProducts);

        const result = await productService.searchProducts("awesome");

        expect(result.length).toBe(1);
        expect(result[0].title).toBe("Awesome Product");
    });

    test("getFeaturedProducts повертає товари з найвищим рейтингом", async () => {
        (apiClient.get as jest.Mock).mockResolvedValue(mockProducts);

        const result = await productService.getFeaturedProducts(2);

        expect(result.length).toBe(2);
        expect(result[0].rating.rate).toBe(5.0);
        expect(result[1].rating.rate).toBe(4.5);
    });

    test("getRelatedProducts повертає товари з тієї ж категорії", async () => {
        (apiClient.get as jest.Mock)
            .mockResolvedValueOnce(mockProducts[0])
            .mockResolvedValueOnce(mockProducts.filter(p => p.category === "Category A"));

        const result = await productService.getRelatedProducts(1, 2);

        expect(result.length).toBe(1);
        expect(result[0].id).toBe(3);
        expect(result[0].category).toBe("Category A");
    });
});