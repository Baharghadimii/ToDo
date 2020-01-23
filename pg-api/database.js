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
const getItemsById = function (id, db, category) {
  return db.query(
    `SELECT * FROM 
    ${category} JOIN items 
    ON item_id = items.id
    WHERE user_id=$1`, [`${id}`]
  );
};
module.exports = {
  addUser,
  getUser,
  getItemsById
};