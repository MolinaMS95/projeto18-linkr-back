import joi from 'joi';

const idSchema = joi.string().pattern(new RegExp('^[1-9][0-9]*$')).required();

export default idSchema;