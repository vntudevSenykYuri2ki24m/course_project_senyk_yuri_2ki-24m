import { apiClient, ENDPOINTS } from "@/api";
import { cartService } from "./cartService";
import { FakeStoreCart } from "@/types";

jest.mock("@/api", () => ({
    apiClient: {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
    },
    ENDPOINTS: {
        CARTS: {
            ALL: "carts",
            SINGLE: (id: number) => `carts/${id}`,
            USER_CART: (userId: number) => `carts/user/${userId}`,
            ADD: "carts",
            UPDATE: (id: number) => `carts/${id}`,
            DELETE: (id: number) => `carts/${id}`,
        },
    },
}));

describe("cartService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockCart: FakeStoreCart = {
        id: 1,
        userId: 1,
        date: "2023-01-01",
        products: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 1 },
        ],
    };

    test("getAllCarts викликає правильний endpoint", async () => {
        (apiClient.get as jest.Mock).mockResolvedValue([mockCart]);

        const result = await cartService.getAllCarts();

        expect(apiClient.get).toHaveBeenCalledWith(ENDPOINTS.CARTS.ALL);
        expect(result).toEqual([mockCart]);
    });

    test("getCartById викликає правильний endpoint з id", async () => {
        (apiClient.get as jest.Mock).mockResolvedValue(mockCart);

        const result = await cartService.getCartById(1);

        expect(apiClient.get).toHaveBeenCalledWith(ENDPOINTS.CARTS.SINGLE(1));
        expect(result).toEqual(mockCart);
    });

    test("getUserCart викликає правильний endpoint з userId", async () => {
        (apiClient.get as jest.Mock).mockResolvedValue([mockCart]);

        const result = await cartService.getUserCart(1);

        expect(apiClient.get).toHaveBeenCalledWith(ENDPOINTS.CARTS.USER_CART(1));
        expect(result).toEqual([mockCart]);
    });

    test("addCart викликає правильний endpoint з даними", async () => {
        const newCart: Omit<FakeStoreCart, "id"> = {
            userId: 1,
            date: "2023-01-01",
            products: [{ productId: 1, quantity: 2 }],
        };
        (apiClient.post as jest.Mock).mockResolvedValue(mockCart);

        const result = await cartService.addCart(newCart);

        expect(apiClient.post).toHaveBeenCalledWith(ENDPOINTS.CARTS.ADD, newCart);
        expect(result).toEqual(mockCart);
    });

    test("updateCart викликає правильний endpoint з id та даними", async () => {
        const updateData: Partial<FakeStoreCart> = {
            products: [{ productId: 3, quantity: 1 }],
        };
        (apiClient.put as jest.Mock).mockResolvedValue({
            ...mockCart,
            ...updateData,
        });

        const result = await cartService.updateCart(1, updateData);

        expect(apiClient.put).toHaveBeenCalledWith(ENDPOINTS.CARTS.UPDATE(1), updateData);
        expect(result).toEqual({ ...mockCart, ...updateData });
    });

    test("deleteCart викликає правильний endpoint з id", async () => {
        (apiClient.delete as jest.Mock).mockResolvedValue(mockCart);

        const result = await cartService.deleteCart(1);

        expect(apiClient.delete).toHaveBeenCalledWith(ENDPOINTS.CARTS.DELETE(1));
        expect(result).toEqual(mockCart);
    });

    test("syncCartWithApi створює новий кошик з правильними даними", async () => {
        const products = [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 1 },
        ];
        const userId = 5;

        jest.spyOn(global.Date, 'now').mockImplementation(() => new Date('2023-01-01T00:00:00.000Z').valueOf());
        (apiClient.post as jest.Mock).mockResolvedValue({
            id: 10,
            userId,
            date: new Date().toISOString(),
            products,
        });

        jest.spyOn(cartService, 'addCart');

        const result = await cartService.syncCartWithApi(userId, products);

        expect(cartService.addCart).toHaveBeenCalledWith({
            userId,
            date: expect.any(String),
            products,
        });

        expect(result).toEqual({
            id: 10,
            userId,
            date: expect.any(String),
            products,
        });
    });
});