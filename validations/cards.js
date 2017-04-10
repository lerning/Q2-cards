'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    front: Joi.string()
            .label('Front')
            .required()
            .trim(),
            
    back: Joi.string()
            .label('Back')
            .required()
            .trim()
  }
};
