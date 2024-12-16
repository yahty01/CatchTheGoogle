/**
 * Утилитарный класс для генерации случайных целых чисел в указанном диапазоне.
 */
export class ShogunNumberUtility {
    /**
     * Генерирует случайное целое число в заданном диапазоне, включая обе границы.
     *
     * @param {number} fromInclusive - Нижняя граница диапазона (включительно).
     * @param {number} toInclusive - Верхняя граница диапазона (включительно).
     * @returns {number} Случайное целое число в диапазоне [fromInclusive, toInclusive].
     * @throws {TypeError} Если хотя бы один из аргументов не является числом.
     * @throws {RangeError} Если fromInclusive больше toInclusive.
     */
    getRandomIntegerNumber(fromInclusive, toInclusive) {
        if (typeof fromInclusive !== 'number' || typeof toInclusive !== 'number') {
            throw new TypeError('Аргументы должны быть числами');
        }
        if (fromInclusive > toInclusive) {
            throw new RangeError('fromInclusive должен быть меньше или равен toInclusive');
        }

        // Генерация случайного числа в диапазоне [fromInclusive, toInclusive]
        return Math.floor(Math.random() * (toInclusive - fromInclusive + 1)) + fromInclusive;
    }
}