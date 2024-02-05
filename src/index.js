const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// dotenv
require('dotenv').config();

// database
require('./db/mongoose');

const userRouter = require('./api/v1/routes/user');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(process.cwd() + '/views/index.html');
});

app.use(userRouter);

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log('Your app is listening on port ' + listener.address().port);
});
