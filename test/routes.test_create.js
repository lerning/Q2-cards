'use strict';

process.env.NODE_ENV = 'test';

const {
  suite,
  test
} = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const app = require('../app');

beforeEach((done) => {
  knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
        .then(() => {
          return knex.seed.run()
            .then(() => {
              done();
            });
        });
    });
});

afterEach((done) => {
  knex.migrate.rollback()
    .then(() => {
      done();
    });
});

describe('GET /create', () => {
  it('Directs to /create', done => {
    request(app)
      .get('/create')
      .expect('Content-Type', /text/)
      .expect(302, done)
  })
});
describe('GET /decks', () => {
  it('Directs to /decks', done => {
    request(app)
      .get('/decks')
      .expect('Content-Type', /text/)
      .expect(302, done)
  })
});

describe('GET /index', () => {
  it('Directs to /index', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /text/)
      .expect(200, done)
  })
});

describe('GET /signup', () => {
  it('Directs to /signup', done => {
    request(app)
      .get('/signup')
      .expect('Content-Type', /text/)
      .expect(200, done)
  })
});
