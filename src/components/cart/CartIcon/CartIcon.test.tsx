import React from "react";
import {render, screen} from "@testing-library/react";
import {RouterProvider, createMemoryRouter} from "react-router-dom";
import {CartIcon} from "./CartIcon";
import {useCart} from "@/hooks";
import {ROUTES} from "@/utils";

jest.mock("@/hooks", () => ({
    useCart: jest.fn(),
}));

const createRouterWrapper = (children: React.ReactNode) => {
    const routes = [
        {
            path: "/",
            element: children,
        },
        {
            path: ROUTES.CART,
            element: <div>Сторінка кошика</div>,
        }
    ];

    const router = createMemoryRouter(routes, {
        initialEntries: ["/"],
    });

    return <RouterProvider router={router} future={{
        v7_startTransition: true,
    }}/>;
};

describe("CartIcon", () => {
    const mockUseCart = useCart as jest.Mock;

    beforeEach(() => {
        mockUseCart.mockReturnValue({
            cart: {
                itemCount: 0,
            },
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("відображає іконку кошика без мітки за замовчуванням", () => {
        render(createRouterWrapper(<CartIcon/>));

        expect(screen.getByLabelText("View cart")).toBeInTheDocument();
        expect(screen.queryByText("Cart")).not.toBeInTheDocument();
    });

    test("відображає іконку кошика з міткою, коли showLabel дорівнює true", () => {
        render(createRouterWrapper(<CartIcon showLabel={true}/>));

        expect(screen.getByText("Cart")).toBeInTheDocument();
    });

    test("відображає бейдж, коли в кошику є товари", () => {
        mockUseCart.mockReturnValue({
            cart: {
                itemCount: 5,
            },
        });

        render(createRouterWrapper(<CartIcon/>));

        expect(screen.getByText("5")).toBeInTheDocument();
    });

    test("не відображає бейдж, коли кошик порожній", () => {
        mockUseCart.mockReturnValue({
            cart: {
                itemCount: 0,
            },
        });

        render(createRouterWrapper(<CartIcon/>));

        expect(screen.queryByText("0")).not.toBeInTheDocument();
    });
});