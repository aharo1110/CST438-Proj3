/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    knex.schema.hasTable('users').then(function (exists) {
        if (!exists) {
          return knex.schema.createTable('users', function (t) {
            t.increments('user_id').primary();
            t.string('username', 60);
            t.string('display_name', 60);
            t.string('phone', 10);
            t.string('email', 60);
            t.string('google_id', 60);
            t.boolean('is_admin').defaultTo(false);
          });
        }
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
