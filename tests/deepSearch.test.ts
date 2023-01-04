import { isDeepSearch } from '../src/deepSearch';

describe('call isDeepSearch', () => {
    describe('on plain object', () => {
        test('using standard find', () => {
            const plainObject = {
                street: 'teststreet',
                city: 'testcity',
                zipCode: 'zip code',
            };

            expect(isDeepSearch(plainObject, 'test')).toBe(true);

            expect(isDeepSearch(plainObject, 'foo')).toBe(false);
        });

        test('using and-find', () => {
            const plainObject = {
                street: 'teststreet',
                city: 'testcity',
                zipCode: 'zip code',
            };

            expect(isDeepSearch(plainObject, 'zip code')).toBe(true);

            expect(isDeepSearch(plainObject, 'foo bar')).toBe(false);
        });

        test('using or-find', () => {
            const plainObject = {
                street: 'teststreet',
                city: 'testcity',
                zipCode: 'zip code',
            };

            expect(isDeepSearch(plainObject, 'zip, foo')).toBe(true);
            expect(isDeepSearch(plainObject, 'test, foo')).toBe(true);
            expect(isDeepSearch(plainObject, 'foo, zip')).toBe(true);
            expect(isDeepSearch(plainObject, 'foo, test')).toBe(true);

            expect(isDeepSearch(plainObject, 'foo, bar')).toBe(false);
        });

        test('using and- + or-find', () => {
            const plainObject = {
                street: 'teststreet',
                city: 'testcity',
                zipCode: 'zip code',
            };

            expect(isDeepSearch(plainObject, 'zip code, foo')).toBe(true);
            expect(isDeepSearch(plainObject, 'foo bar, zip')).toBe(true);
            expect(isDeepSearch(plainObject, 'foo bar, test')).toBe(true);

            expect(isDeepSearch(plainObject, 'test foo, bar')).toBe(false);
            expect(isDeepSearch(plainObject, 'zip foo, bar')).toBe(false);
            expect(isDeepSearch(plainObject, 'foo bar, baz')).toBe(false);
        });
    });
    describe('on complex object', () => {
        test('using standard find', () => {
            const complexObject = {
                street: 'teststreet',
                city: 'testcity',
                zipCode: 'zip code',
                isMetropol: false,
                hasSubway: true,
                getFlagName: () => 'flag name',
                numberOfCitizens: 25000,
                needOfElectricity: BigInt(100000),
                mayor: undefined,
                employeeOfTheMonth: null,
                symbol: Symbol('test symbol'),
            };

            expect(isDeepSearch(complexObject, 'city')).toBe(true);
            expect(isDeepSearch(complexObject, 'zip')).toBe(true);
            expect(isDeepSearch(complexObject, '25')).toBe(true);
            expect(isDeepSearch(complexObject, '10')).toBe(true);
            expect(isDeepSearch(complexObject, 'true')).toBe(true);
            expect(isDeepSearch(complexObject, 'false')).toBe(true);
            expect(isDeepSearch(complexObject, 'symbol')).toBe(true);
            expect(isDeepSearch(complexObject, '1')).toBe(true);
            expect(isDeepSearch(complexObject, '0')).toBe(true);

            expect(isDeepSearch(complexObject, 'mayor')).toBe(false);
            expect(isDeepSearch(complexObject, 'zipCode')).toBe(false);
            expect(isDeepSearch(complexObject, 'flag')).toBe(false);
            expect(isDeepSearch(complexObject, '4')).toBe(false);
        });

        test('using and-find', () => {
            const complexObject = {
                street: 'teststreet',
                city: 'testcity',
                zipCode: 'zip code',
                isMetropol: false,
                hasSubway: true,
                getFlagName: () => 'flag name',
                numberOfCitizens: 25000,
                needOfElectricity: BigInt(100000),
                mayor: undefined,
                employeeOfTheMonth: null,
                symbol: Symbol('test symbol'),
            };

            expect(isDeepSearch(complexObject, 'zip code')).toBe(true);
            expect(isDeepSearch(complexObject, 'test symbol')).toBe(true);

            expect(isDeepSearch(complexObject, 'mayor zip')).toBe(false);
            expect(isDeepSearch(complexObject, 'code test')).toBe(false);
            expect(isDeepSearch(complexObject, 'flag name')).toBe(false);
        });

        test('using or-find', () => {
            const complexObject = {
                street: 'teststreet',
                city: 'testcity',
                zipCode: 'zip code',
                isMetropol: false,
                hasSubway: true,
                getFlagName: () => 'flag name',
                numberOfCitizens: 25000,
                needOfElectricity: BigInt(100000),
                mayor: undefined,
                employeeOfTheMonth: null,
                symbol: Symbol('test symbol'),
            };

            expect(isDeepSearch(complexObject, 'zip, bar')).toBe(true);
            expect(isDeepSearch(complexObject, 'symbol, foo')).toBe(true);

            expect(isDeepSearch(complexObject, 'mayor, foo')).toBe(false);
            expect(isDeepSearch(complexObject, 'name, bar')).toBe(false);
            expect(isDeepSearch(complexObject, 'baz, bar')).toBe(false);
        });

        test('using and- + or-find', () => {
            const complexObject = {
                street: 'teststreet',
                city: 'testcity',
                zipCode: 'zip code',
                isMetropol: false,
                hasSubway: true,
                getFlagName: () => 'flag name',
                numberOfCitizens: 25000,
                needOfElectricity: BigInt(100000),
                mayor: undefined,
                employeeOfTheMonth: null,
                symbol: Symbol('test symbol'),
            };

            expect(isDeepSearch(complexObject, 'zip code, bar')).toBe(true);
            expect(isDeepSearch(complexObject, 'zip bar, city')).toBe(true);
            expect(isDeepSearch(complexObject, 'test symbol, bar')).toBe(true);
            expect(isDeepSearch(complexObject, 'symbol bar, city')).toBe(true);

            expect(isDeepSearch(complexObject, 'mayor bar, foo')).toBe(false);
            expect(isDeepSearch(complexObject, 'name baz, bar')).toBe(false);
            expect(isDeepSearch(complexObject, 'foo baz, bar')).toBe(false);
        });
    });
    describe('on nested complex object', () => {
        test('using standard find', () => {
            const nestedComplexObject = {
                name: 'jonas',
                surName: 'testason',
                age: 67,
                gender: undefined,
                money: BigInt(25000),
                isTall: true,
                hasCats: false,
                getDogName: () => 'doggo',
                symbol: Symbol('just a symbol'),
                address: {
                    country: {
                        name: 'testcountry',
                        population: 527000,
                        hasMonarchy: false,
                        getNationalAnthem: () => 'text',
                    },
                    street: 'teststreet',
                    city: 'testcity',
                    zipCode: 'zip code',
                    isMetropol: false,
                    hasSubway: true,
                    getFlagName: () => 'flag name',
                    numberOfCitizens: 25000,
                    needOfElectricity: BigInt(100000),
                    mayor: undefined,
                    employeeOfTheMonth: null,
                    symbol: Symbol('test symbol'),
                },
            };

            expect(isDeepSearch(nestedComplexObject, 'city')).toBe(true);
            expect(isDeepSearch(nestedComplexObject, 'zip')).toBe(true);
            expect(isDeepSearch(nestedComplexObject, '25')).toBe(true);
            expect(isDeepSearch(nestedComplexObject, '10')).toBe(true);
            expect(isDeepSearch(nestedComplexObject, 'true')).toBe(true);
            expect(isDeepSearch(nestedComplexObject, 'false')).toBe(true);
            expect(isDeepSearch(nestedComplexObject, 'symbol')).toBe(true);
            expect(isDeepSearch(nestedComplexObject, '1')).toBe(true);
            expect(isDeepSearch(nestedComplexObject, '0')).toBe(true);
            expect(isDeepSearch(nestedComplexObject, '527')).toBe(true);
            expect(isDeepSearch(nestedComplexObject, 'country')).toBe(true);

            expect(isDeepSearch(nestedComplexObject, 'mayor')).toBe(false);
            expect(isDeepSearch(nestedComplexObject, 'zipCode')).toBe(false);
            expect(isDeepSearch(nestedComplexObject, 'flag')).toBe(false);
            expect(isDeepSearch(nestedComplexObject, '4')).toBe(false);
        });

        test('using and-find', () => {
            const nestedComplexObject = {
                name: 'jonas',
                surName: 'testason',
                age: 67,
                gender: undefined,
                money: BigInt(25000),
                isTall: true,
                hasCats: false,
                getDogName: () => 'doggo',
                symbol: Symbol('just a symbol'),
                address: {
                    country: {
                        name: 'testcountry',
                        population: 527000,
                        hasMonarchy: false,
                        getNationalAnthem: () => 'text',
                    },
                    street: 'teststreet',
                    city: 'testcity',
                    zipCode: 'zip code',
                    isMetropol: false,
                    hasSubway: true,
                    getFlagName: () => 'flag name',
                    numberOfCitizens: 25000,
                    needOfElectricity: BigInt(100000),
                    mayor: undefined,
                    employeeOfTheMonth: null,
                    symbol: Symbol('test symbol'),
                },
            };

            expect(isDeepSearch(nestedComplexObject, 'zip code')).toBe(true);
            expect(isDeepSearch(nestedComplexObject, 'test symbol')).toBe(true);

            expect(isDeepSearch(nestedComplexObject, 'mayor zip')).toBe(false);
            expect(isDeepSearch(nestedComplexObject, 'code test')).toBe(false);
            expect(isDeepSearch(nestedComplexObject, 'flag name')).toBe(false);
        });

        test('using or-find', () => {
            const nestedComplexObject = {
                name: 'jonas',
                surName: 'testason',
                age: 67,
                gender: undefined,
                money: BigInt(25000),
                isTall: true,
                hasCats: false,
                getDogName: () => 'doggo',
                symbol: Symbol('just a symbol'),
                address: {
                    country: {
                        name: 'testcountry',
                        population: 527000,
                        hasMonarchy: false,
                        getNationalAnthem: () => 'text',
                    },
                    street: 'teststreet',
                    city: 'testcity',
                    zipCode: 'zip code',
                    isMetropol: false,
                    hasSubway: true,
                    getFlagName: () => 'flag name',
                    numberOfCitizens: 25000,
                    needOfElectricity: BigInt(100000),
                    mayor: undefined,
                    employeeOfTheMonth: null,
                    symbol: Symbol('test symbol'),
                },
            };

            expect(isDeepSearch(nestedComplexObject, 'zip, bar')).toBe(true);
            expect(isDeepSearch(nestedComplexObject, 'symbol, foo')).toBe(true);

            expect(isDeepSearch(nestedComplexObject, 'mayor, foo')).toBe(false);
            expect(isDeepSearch(nestedComplexObject, 'name, bar')).toBe(false);
            expect(isDeepSearch(nestedComplexObject, 'baz, bar')).toBe(false);
        });

        test('using and- + or-find', () => {
            const nestedComplexObject = {
                name: 'jonas',
                surName: 'testason',
                age: 67,
                gender: undefined,
                money: BigInt(25000),
                isTall: true,
                hasCats: false,
                getDogName: () => 'doggo',
                symbol: Symbol('just a symbol'),
                address: {
                    country: {
                        name: 'testcountry',
                        population: 527000,
                        hasMonarchy: false,
                        getNationalAnthem: () => 'text',
                    },
                    street: 'teststreet',
                    city: 'testcity',
                    zipCode: 'zip code',
                    isMetropol: false,
                    hasSubway: true,
                    getFlagName: () => 'flag name',
                    numberOfCitizens: 25000,
                    needOfElectricity: BigInt(100000),
                    mayor: undefined,
                    employeeOfTheMonth: null,
                    symbol: Symbol('test symbol'),
                },
            };

            expect(isDeepSearch(nestedComplexObject, 'zip code, bar')).toBe(true);
            expect(isDeepSearch(nestedComplexObject, 'zip bar, city')).toBe(true);
            expect(isDeepSearch(nestedComplexObject, 'test symbol, bar')).toBe(true);
            expect(isDeepSearch(nestedComplexObject, 'symbol bar, city')).toBe(true);

            expect(isDeepSearch(nestedComplexObject, 'mayor bar, foo')).toBe(false);
            expect(isDeepSearch(nestedComplexObject, 'name baz, bar')).toBe(false);
            expect(isDeepSearch(nestedComplexObject, 'foo baz, bar')).toBe(false);
        });
    });
});
