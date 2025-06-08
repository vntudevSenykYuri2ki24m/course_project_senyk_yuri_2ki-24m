import {
    isValidEmail,
    isValidPhone,
    isValidZipCode,
    isValidCardNumber,
    isValidCVV,
    isValidExpiryDate,
    isValidName,
    isValidAddress,
    validateCheckoutForm
} from './validators';

describe('Validators', () => {
    describe('isValidEmail', () => {
        test('повинен повертати true для дійсних email', () => {
            expect(isValidEmail('test@example.com')).toBe(true);
            expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
            expect(isValidEmail('name+tag@example.org')).toBe(true);
        });

        test('повинен повертати false для недійсних email', () => {
            expect(isValidEmail('invalid')).toBe(false);
            expect(isValidEmail('invalid@')).toBe(false);
            expect(isValidEmail('@example.com')).toBe(false);
            expect(isValidEmail('test@example')).toBe(false);
            expect(isValidEmail('test@.com')).toBe(false);
            expect(isValidEmail('test@example.')).toBe(false);
            expect(isValidEmail('test with spaces@example.com')).toBe(false);
        });
    });

    describe('isValidPhone', () => {
        test('повинен повертати true для дійсних телефонних номерів', () => {
            expect(isValidPhone('0971234567')).toBe(true);
            expect(isValidPhone('+380971234567')).toBe(true);
            expect(isValidPhone('(097) 123-4567')).toBe(true);
            expect(isValidPhone('097-123-4567')).toBe(true);
        });

        test('повинен повертати false для недійсних телефонних номерів', () => {
            expect(isValidPhone('123')).toBe(false);
            expect(isValidPhone('abcdefghijk')).toBe(false);
            expect(isValidPhone('+380a971234567')).toBe(false);
            expect(isValidPhone('12345678901234567890')).toBe(false);
        });
    });

    describe('isValidZipCode', () => {
        test('повинен повертати true для дійсних поштових індексів', () => {
            expect(isValidZipCode('12345')).toBe(true);
            expect(isValidZipCode('12345-6789')).toBe(true);
        });

        test('повинен повертати false для недійсних поштових індексів', () => {
            expect(isValidZipCode('1234')).toBe(false);
            expect(isValidZipCode('123456')).toBe(false);
            expect(isValidZipCode('12345-678')).toBe(false);
            expect(isValidZipCode('12345-67890')).toBe(false);
            expect(isValidZipCode('abcde')).toBe(false);
        });
    });

    describe('isValidCardNumber', () => {
        test('повинен повертати true для дійсних номерів карток', () => {
            expect(isValidCardNumber('4532015112830366')).toBe(true); // Visa
            expect(isValidCardNumber('5555555555554444')).toBe(true); // MasterCard
            expect(isValidCardNumber('4111 1111 1111 1111')).toBe(true); // з пробілами
        });

        test('повинен повертати false для недійсних номерів карток', () => {
            expect(isValidCardNumber('1234567890123')).toBe(false); // неправильна довжина
            expect(isValidCardNumber('1234567890123456789012')).toBe(false); // неправильна довжина
            expect(isValidCardNumber('4532015112830367')).toBe(false); // неправильна контрольна сума
        });
    });

    describe('isValidCVV', () => {
        test('повинен повертати true для дійсних CVV-кодів', () => {
            expect(isValidCVV('123')).toBe(true);
            expect(isValidCVV('1234')).toBe(true);
        });

        test('повинен повертати false для недійсних CVV-кодів', () => {
            expect(isValidCVV('12')).toBe(false);
            expect(isValidCVV('12345')).toBe(false);
            expect(isValidCVV('abc')).toBe(false);
        });
    });

    describe('isValidExpiryDate', () => {
        test('повинен повертати true для дійсних дат закінчення терміну дії', () => {
            const today = new Date();
            const currentMonth = today.getMonth() + 1;
            const currentYear = today.getFullYear();

            // Поточний місяць/рік
            const currentExpiry = `${String(currentMonth).padStart(2, '0')}/${String(currentYear % 100)}`;

            // Наступний місяць
            const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
            const nextMonthYear = currentMonth === 12 ? currentYear + 1 : currentYear;
            const nextMonthExpiry = `${String(nextMonth).padStart(2, '0')}/${String(nextMonthYear % 100)}`;

            // Наступний рік
            const nextYearExpiry = `${String(currentMonth).padStart(2, '0')}/${String((currentYear + 1) % 100)}`;

            expect(isValidExpiryDate(nextMonthExpiry)).toBe(true);
            expect(isValidExpiryDate(nextYearExpiry)).toBe(true);
        });

        test('повинен повертати false для недійсних дат закінчення терміну дії', () => {
            const today = new Date();
            const currentMonth = today.getMonth() + 1;
            const currentYear = today.getFullYear();

            // Минулий місяць
            const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
            const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;
            const lastMonthExpiry = `${String(lastMonth).padStart(2, '0')}/${String(lastMonthYear % 100)}`;

            // Минулий рік
            const lastYearExpiry = `${String(currentMonth).padStart(2, '0')}/${String((currentYear - 1) % 100)}`;

            expect(isValidExpiryDate(lastMonthExpiry)).toBe(false);
            expect(isValidExpiryDate(lastYearExpiry)).toBe(false);
            expect(isValidExpiryDate('00/25')).toBe(false);
            expect(isValidExpiryDate('13/25')).toBe(false);
            expect(isValidExpiryDate('ab/cd')).toBe(false);
            expect(isValidExpiryDate('1/25')).toBe(false);
            expect(isValidExpiryDate('01-25')).toBe(false);
        });
    });

    describe('isValidName', () => {
        test('повинен повертати true для дійсних імен', () => {
            expect(isValidName('John')).toBe(true);
            expect(isValidName('John Doe')).toBe(true);
            expect(isValidName('J.D.')).toBe(true);
        });

        test('повинен повертати false для недійсних імен', () => {
            expect(isValidName('')).toBe(false);
            expect(isValidName('A')).toBe(false);
            expect(isValidName('  ')).toBe(false);
            expect(isValidName('A'.repeat(51))).toBe(false);
        });
    });

    describe('isValidAddress', () => {
        test('повинен повертати true для дійсних адрес', () => {
            expect(isValidAddress('123 Main St')).toBe(true);
            expect(isValidAddress('Apt 4B, 567 Oak Ave')).toBe(true);
        });

        test('повинен повертати false для недійсних адрес', () => {
            expect(isValidAddress('')).toBe(false);
            expect(isValidAddress('123')).toBe(false);
            expect(isValidAddress('  ')).toBe(false);
            expect(isValidAddress('A'.repeat(201))).toBe(false);
        });
    });

    describe('validateCheckoutForm', () => {
        test('повинен повертати порожній об\'єкт для дійсної форми', () => {
            const form = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                phone: '+380971234567',
                address: '123 Main St',
                city: 'Kyiv',
                zipCode: '12345',
                cardNumber: '4111111111111111',
                cardName: 'John Doe',
                expiryDate: '12/30',
                cvv: '123'
            };

            expect(validateCheckoutForm(form)).toEqual({});
        });

        test('повинен повертати помилки для недійсної форми', () => {
            const form = {
                firstName: 'J',
                lastName: '',
                email: 'invalid-email',
                phone: '123',
                address: 'A',
                city: 'K',
                zipCode: '1234',
                cardNumber: '1234',
                cardName: 'J',
                expiryDate: '00/00',
                cvv: '12'
            };

            const errors = validateCheckoutForm(form);

            expect(Object.keys(errors).length).toBe(11);
            expect(errors.firstName).toBeTruthy();
            expect(errors.lastName).toBeTruthy();
            expect(errors.email).toBeTruthy();
            expect(errors.phone).toBeTruthy();
            expect(errors.address).toBeTruthy();
            expect(errors.city).toBeTruthy();
            expect(errors.zipCode).toBeTruthy();
            expect(errors.cardNumber).toBeTruthy();
            expect(errors.cardName).toBeTruthy();
            expect(errors.expiryDate).toBeTruthy();
            expect(errors.cvv).toBeTruthy();
        });
    });
});