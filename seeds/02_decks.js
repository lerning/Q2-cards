exports.seed = function(knex, Promise) {
  return knex('decks').del()
    .then(function () {
      return knex('decks').insert([
        {
          id: 1,
          name: 'Vocabulary I',
          user_id: 3
        },
        {
          id: 2,
          name: 'Vocabulary II',
          user_id: 1
        },
        {
          id: 3,
          name: 'Math I',
          user_id: 2
        },
        {
          id: 4,
          name: 'History',
          user_id: 3
        },
        {
          id: 5,
          name: 'JavaScript',
          user_id: 3
        },
        {
          id: 6,
          name: 'HTML',
          user_id: 3
        },
        {
          id: 7,
          name: 'PostgreSQL',
          user_id: 3
        },
        {
          id: 8,
          name: 'CSS',
          user_id: 3
        },
        {
          id: 9,
          name: 'AJAX',
          user_id: 3
        },
        {
          id: 10,
          name: 'Server',
          user_id: 3
        },
        {
          id: 11,
          name: 'jQuery',
          user_id: 3
        }
      ]);
    })
    .then(() => {
  return knex.raw("SELECT setval('decks_id_seq', (SELECT MAX(id) FROM decks));")
      })
};
