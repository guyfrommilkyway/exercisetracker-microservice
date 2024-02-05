const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

mongoose.connection.once('open', () => console.log('Connected to database.'));
