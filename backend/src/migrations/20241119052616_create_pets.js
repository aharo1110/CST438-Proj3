/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    knex.schema.hasTable('pets').then(function (exists) {
        if (!exists) {
          return knex.schema.createTable('pets', function (t) {
            t.increments('pet_id').primary();
            t.integer('owner').unsigned().notNullable();
            t.string('name', 60);
            t.string('type', 60);
            t.string('breed', 60);
            t.string('sex', 6);
            t.date('dob');

            t.foreign('owner').references('user_id').inTable('users');
          });
        }
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('pets');
};
