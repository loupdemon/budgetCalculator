import { inputSchema } from '@/schemas/transaction-input.schema';

export function isValidTransactionObject(object) {
    const validationResult = inputSchema.validate(object);
    return validationResult.error === undefined;
}

export function inputExists(value) {
    return value !== null && value !== undefined && value !== '';
}
