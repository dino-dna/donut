
exports.up = knex => knex.schema
  .createTableIfNotExists('donuts', (table) => {
    table.increments()
    table.decimal('frosting_coverage', 16, 14)
    table.decimal('frosting_thickness', 16, 14)
    table.decimal('inner_radius', 16, 14)
    table.decimal('outer_radius', 16, 14)
    table.decimal('sprinkle_coverage', 16, 14)
    table.string('name')
    table.timestamps()
  })

exports.down = knex => knex.schema.dropTableIfExists('donuts')
