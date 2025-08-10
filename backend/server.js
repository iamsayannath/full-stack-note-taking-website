require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

const app = express();

connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use(cookieParser());

// CORS to allow client to send cookies
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.get('/', (req, res) => res.send('CRED Notes API is running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
