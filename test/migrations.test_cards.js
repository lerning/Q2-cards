/* eslint-disable camelcase */

'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const {
  Suite,
  test
} = require('mocha');
const knex = require('../knex');


describe('migrations', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });


  it('cards columns', (done) => {

    knex('cards').columnInfo()
      .then((actual) => {
        const expected = {
          id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: 'nextval(\'cards_id_seq\'::regclass)'
          },

          front: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          back: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          deck_id: {
            type: 'integer',
            nullable: false,
            defaultValue: null,
            maxLength: null,
          }

        };
        for (const column in expected) {
          assert.deepEqual(
            actual[column],
            expected[column],
            `Column ${column} is not the same`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
