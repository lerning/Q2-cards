exports.up = function(knex) {
   return knex.schema.createTable('cards', (table) => {
      table.increments();
      table.string('front', 255).notNullable().defaultTo('');
      table.string('back', 255).notNullable().defaultTo('');
      table.integer('deck_id').references('id').inTable('decks').notNullable().onDelete('CASCADE');
      table.boolean('got_it').notNullable().defaultTo(false)
      table.timestamps(true, true);
   });
};

exports.down = function(knex) {
   return knex.schema.dropTable('cards');
};
