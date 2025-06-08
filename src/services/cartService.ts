import { apiClient, ENDPOINTS } from "@/api";
import { FakeStoreCart } from "@/types";

export const cartService = {
  async getAllCarts(): Promise<FakeStoreCart[]> {
    return apiClient.get<FakeStoreCart[]>(ENDPOINTS.CARTS.ALL);
  },

  async getCartById(id: number): Promise<FakeStoreCart> {
    return apiClient.get<FakeStoreCart>(ENDPOINTS.CARTS.SINGLE(id));
  },

  async getUserCart(userId: number): Promise<FakeStoreCart[]> {
    return apiClient.get<FakeStoreCart[]>(ENDPOINTS.CARTS.USER_CART(userId));
  },

  async addCart(cart: Omit<FakeStoreCart, "id">): Promise<FakeStoreCart> {
    return apiClient.post<FakeStoreCart>(ENDPOINTS.CARTS.ADD, cart);
  },

  async updateCart(
    id: number,
    cart: Partial<FakeStoreCart>,
  ): Promise<FakeStoreCart> {
    return apiClient.put<FakeStoreCart>(ENDPOINTS.CARTS.UPDATE(id), cart);
  },

  async deleteCart(id: number): Promise<FakeStoreCart> {
    return apiClient.delete<FakeStoreCart>(ENDPOINTS.CARTS.DELETE(id));
  },

  async syncCartWithApi(
    userId: number,
    products: Array<{ productId: number; quantity: number }>,
  ): Promise<FakeStoreCart> {
    const cart = {
      userId,
      date: new Date().toISOString(),
      products,
    };

    return this.addCart(cart);
  },
};
