import { inputSchema } from '@/schemas/transaction-input.schema';
/**
 * Function that validates scheme of income/expense object sent to it
 * @param {Object[]} object 
 * @returns boolean
 */
export function isValidTransactionObject(object) {
    const validationResult = inputSchema.validate(object);
    return validationResult.error === undefined;
}
/**
 * Function that validates input value if it is null or not
 * @param {String} value 
 * @returns boolean
 */
export function inputExists(value) {
    return value !== null && value !== undefined && value !== '';
}
