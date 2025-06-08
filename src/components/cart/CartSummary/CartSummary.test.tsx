import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartSummary } from "./CartSummary";
import { formatPrice, ROUTES } from "@/utils";
import { Cart } from "@/types";

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string, options?: any) => {
            const translations: Record<string, string> = {
                "cart.summary.title": "Order Summary",
                "cart.summary.subtotal": `Subtotal (${options?.count || 0} items)`,
                "cart.summary.shipping": "Shipping",
                "cart.summary.free": "FREE",
                "cart.summary.freeShippingNote": "Free shipping on orders over 50₴",
                "cart.summary.tax": "Tax",
                "cart.summary.total": "Total",
                "cart.summary.proceedToCheckout": "Proceed to Checkout",
            };
            return translations[key] || key;
        },
    }),
}));

jest.mock("@/utils", () => ({
    formatPrice: jest.fn((price) => `${price}₴`),
    ROUTES: {
        CHECKOUT: "/checkout",
    },
}));

describe("CartSummary", () => {
    const mockNavigate = jest.fn();
    const mockFormatPrice = formatPrice as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
    });

    const createMockCart = (total: number, itemCount: number): Cart => ({
        items: [],
        itemCount,
        total,
    });

    test("відображає правильні дані з кошика", () => {
        const mockCart = createMockCart(100, 3);
        render(<CartSummary cart={mockCart} />);

        expect(screen.getByText("Order Summary")).toBeInTheDocument();
        expect(screen.getByText("Subtotal (3 items)")).toBeInTheDocument();
        expect(screen.getByText("Shipping")).toBeInTheDocument();
        expect(screen.getByText("FREE")).toBeInTheDocument();
        expect(screen.getByText("Tax")).toBeInTheDocument();
        expect(screen.getByText("Total")).toBeInTheDocument();

        const subtotal = 100;
        const shipping = 0; // Free shipping for orders > 50
        const tax = subtotal * 0.08;
        const total = subtotal + shipping + tax;

        expect(mockFormatPrice).toHaveBeenCalledWith(subtotal);
        expect(mockFormatPrice).toHaveBeenCalledWith(tax);
        expect(mockFormatPrice).toHaveBeenCalledWith(total);
    });

    test("відображає вартість доставки для замовлень менше 50", () => {
        const mockCart = createMockCart(40, 2);
        render(<CartSummary cart={mockCart} />);

        const shipping = 10;
        expect(mockFormatPrice).toHaveBeenCalledWith(shipping);
        expect(screen.getByText("Free shipping on orders over 50₴")).toBeInTheDocument();
    });

    test("не відображає примітку про безкоштовну доставку, якщо доставка безкоштовна", () => {
        const mockCart = createMockCart(100, 3);
        render(<CartSummary cart={mockCart} />);

        expect(screen.queryByText("Free shipping on orders over 50₴")).not.toBeInTheDocument();
    });

    test("відображає кнопку оформлення замовлення, якщо showCheckoutButton=true і кошик не порожній", () => {
        const mockCart = createMockCart(100, 3);
        render(<CartSummary cart={mockCart} showCheckoutButton={true} />);

        const checkoutButton = screen.getByText("Proceed to Checkout");
        expect(checkoutButton).toBeInTheDocument();
    });

    test("не відображає кнопку оформлення замовлення, якщо showCheckoutButton=false", () => {
        const mockCart = createMockCart(100, 3);
        render(<CartSummary cart={mockCart} showCheckoutButton={false} />);

        expect(screen.queryByText("Proceed to Checkout")).not.toBeInTheDocument();
    });

    test("не відображає кнопку оформлення замовлення, якщо кошик порожній", () => {
        const mockCart = createMockCart(0, 0);
        render(<CartSummary cart={mockCart} />);

        expect(screen.queryByText("Proceed to Checkout")).not.toBeInTheDocument();
    });

    test("переходить на сторінку оформлення замовлення при натисканні на кнопку", () => {
        const mockCart = createMockCart(100, 3);
        render(<CartSummary cart={mockCart} />);

        const checkoutButton = screen.getByText("Proceed to Checkout");
        fireEvent.click(checkoutButton);

        expect(mockNavigate).toHaveBeenCalledWith(ROUTES.CHECKOUT);
    });

    test("обчислює правильну загальну суму з податком і доставкою", () => {
        const mockCart = createMockCart(75, 2);
        render(<CartSummary cart={mockCart} />);

        const subtotal = 75;
        const shipping = 0; // Free shipping for orders > 50
        const tax = subtotal * 0.08;
        const total = subtotal + shipping + tax;

        expect(mockFormatPrice).toHaveBeenCalledWith(subtotal);
        expect(mockFormatPrice).toHaveBeenCalledWith(tax);
        expect(mockFormatPrice).toHaveBeenCalledWith(total);
    });
});