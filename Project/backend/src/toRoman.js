function toRoman(num) {
    const map = [
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 10, numeral: 'X' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ];
    
    let result = '';
    for (const { value, numeral } of map) {
        while (num >= value) {
            result += numeral;
            num -= value;
        }
    }
    return result;
}

export default toRoman;