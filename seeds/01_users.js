exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          id: 1,
          username: 'admin',
          hashed_password:'$2a$10$1TqtrM2gmNM.TGUaZR50Ze.kKLg.OGGUBLhjj3JGckki5f50gQjoe',
          email: 'admin@admin.com'
        }, //password = password
        {
          id: 2,
          username: 'joshua',
          hashed_password: '$2a$10$dSPsO6lmnSRHVqD9mS7vJOjiNybiDQf8a69rjaloFzkrZ27jkV8Ye', email: 'joshua@me.com'
        }, //password = qwerty
        {
          id: 3,
          username: 'heather',
          hashed_password: '$2a$10$Fc.LzEYTQVz45lXPiZNlZeHITNWLEWierUxBSv5VPZu6f3GIamPTS', email: 'heather@hotmail.com'
        } //password = cookie
      ]);
    })
    .then(() => {
        return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));")
      })
};
