'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    username: Joi.string()
            .label('Name')
            .required()
            .trim(),

    email: Joi.string()
            .label('Email')
            .email()
            .required()
            .trim(),

    hashed_password: Joi.string()
            .label('Password')
            .required()
            .trim()
            .min(8)
  }
};
