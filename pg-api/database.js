const addUser = (user, db) => {
  return db.query(`
INSERT INTO users(
  email,
  password
)
VALUES(
  '${user.email}',
  '${user.password}'
)
RETURNING *;`);
};

module.exports = {
  addUser
};