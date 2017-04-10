'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    front: Joi.string(),

    back: Joi.string()

  }
};
