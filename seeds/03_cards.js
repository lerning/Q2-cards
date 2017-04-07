exports.seed = function(knex, Promise) {
  return knex('cards').del()
    .then(function () {
      return knex('cards').insert([
        {
          id: 1,
          front: 'consider',
          back: 'deem to be',
          deck_id: 1,
          got_it: false
        },
        {
          id: 2,
          front: 'minute',
          back: 'infinitely or immeasurably small',
          deck_id: 1,
          got_it: false
        },
        {
          id: 3,
          front: '1 + 4',
          back: '5',
          deck_id: 3,
          got_it: false
        },
        {
          id: 4,
          front: '7 * 10',
          back: '70',
          deck_id: 3,
          got_it: false
        },
        {
          id: 5,
          front: 'chicanery',
          back: 'the use of tricks to deceive someone',
          deck_id: 2,
          got_it: false
        },
        {
          id: 6,
          front: 'garrulous',
          back: 'full of trivial conversation',
          deck_id: 2,
          got_it: false
        },
        {
          id: 7,
          front: 'Lexington and Concord (1775)',
          back: 'Site of the first shots of the American Revolution.',
          deck_id: 4,
          got_it: false
        },
        {
          id: 8,
          front: 'Sojourner Truth',
          back: 'Runaway slave who became a leader of the abolitionist and womens movements.',
          deck_id: 4,
          got_it: false
        },
      ]);
    })
    .then(() => {
  return knex.raw("SELECT setval('cards_id_seq', (SELECT MAX(id) FROM cards));")
      })
};
