let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let morgan = require('morgan');
const PORT = 3001;
let pg = require('pg');
let app = express();

const { addUser, getUser, getItemsById, addItem, addItemForUser, } = require('./database');

let pool = new pg.Pool({
  port: 5432,
  password: 'tehghad',
  database: 'todp_development',
  host: 'localhost',
  user: 'baharehghadimi'
});

app.use(cors());
pool.connect();
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.post('/api/register', function (request, response) {
  getUser(request.body.user, pool)
    .then(res => {
      console.log(res.rows.length);
      if (!res.rows.length) {
        addUser(request.body.user, pool)
          .then(data => response.send(data.rows));
      } else {
        response.send(null);
      }
    });
});
app.get('/api/user/', function (request, response) {
  getUser(request.query, pool)
    .then(res => response.send(res.rows[0]));
});
app.get('/api/:userId/movies', function (request, response) {
  getItemsById(request.params.userId, pool, `movies`)
    .then(data => response.send(data.rows));
});
app.get('/api/:userId/books', function (request, response) {
  getItemsById(request.params.userId, pool, `books`)
    .then(data => response.send(data.rows));
});
app.get('/api/:userId/products', function (request, response) {
  getItemsById(request.params.userId, pool, `products`)
    .then(data => response.send(data.rows));
});
app.get('/api/:userId/restaurants', function (request, response) {
  getItemsById(request.params.userId, pool, `restaurants`)
    .then(data => response.send(data.rows));
});
app.post('/api/:userId/add', function (request, response) {
  let itemId = 0;
  const item = request.body.item;
  item.forEach(element => {
    addItemForUser(request.params.userId, pool)
      .then(data => {
        itemId = data.rows[0].id;
        const category = element.category;
        const title = element.title;
        const image = element.image;
        const link = element.link;
        const content = element.content;
        addItem(itemId, [category, title, image, link, content], pool)
          .then(data => response.send(data.rows))
          .catch(err => console.log(err));
      });
  });
});
app.listen(PORT, () => console.log('Listening on port: ' + PORT));