import joi from 'joi';

const initialSchema = joi.object({initial: joi.string().min(3).required()});

export default initialSchema;