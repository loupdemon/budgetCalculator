import Joi from 'joi';
import { CurrencyValues, RepeatingPeriod } from '@/enums';

export const inputSchema = Joi.object({
    currency: Joi.string().allow(CurrencyValues.EUR).required(),
    comment: Joi.string().allow('').required(),
    date: Joi.string().required(),
    id: Joi.number().required(),
    value: Joi.number().required(),
    repeatPeriod: Joi.string()
        .allow(
            RepeatingPeriod.Once,
            RepeatingPeriod.EveryTwoMonth,
            RepeatingPeriod.EveryThreeMonth,
            RepeatingPeriod.EveryFourMonth,
            RepeatingPeriod.EveryFiveMonth,
            RepeatingPeriod.EverySixMonth
        )
        .required(),
    tag: Joi.string().allow('').required()
}).unknown(false);
