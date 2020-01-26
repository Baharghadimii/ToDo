let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let morgan = require('morgan');
PORT = 3001;
let pg = require('pg');
let app = express();
let bcrypt = require('bcrypt');
saltRound = 10;

{ addUser, getUser, getItemsById, addItem, addItemForUser, deleteItem } = require('./database');

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
  email = request.body.user.email;
  getUser(email, pool)
    .then(res => {
      if (!res.rows.length) {
        hash = bcrypt.hashSync(request.body.user.password, saltRound);
        email = request.body.user.email;
        addUser([email, hash], pool)
          .then(data => {
            console.log(data);
            response.send(data.rows[0])
          });
      } else {
        response.send(null);
      }
    });
});
app.get('/api/user/', function (request, response) {
  email = request.query.email;
  password = request.query.password;
  getUser(email, pool)
    .then(res => {
      console.log(res.rows[0])
      hash = res.rows[0].password;
      if (bcrypt.compareSync(password, hash)) {
        response.send(res.rows[0]);
      }
    });
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
  item = request.body.item;
  console.log(item);
  addItemForUser(request.params.userId, pool)
    .then(data => {
      itemId = data.rows[0].id;
      addItem(itemId, item, pool)
        .then(data => response.send(data.rows))
        .catch(err => console.log(err));
    });

});
app.delete('/api/:userId/delete/:itemId', function (request, response) {
  deleteItem(request.params.itemId, pool)
    .then(res => response.send(res.rows));
});
app.listen(PORT, () => console.log('Listening on port: ' + PORT));