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
const getUser = (user, db) => {
  return db.query(`
  SELECT * FROM
  users WHERE users.email = '${user.email}'
  AND users.password = '${user.password}';
  `);
};
module.exports = {
  addUser,
  getUser
};