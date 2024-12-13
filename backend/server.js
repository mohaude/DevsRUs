const express = require('express');
const connectDB = require('./src/config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.use('/api/users', require('./src/routes/api/users'));
app.use('/api/auth', require('./src/routes/api/auth'));
app.use('/api/profile', require('./src/routes/api/profile'));
app.use('/api/posts', require('./src/routes/api/posts'));
app.use('/api/teams', require('./src/routes/api/teams'));
app.use('/api/jobs', require('./src/routes/api/jobs'));
app.use('/api/messages', require('./src/routes/api/messages'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
