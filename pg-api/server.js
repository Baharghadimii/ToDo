let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let morgan = require('morgan');
const PORT = 3001;
let pg = require('pg');
let app = express();

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


app.listen(PORT, () => console.log('Listening on port: ' + PORT));