const addUser = ([email, password], db) => {
  return db.query(`
INSERT INTO users(
  email,
  password
)
VALUES(
  '${email}',
  '${password}'
)
RETURNING *;`);
};
const getUser = (email, db) => {
  return db.query(`
  SELECT * FROM
  users WHERE users.email = '${email}';
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
const addMovies = function (itemId, item, db) {
  return db.query(
    `INSERT INTO movies
          (item_id,
            category,
            title,
            year,
            released,
            writer,
            genre,
            awards,
            plot,
            director,
            type,
            production,
            actors,
            image,
            link,
            duration
            )
            VALUES (
              ${itemId},
              '${item.category}',
              '${item.title}',
              '${item.year}',
              '${item.released}',
              '${item.writer}',
              '${item.genre}',
              '${item.awards}',
              '${item.plot}',
              '${item.director}',
              '${item.type}',
              '${item.production}',
              '${item.actors}',
              '${item.image}',
              '${item.linke}',
              '${item.duration}'
            )
            RETURNING *;`
  );
};
const addBooks = function (itemId, item, db) {
  return db.query(`
  INSERT INTO books
          (item_id,
            category,
            title,
            subtitle,
            author,
            book_category,
            pages,
            image,
            link,
            published_date,
            description
            )
            VALUES (
              ${itemId},
              '${item.category}',
              '${item.title}',
              '${item.subtitle}',
              '${item.author}',
              '${item.bookCategory}',
              '${item.pages}',
              '${item.image}',
              '${item.link}',
              '${item.publishedDate}',
              '${item.description}'
            )
            RETURNING *;
  `);

}
const addRatings = function (movieId, rating, db) {
  return db.query(`
INSERT INTO ratings(
  source,
  value,
  movie_id
) 
VALUES(
'${rating.Source}',
'${rating.Value}',
${movieId}
)
RETURNING *;`)
}
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
  addMovies,
  addRatings,
  addItemForUser,
  deleteItem,
  addBooks
};