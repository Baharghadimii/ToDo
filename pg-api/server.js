let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let morgan = require('morgan');
const PORT = 3001;
let pg = require('pg');
let app = express();

const { addUser, getUser, getItemsById } = require('./database');

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
app.listen(PORT, () => console.log('Listening on port: ' + PORT));