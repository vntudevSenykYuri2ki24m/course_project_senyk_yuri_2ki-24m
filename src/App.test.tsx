import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('@tanstack/react-query', () => ({
    QueryClient: jest.fn().mockImplementation(() => ({})),
    QueryClientProvider: function MockQueryClientProvider(props: { children: React.ReactNode }) {
        return <div>{props.children}</div>;
    }
}));

jest.mock('@tanstack/react-query-devtools', () => ({
    ReactQueryDevtools: function MockReactQueryDevtools() {
        return null;
    }
}));

jest.mock('react-redux', () => ({
    Provider: function MockProvider(props: { children: React.ReactNode }) {
        return <div>{props.children}</div>;
    }
}));

jest.mock('@/store', () => ({
    store: {}
}));

jest.mock('@/components/common/Layout', () => ({
    Layout: function MockLayout(props: { children: React.ReactNode }) {
        return <div data-testid="макет">{props.children}</div>;
    }
}));

jest.mock('@/components/common/ErrorBoundary', () => ({
    ErrorBoundary: function MockErrorBoundary(props: { children: React.ReactNode }) {
        return <div data-testid="обробник-помилок">{props.children}</div>;
    }
}));

jest.mock('@/pages/Home', () => ({
    Home: function MockHome() {
        return <div data-testid="головна-сторінка">Головна сторінка</div>;
    }
}));

jest.mock('@/pages/Catalog', () => ({
    Catalog: function MockCatalog() {
        return <div data-testid="каталог">Каталог</div>;
    }
}));

jest.mock('@/pages/ProductDetail', () => ({
    ProductDetail: function MockProductDetail() {
        return <div data-testid="деталі-продукту">Деталі продукту</div>;
    }
}));

jest.mock('@/pages/Cart', () => ({
    Cart: function MockCart() {
        return <div data-testid="кошик">Кошик</div>;
    }
}));

jest.mock('@/pages/Checkout', () => ({
    Checkout: function MockCheckout() {
        return <div data-testid="оформлення-замовлення">Оформлення замовлення</div>;
    }
}));

jest.mock('@/pages/NotFound', () => ({
    NotFound: function MockNotFound() {
        return <div data-testid="сторінка-не-знайдена">Сторінка не знайдена</div>;
    }
}));

jest.mock('@/utils', () => ({
    ROUTES: {
        HOME: '/',
        CATALOG: '/catalog',
        PRODUCT_DETAIL: '/product/:id',
        CART: '/cart',
        CHECKOUT: '/checkout'
    }
}));

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');

    return {
        ...originalModule,
        BrowserRouter: function MockBrowserRouter(props: { children: React.ReactNode }) {
            return <div>{props.children}</div>;
        },
        Routes: function MockRoutes(props: { children: React.ReactNode }) {
            return <div>{props.children}</div>;
        },
        Route: function MockRoute({ path, element }: { path: string, element: React.ReactNode }) {
            return element;
        }
    };
});

describe('App компонент', () => {
    beforeEach(() => {
        window.history.pushState({}, '', '/');
    });

    test('рендерить компонент Layout', () => {
        render(<App />);
        expect(screen.getByTestId('макет')).toBeInTheDocument();
    });

    test('рендерить компонент ErrorBoundary', () => {
        render(<App />);
        expect(screen.getByTestId('обробник-помилок')).toBeInTheDocument();
    });

    test('рендерить головну сторінку за замовчуванням', () => {
        render(<App />);
        expect(screen.getByTestId('головна-сторінка')).toBeInTheDocument();
    });

    test('рендерить сторінку каталогу при переході на /catalog', () => {
        window.history.pushState({}, '', '/catalog');
        render(<App />);
        expect(screen.getByTestId('каталог')).toBeInTheDocument();
    });

    test('рендерить сторінку деталей продукту при переході на /product/123', () => {
        window.history.pushState({}, '', '/product/123');
        render(<App />);
        expect(screen.getByTestId('деталі-продукту')).toBeInTheDocument();
    });

    test('рендерить сторінку кошика при переході на /cart', () => {
        window.history.pushState({}, '', '/cart');
        render(<App />);
        expect(screen.getByTestId('кошик')).toBeInTheDocument();
    });

    test('рендерить сторінку оформлення замовлення при переході на /checkout', () => {
        window.history.pushState({}, '', '/checkout');
        render(<App />);
        expect(screen.getByTestId('оформлення-замовлення')).toBeInTheDocument();
    });

    test('рендерить сторінку 404 при переході на неіснуючий маршрут', () => {
        window.history.pushState({}, '', '/неіснуючий-маршрут');
        render(<App />);
        expect(screen.getByTestId('сторінка-не-знайдена')).toBeInTheDocument();
    });
});