import {
    formatPrice,
    formatDate,
    formatDateTime,
    truncateText,
    formatRating,
    formatOrderId,
    formatPhoneNumber,
    formatCardNumber,
    maskCardNumber
} from './formatters';

describe('formatUtils', () => {
    describe('formatPrice', () => {
        test('форматує ціну в гривнях', () => {
            expect(formatPrice(1000)).toMatch(/^1\s000,00\s₴$/);
            expect(formatPrice(1234.56)).toMatch(/^1\s234,56\s₴$/);
            expect(formatPrice(0)).toMatch(/^0,00\s₴$/);
        });
    });

    describe('formatDate', () => {
        test('форматує дату із об\'єкту Date', () => {
            const date = new Date(2023, 0, 15); // 15 січня 2023
            expect(formatDate(date)).toBe('15 січня 2023 р.');
        });

        test('форматує дату із рядка', () => {
            expect(formatDate('2023-01-15')).toBe('15 січня 2023 р.');
        });
    });

    describe('formatDateTime', () => {
        test('форматує дату та час із об\'єкту Date', () => {
            const dateTime = new Date(2023, 0, 15, 14, 30); // 15 січня 2023, 14:30
            expect(formatDateTime(dateTime)).toBe('15 січня 2023 р., 14:30');
        });

        test('форматує дату та час із рядка', () => {
            expect(formatDateTime('2023-01-15T14:30:00')).toBe('15 січня 2023 р., 14:30');
        });
    });

    describe('truncateText', () => {
        test('обрізає текст, що перевищує максимальну довжину', () => {
            expect(truncateText('Це довгий текст для тестування', 10)).toBe('Це довгий...');
        });

        test('не змінює текст, якщо він коротший за максимальну довжину', () => {
            expect(truncateText('Короткий', 10)).toBe('Короткий');
        });

        test('не змінює текст, якщо він дорівнює максимальній довжині', () => {
            expect(truncateText('1234567890', 10)).toBe('1234567890');
        });
    });

    describe('formatRating', () => {
        test('форматує рейтинг до одного десяткового знаку', () => {
            expect(formatRating(4.5)).toBe('4.5');
            expect(formatRating(3)).toBe('3.0');
            expect(formatRating(2.75)).toBe('2.8');
        });
    });

    describe('formatOrderId', () => {
        test('додає символ # до ідентифікатора замовлення та переводить у верхній регістр', () => {
            expect(formatOrderId('abc123')).toBe('#ABC123');
            expect(formatOrderId('DEF456')).toBe('#DEF456');
        });
    });

    describe('formatPhoneNumber', () => {
        test('форматує номер телефону у форматі (XXX) XXX-XXXX', () => {
            expect(formatPhoneNumber('1234567890')).toBe('(123) 456-7890');
            expect(formatPhoneNumber('123-456-7890')).toBe('(123) 456-7890');
            expect(formatPhoneNumber('(123) 456-7890')).toBe('(123) 456-7890');
        });

        test('повертає оригінальний номер, якщо він не відповідає патерну', () => {
            expect(formatPhoneNumber('12345')).toBe('12345');
            expect(formatPhoneNumber('12345678901')).toBe('12345678901');
        });
    });

    describe('formatCardNumber', () => {
        test('розділяє номер картки групами по 4 цифри', () => {
            expect(formatCardNumber('1234567890123456')).toBe('1234 5678 9012 3456');
            expect(formatCardNumber('1234 5678 9012 3456')).toBe('1234 5678 9012 3456');
            expect(formatCardNumber('12345678')).toBe('1234 5678');
        });
    });

    describe('maskCardNumber', () => {
        test('маскує номер картки, залишаючи тільки останні 4 цифри', () => {
            expect(maskCardNumber('1234567890123456')).toBe('**** **** **** 3456');
            expect(maskCardNumber('1234 5678 9012 3456')).toBe('**** **** **** 3456');
        });

        test('не маскує короткі номери карток', () => {
            expect(maskCardNumber('123')).toBe('123');
        });

        test('правильно маскує картки різної довжини', () => {
            expect(maskCardNumber('12345678')).toBe('**** 5678');
            expect(maskCardNumber('123456781234')).toBe('**** **** 1234');
        });
    });
});