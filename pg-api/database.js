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
const addItemForUser = function (userId, db) {
  return db.query(`
  INSERT INTO items(
    user_id,
    created_at
  ) VALUES (
    ${userId},
    current_timestamp
  )
  RETURNING *;`);
};
const addItem = function (itemId, item, db) {
  return db.query(
    `INSERT INTO ${item[0]}
          (item_id,
            title,
            image,
            link,
            category,
            description
            )
            VALUES (
              ${itemId},
              '${item[1]}',
              '${item[2]}',
              '${item[3]}',
              '${item[0]}',
              '${item[4]}'
            )
            RETURNING *;`
  );
};
const deleteItem = function (id, db) {
  return db.query(`
  DELETE FROM items
  WHERE id=$1;
`, [`${id}`]);
};
module.exports = {
  addUser,
  getUser,
  getItemsById,
  addItem,
  addItemForUser,
  deleteItem
};