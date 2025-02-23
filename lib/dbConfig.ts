import knex from "knex";

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./emailDatabase.sqlite",
  },
  useNullAsDefault: true,
});

export default db;
