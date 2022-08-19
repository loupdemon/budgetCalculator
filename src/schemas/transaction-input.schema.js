import Joi from 'joi';
import { CurrencyValues } from '@/enums';

export const inputSchema = Joi.object({
    currency: Joi.string().allow(CurrencyValues.EUR).required(),
    comment: Joi.string().allow('').required(),
    date: Joi.string().required(),
    id: Joi.number().required(),
    value: Joi.number().required(),
}).unknown(false);
