import { checkForDate } from "../src/client/js/dateChecker"

describe("Testing the checkDate functionality", () => {
    test("Testing the checkForDate() function", () => {
        expect(checkForDate).toBeDefined();
    });
    test('should return true for dates within the next 15 days', () => {
        const today = new Date();
        const fifteenDaysLater = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000);
        expect(checkForDate(fifteenDaysLater)).toBe(true);
    });
    test('should return false for dates more than 15 days in the future', () => {
        const today = new Date();
        const sixteenDaysLater = new Date(today.getTime() + 16 * 24 * 60 * 60 * 1000);
        expect(checkForDate(sixteenDaysLater)).toBe(false);
    });

    test('should return true for today\'s date', () => {
        const today = new Date();
        expect(checkForDate(today)).toBe(true);
    });

    test('should return false for dates in the past', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        expect(checkForDate(yesterday)).toBe(false);
    });

    test('should return true for dates exactly 15 days in the future', () => {
        const today = new Date();
        const fifteenDaysLater = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000);
        expect(checkForDate(fifteenDaysLater)).toBe(true);
    });
});