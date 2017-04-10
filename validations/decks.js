'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    name: Joi.string()
            .label('Deck Name')
            .required()
            .trim()
  }
};
