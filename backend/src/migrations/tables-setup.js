exports.up = function(knex) {
    knex.schema.hasTable('users').then(function (exists) {
        if (!exists) {
          return knex.schema.createTable('users', function (t) {
            t.increments('user_id').primary();
            t.string('username', 60);
            t.string('password', 60);
            t.boolean('is_admin').defaultTo(false);
          });
        }
    });
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};