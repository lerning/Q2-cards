exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          id: 1,
          username: 'Rhys',
          hashed_password:'$2a$10$1TqtrM2gmNM.TGUaZR50Ze.kKLg.OGGUBLhjj3JGckki5f50gQjoe',
          email: 'rhys@gmail.com'
        }, //password = password
        {
          id: 2,
          username: 'Joshua',
          hashed_password: '$2a$10$dSPsO6lmnSRHVqD9mS7vJOjiNybiDQf8a69rjaloFzkrZ27jkV8Ye', email: 'joshua@me.com'
        }, //password = qwerty
        {
          id: 3,
          username: 'Heather',
          hashed_password: '$2a$10$Fc.LzEYTQVz45lXPiZNlZeHITNWLEWierUxBSv5VPZu6f3GIamPTS', email: 'heather@hotmail.com'
        } //password = cookie
      ]);
    })
    .then(() => {
  return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));")
      })
};
