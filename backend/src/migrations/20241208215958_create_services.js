/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  knex.schema.hasTable('services').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('services', function (t) {
        t.increments('service_id').primary();
        t.string('name', 60);
        t.string('description', 255);
        t.string('location', 100);
        t.string('address', 60);
        t.string('city', 60);
        t.string('state', 2);
        t.string('zip', 10);
        t.string('contact', 60);
        t.string('service_type', 60);
      });
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('services');
};
