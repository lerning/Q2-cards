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
          front: '1 + 5',
          back: '6',
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
        {
          id: 9,
          front: 'AJAX',
          back: 'Asynchronous Java Scrip and XML',
          deck_id: 5,
          got_it: false
        },
        {
          id: 10,
          front: 'AJAX is a ...',
          back: 'Framework for building a RIA that uses features already built into modern browsers',
          deck_id: 5,
          got_it: false
        },
        {
          id: 11,
          front: 'DOM',
          back: 'A standard that defines that logical structure of documents and the way a document is accessed and manipulated.',
          deck_id: 5,
          got_it: false
        },
        {
          id: 12,
          front: 'Asynchronous',
          back: 'The script allows the page to continue working normally, and it will deal with the the response when it is received.',
          deck_id: 5,
          got_it: false
        },
        {
          id: 13,
          front: 'JSON is ...',
          back: 'The data returned by web services and page methods.',
          deck_id: 5,
          got_it: false
        },
        {
          id: 14,
          front: 'JSON',
          back: 'JavaScript Object Notation',
          deck_id: 5,
          got_it: false
        },
        {
          id: 15,
          front: 'Synchronous',
          back: 'The script will stop and wait for the server\'s response.',
          deck_id: 5,
          got_it: false
        }
      ]);
    })
    .then(() => {
  return knex.raw("SELECT setval('cards_id_seq', (SELECT MAX(id) FROM cards));")
      })
};
