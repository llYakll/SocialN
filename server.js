const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./controllers/userRouter');
const thoughtRoutes = require('./controllers/thoughtRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/socialNetworkDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});