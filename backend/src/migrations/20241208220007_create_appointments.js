/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  knex.schema.hasTable('appointments').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('appointments', function (t) {
        t.increments('appointment_id').primary();
        t.integer('service_id').unsigned().notNullable();
        t.integer('user_id').unsigned().notNullable();
        t.integer('pet_id').unsigned().notNullable();
        t.date('appointment_date');
        t.time('appointment_time');

        t.foreign('service_id').references('service_id').inTable('services');
        t.foreign('user_id').references('user_id').inTable('users');
        t.foreign('pet_id').references('pet_id').inTable('pets');
      });
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
