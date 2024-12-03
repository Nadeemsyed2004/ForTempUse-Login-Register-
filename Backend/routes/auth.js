const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connectDB = require('../db');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY; 
const cors = require('cors');

app.use(cors());

const router = express.Router();  // Corrected router initialization

router.get('/test', (req,res)=>{
    res.send("hellp");
})
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const connection = await connectDB();
    const [existingUser] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length) {
      return res.status(401).json({ message: 'Already registered. Please login.' });
    }
    const salt = await bcrypt.genSalt(10);
    // Hash password with the generated salt
    const hashPassword = await bcrypt.hash(password, salt);

    await connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashPassword]);

    res.status(201).json({ message: 'Registered successfully' });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'Error in DB' });
    }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const connection = await connectDB();
    const [users] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

    if (!users.length) {
      return res.status(401).json({ message: 'User not found' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("passsw");
      return res.status(401).json({ message: "Password doesn't match" });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    console.log(token,user.id, user.name);
    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });

  } 
    catch (err) {
        console.log(err);
        res.status(401).json({ message: 'Error in login' });
    }
});

module.exports = router;
