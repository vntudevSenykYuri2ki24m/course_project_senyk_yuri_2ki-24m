import { renderHook, act } from '@testing-library/react';
import { usePagination } from './usePagination';

describe('usePagination', () => {
    test('повертає правильні початкові значення', () => {
        const { result } = renderHook(() => usePagination(100));

        expect(result.current.currentPage).toBe(1);
        expect(result.current.totalPages).toBe(9);
        expect(result.current.startIndex).toBe(0);
        expect(result.current.endIndex).toBe(12);
        expect(result.current.hasNextPage).toBe(true);
        expect(result.current.hasPreviousPage).toBe(false);
    });

    test('приймає і використовує кастомні опції', () => {
        const { result } = renderHook(() =>
            usePagination(100, { initialPage: 2, itemsPerPage: 10, siblingCount: 2 })
        );

        expect(result.current.currentPage).toBe(2);
        expect(result.current.totalPages).toBe(10);
        expect(result.current.startIndex).toBe(10);
        expect(result.current.endIndex).toBe(20);
    });

    test('nextPage працює коректно', () => {
        const { result } = renderHook(() => usePagination(100));

        act(() => {
            result.current.nextPage();
        });

        expect(result.current.currentPage).toBe(2);
        expect(result.current.startIndex).toBe(12);
        expect(result.current.endIndex).toBe(24);
    });

    test('previousPage працює коректно', () => {
        const { result } = renderHook(() =>
            usePagination(100, { initialPage: 3 })
        );

        act(() => {
            result.current.previousPage();
        });

        expect(result.current.currentPage).toBe(2);
        expect(result.current.startIndex).toBe(12);
        expect(result.current.endIndex).toBe(24);
    });

    test('goToPage встановлює правильну сторінку', () => {
        const { result } = renderHook(() => usePagination(100));

        act(() => {
            result.current.goToPage(5);
        });

        expect(result.current.currentPage).toBe(5);
        expect(result.current.startIndex).toBe(48);
        expect(result.current.endIndex).toBe(60);
    });

    test('goToPage зберігає коректний діапазон сторінок', () => {
        const { result } = renderHook(() => usePagination(100));

        act(() => {
            result.current.goToPage(15);
        });

        expect(result.current.currentPage).toBe(9);

        act(() => {
            result.current.goToPage(-5);
        });

        expect(result.current.currentPage).toBe(1);
    });

    test('firstPage переходить на першу сторінку', () => {
        const { result } = renderHook(() =>
            usePagination(100, { initialPage: 5 })
        );

        act(() => {
            result.current.firstPage();
        });

        expect(result.current.currentPage).toBe(1);
    });

    test('lastPage переходить на останню сторінку', () => {
        const { result } = renderHook(() => usePagination(100));

        act(() => {
            result.current.lastPage();
        });

        expect(result.current.currentPage).toBe(9);
    });

    test('pageNumbers повертає всі номери сторінок для невеликої кількості сторінок', () => {
        const { result } = renderHook(() =>
            usePagination(30, { itemsPerPage: 10 })
        );

        expect(result.current.pageNumbers).toEqual([1, 2, 3]);
    });

    test('pageNumbers містить "..." для великої кількості сторінок', () => {
        const { result } = renderHook(() =>
            usePagination(200, { itemsPerPage: 10, siblingCount: 1 })
        );

        expect(result.current.pageNumbers[0]).toBe(1);
        expect(result.current.pageNumbers).toContain("...");
        expect(result.current.pageNumbers[result.current.pageNumbers.length - 1]).toBe(20);

        act(() => {
            result.current.goToPage(10);
        });

        expect(result.current.pageNumbers[0]).toBe(1);
        expect(result.current.pageNumbers).toContain("...");
        expect(result.current.pageNumbers).toContain(10);
        expect(result.current.pageNumbers[result.current.pageNumbers.length - 1]).toBe(20);

        act(() => {
            result.current.goToPage(20);
        });

        expect(result.current.pageNumbers[0]).toBe(1);
        expect(result.current.pageNumbers).toContain("...");
        expect(result.current.pageNumbers[result.current.pageNumbers.length - 1]).toBe(20);
    });

    test('hasNextPage і hasPreviousPage повертають правильні значення', () => {
        const { result } = renderHook(() =>
            usePagination(30, { itemsPerPage: 10 })
        );

        expect(result.current.hasNextPage).toBe(true);
        expect(result.current.hasPreviousPage).toBe(false);

        act(() => {
            result.current.nextPage();
        });

        expect(result.current.hasNextPage).toBe(true);
        expect(result.current.hasPreviousPage).toBe(true);

        act(() => {
            result.current.nextPage();
        });

        expect(result.current.hasNextPage).toBe(false);
        expect(result.current.hasPreviousPage).toBe(true);
    });

    test('endIndex правильно обмежується кількістю елементів', () => {
        const { result } = renderHook(() =>
            usePagination(25, { itemsPerPage: 10 })
        );

        act(() => {
            result.current.goToPage(3);
        });

        expect(result.current.startIndex).toBe(20);
        expect(result.current.endIndex).toBe(25);
    });
});