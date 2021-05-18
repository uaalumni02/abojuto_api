module.exports = {
  test: {
    client: "pg",
    connection: process.env.DATABASE_TEST_URL,
  },
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
  },
};
