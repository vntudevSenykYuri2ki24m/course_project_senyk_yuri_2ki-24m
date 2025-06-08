import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Footer } from "./Footer";
import { ROUTES } from "@/utils";

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const translations: Record<string, string> = {
                "common.logo": "Store Logo",
                "common.description": "Your online store for everything",
                "navigation.labels.quick_links": "Quick Links",
                "navigation.home": "Home",
                "navigation.catalog": "Catalog",
                "navigation.cart": "Cart",
                "navigation.labels.custom_service": "Customer Service",
                "footer.aboutUs": "About Us",
                "footer.contacts": "Contacts",
                "footer.termsOfService": "Terms of Service",
                "footer.faq": "FAQ",
                "navigation.labels.connect": "Connect With Us",
                "footer.copyright": "All rights reserved",
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

describe("Footer", () => {
    const renderComponent = () => {
        return render(
            <BrowserRouter future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true
            }}>
                <Footer />
            </BrowserRouter>
        );
    };

    test("відображає логотип та опис", () => {
        renderComponent();
        expect(screen.getByText("Store Logo")).toBeInTheDocument();
        expect(screen.getByText("Your online store for everything")).toBeInTheDocument();
    });

    test("відображає секцію швидких посилань", () => {
        renderComponent();

        expect(screen.getByText("Quick Links")).toBeInTheDocument();

        const homeLink = screen.getByText("Home");
        expect(homeLink).toBeInTheDocument();
        expect(homeLink.closest("a")).toHaveAttribute("href", ROUTES.HOME);

        const catalogLink = screen.getByText("Catalog");
        expect(catalogLink).toBeInTheDocument();
        expect(catalogLink.closest("a")).toHaveAttribute("href", ROUTES.CATALOG);

        const cartLink = screen.getByText("Cart");
        expect(cartLink).toBeInTheDocument();
        expect(cartLink.closest("a")).toHaveAttribute("href", ROUTES.CART);
    });

    test("відображає секцію обслуговування клієнтів", () => {
        renderComponent();

        expect(screen.getByText("Customer Service")).toBeInTheDocument();

        const aboutUsLink = screen.getByText("About Us");
        expect(aboutUsLink).toBeInTheDocument();
        expect(aboutUsLink.closest("a")).toHaveAttribute("href", ROUTES.HOME);

        const contactsLink = screen.getByText("Contacts");
        expect(contactsLink).toBeInTheDocument();
        expect(contactsLink.closest("a")).toHaveAttribute("href", ROUTES.HOME);

        const termsOfServiceLink = screen.getByText("Terms of Service");
        expect(termsOfServiceLink).toBeInTheDocument();
        expect(termsOfServiceLink.closest("a")).toHaveAttribute("href", ROUTES.HOME);

        const faqLink = screen.getByText("FAQ");
        expect(faqLink).toBeInTheDocument();
        expect(faqLink.closest("a")).toHaveAttribute("href", ROUTES.HOME);
    });

    test("відображає секцію соціальних мереж", () => {
        renderComponent();

        expect(screen.getByText("Connect With Us")).toBeInTheDocument();

        const facebookLink = screen.getByText("Facebook");
        expect(facebookLink).toBeInTheDocument();
        expect(facebookLink.closest("a")).toHaveAttribute("href", ROUTES.HOME);

        const twitterLink = screen.getByText("Twitter");
        expect(twitterLink).toBeInTheDocument();
        expect(twitterLink.closest("a")).toHaveAttribute("href", ROUTES.HOME);

        const instagramLink = screen.getByText("Instagram");
        expect(instagramLink).toBeInTheDocument();
        expect(instagramLink.closest("a")).toHaveAttribute("href", ROUTES.HOME);
    });

    test("відображає копірайт з поточним роком", () => {
        renderComponent();

        const currentYear = new Date().getFullYear();
        expect(screen.getByText(`© ${currentYear} All rights reserved`)).toBeInTheDocument();
    });
});