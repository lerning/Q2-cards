exports.up = function(knex) {
   return knex.schema.createTable('decks', (table) => {
      table.increments();
      table.string('name', 255).notNullable().unique().defaultTo('');
      table.integer('user_id').references('id').inTable('users').notNullable().onDelete('CASCADE').index();
      table.timestamps(true, true);
   });
};

exports.down = function(knex) {
   return knex.schema.dropTable('decks');
};
