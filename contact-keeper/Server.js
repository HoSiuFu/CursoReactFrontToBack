const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Database connection
connectDB();

//Middleware initialization
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.json({msg: 'Welcome to contact keeper API...'}));

app.use('/api/users', require('./Routes/Users'));
app.use('/api/auth', require('./Routes/Auth'));
app.use('/api/contacts', require('./Routes/Contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));