const express = require('express');
const router = express.Router();

// Middleware for parsing cookies
const cookieParser = require('cookie-parser');

router.use(cookieParser());

// Login endpoint
router.post('/login', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).send('Username required');
  res.cookie('username', username, { httpOnly: true });
  res.send(`Logged in as ${username}`);
});

// Logout endpoint
router.post('/logout', (req, res) => {
  res.clearCookie('username');
  res.send('Logged out successfully');
});

module.exports = router;
