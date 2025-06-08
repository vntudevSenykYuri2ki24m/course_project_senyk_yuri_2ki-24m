import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./Header";

jest.mock("@/hooks", () => ({
    useCart: () => ({
        cart: {
            itemCount: 2,
        },
    }),
}));

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const translations: Record<string, string> = {
                "common.logo": "Логотип магазину",
                "navigation.home": "Головна",
                "navigation.catalog": "Каталог",
                "navigation.cart": "Кошик",
            };
            return translations[key] || key;
        },
    }),
}));

jest.mock("@/utils", () => ({
    ROUTES: {
        HOME: "/",
        CATALOG: "/catalog",
        CART: "/cart",
    },
}));

describe("Header", () => {
    const renderComponent = () => {
        return render(
            <BrowserRouter future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true
            }}>
                <Header />
            </BrowserRouter>
        );
    };

    test("відображає логотип з правильним посиланням", () => {
        renderComponent();
        const logo = screen.getByText("Логотип магазину");
        expect(logo).toBeInTheDocument();
        expect(logo.closest("a")).toHaveAttribute("href", "/");
    });

    test("відображає навігаційні посилання", () => {
        renderComponent();

        const homeLink = screen.getByText("Головна");
        expect(homeLink).toBeInTheDocument();
        expect(homeLink.closest("a")).toHaveAttribute("href", "/");

        const catalogLink = screen.getByText("Каталог");
        expect(catalogLink).toBeInTheDocument();
        expect(catalogLink.closest("a")).toHaveAttribute("href", "/catalog");

        const cartLink = screen.getByText("Кошик");
        expect(cartLink).toBeInTheDocument();
        expect(cartLink.closest("a")).toHaveAttribute("href", "/cart");
    });

    test("відображає значок з кількістю товарів у кошику", () => {
        renderComponent();
        const cartBadge = screen.getByText("2");
        expect(cartBadge).toBeInTheDocument();
        expect(cartBadge).toHaveClass("cartBadge");
    });

    test("кнопка мобільного меню перемикає стан меню", () => {
        const { container } = renderComponent();

        const mobileMenuButton = screen.getByLabelText("Toggle mobile menu");
        expect(mobileMenuButton).toBeInTheDocument();

        const nav = container.querySelector(".nav");
        expect(nav).not.toHaveClass("navOpen");

        fireEvent.click(mobileMenuButton);
        expect(nav).toHaveClass("navOpen");

        fireEvent.click(mobileMenuButton);
        expect(nav).not.toHaveClass("navOpen");
    });

    test("іконка мобільного меню змінюється залежно від стану меню", () => {
        const { container } = renderComponent();
        const menuButton = screen.getByLabelText("Toggle mobile menu");

        const initialLines = container.querySelectorAll("svg line");
        expect(initialLines.length).toBe(3);

        fireEvent.click(menuButton);
        const openMenuLines = container.querySelectorAll("svg line");
        expect(openMenuLines.length).toBe(2);

        fireEvent.click(menuButton);
        const closedMenuLines = container.querySelectorAll("svg line");
        expect(closedMenuLines.length).toBe(3);
    });

    test("клік по навігаційному посиланню закриває мобільне меню", () => {
        const { container } = renderComponent();

        const menuButton = screen.getByLabelText("Toggle mobile menu");
        fireEvent.click(menuButton);

        const nav = container.querySelector(".nav");
        expect(nav).toHaveClass("navOpen");

        const catalogLink = screen.getByText("Каталог");
        fireEvent.click(catalogLink);

        expect(nav).not.toHaveClass("navOpen");
    });
});