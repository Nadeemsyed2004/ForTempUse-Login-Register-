const express = require('express');
const app = express();
const router = require('./routes/auth'); 
const cors = require('cors'); // Assuming your routes are in 'routes/auth.js'

require('dotenv').config();

app.use(cors())
// Middleware to parse JSON requests
app.use(express.json());
// Routes
app.use('/api/auth', router);  // Mount your auth router here

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
