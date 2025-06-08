import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { CartItem } from "./CartItem";
import { useCart } from "@/hooks";
import { formatPrice } from "@/utils";
import { CartItem as CartItemType } from "@/types";

jest.mock("@/hooks", () => ({
    useCart: jest.fn(),
}));

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string, defaultValue: string) => defaultValue,
    }),
}));

jest.mock("@/utils", () => ({
    formatPrice: jest.fn().mockImplementation((price) => `${price} ₴`),
}));

const createRouterWrapper = (children: React.ReactNode) => {
    const routes = [
        {
            path: "/",
            element: children,
        },
        {
            path: "/product/:id",
            element: <div>Product Details Page</div>,
        }
    ];

    const router = createMemoryRouter(routes, {
        initialEntries: ["/"],
    });

    return <RouterProvider router={router} future={{
        v7_startTransition: true,
    }} />;
};

describe("CartItem", () => {
    const mockUpdateQuantity = jest.fn();
    const mockRemoveFromCart = jest.fn();
    const mockUseCart = useCart as jest.Mock;
    const mockFormatPrice = formatPrice as jest.Mock;

    const mockItem: CartItemType = {
        product: {
            id: 1,
            title: "Test Product",
            price: 99.99,
            category: "Test Category",
            description: "Test description",
            image: "test-image.jpg",
            rating: {
                rate: 4.5,
                count: 100,
            }
        },
        quantity: 2
    };

    beforeEach(() => {
        mockUseCart.mockReturnValue({
            updateQuantity: mockUpdateQuantity,
            removeFromCart: mockRemoveFromCart,
        });
        mockFormatPrice.mockImplementation((price) => `${price} ₴`);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("відображає інформацію про товар", () => {
        render(createRouterWrapper(<CartItem item={mockItem} />));

        expect(screen.getByText("Test Product")).toBeInTheDocument();
        expect(screen.getByText("Test Category")).toBeInTheDocument();

        const singlePrice = mockFormatPrice(99.99);
        const totalPrice = mockFormatPrice(99.99 * 2);

        expect(screen.getByText(singlePrice)).toBeInTheDocument();
        expect(screen.getByText(totalPrice)).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
    });

    test("викликає updateQuantity при збільшенні кількості товару", () => {
        render(createRouterWrapper(<CartItem item={mockItem} />));

        const increaseButton = screen.getByLabelText("Збільшити кількість");
        fireEvent.click(increaseButton);

        expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);
    });

    test("викликає updateQuantity при зменшенні кількості товару", () => {
        render(createRouterWrapper(<CartItem item={mockItem} />));

        const decreaseButton = screen.getByLabelText("Зменшити кількість");
        fireEvent.click(decreaseButton);

        expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1);
    });

    test("не викликає updateQuantity при спробі зменшити кількість нижче 1", () => {
        mockUseCart.mockReturnValue({
            updateQuantity: mockUpdateQuantity,
            removeFromCart: mockRemoveFromCart,
        });

        const itemWithQuantityOne = {
            ...mockItem,
            quantity: 1,
        };

        render(createRouterWrapper(<CartItem item={itemWithQuantityOne} />));

        const decreaseButton = screen.getByLabelText("Зменшити кількість");
        fireEvent.click(decreaseButton);

        expect(mockUpdateQuantity).not.toHaveBeenCalled();
    });

    test("викликає removeFromCart при натисканні на кнопку 'Видалити'", () => {
        render(createRouterWrapper(<CartItem item={mockItem} />));

        const removeButton = screen.getByText("Видалити");
        fireEvent.click(removeButton);

        expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
    });

    test("перевіряє наявність коректного посилання на деталі товару", () => {
        render(createRouterWrapper(<CartItem item={mockItem} />));

        const titleElement = screen.getByText("Test Product");
        const titleLink = titleElement.closest("a");

        const image = screen.getByAltText("Test Product");
        const imageLink = image.closest("a");

        expect(titleLink).toHaveAttribute("href", "/product/1");
        expect(imageLink).toHaveAttribute("href", "/product/1");

        expect(imageLink).toContainElement(image);
        expect(titleLink).toContainElement(titleElement);
    });

    test("відображає зображення товару", () => {
        render(createRouterWrapper(<CartItem item={mockItem} />));

        const image = screen.getByAltText("Test Product");
        expect(image).toHaveAttribute("src", "test-image.jpg");
    });
});