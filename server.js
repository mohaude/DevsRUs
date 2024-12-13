const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Connect routes here
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts')); 
app.use('/api/teams', require('./routes/teams'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
