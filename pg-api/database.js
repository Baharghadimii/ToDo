const addUser = ([email, password, name], db) => {
  return db.query(`
INSERT INTO users(
  name,
  email,
  password
)
VALUES(
  '${name}',
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
const addFavorite = function (id, db) {
  return db.query(`
  INSERT INTO items(favorite) 
  VALUES(true) WHERE id=$1
  RETURNING *;` , [`${id}`])
}
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
  console.log(itemId, item);
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
              '${item.link}',
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
const addProducts = function (itemId, item, db) {
  return db.query(`
  INSERT INTO products
          (item_id,
            category,
            title,
            product_category,
            image,
            link,
            country,
            price
            )
            VALUES (
              ${itemId},
              '${item.category}',
              '${item.title}',
              '${item.productCategory}',
              '${item.image}',
              '${item.link}',
              '${item.country}',
              '${item.price}'
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
const addRestaurants = function (itemId, item, db) {
  return db.query(`
  INSERT INTO restaurants
          (item_id,
            category,
            title,
            review_counts,
            rating,
            image,
            link,
            location,
            phone,
            latitude,
            longitude,
            price
            )
            VALUES (
              ${itemId},
              '${item.category}',
              '${item.name}',
              ${item.reviewCount},
              ${item.rating},
              '${item.image}',
              '${item.link}',
              '${item.location}',
              '${item.phone}',
              ${item.latitude},
              ${item.longitude},
              '${item.price}'
            )
            RETURNING *;
  `);
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
  addBooks,
  addProducts,
  addRestaurants,
  addFavorite
};