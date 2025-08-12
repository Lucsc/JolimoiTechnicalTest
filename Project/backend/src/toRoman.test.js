import toRoman from './toRoman.js';

describe('toRoman', () => {
    test('should convert 1 to I', () => {
        expect(toRoman(1)).toBe('I');
    });

    test('should convert 4 to IV', () => {
        expect(toRoman(4)).toBe('IV');
    });

    test('should convert 9 to IV', () => {
        expect(toRoman(9)).toBe('IX');
    });

    test('should convert 59 to LIX', () => {
        expect(toRoman(59)).toBe('LIX');
    });

    test('should convert 100 to C', () => {
        expect(toRoman(100)).toBe('C');
    });
    
    test('should return empty string for 0', () => {
        expect(toRoman(0)).toBe('');
    });
    
    test('should return empty string for negative numbers', () => {
        expect(toRoman(-1)).toBe('');
    });
});
    