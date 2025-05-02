const express = require('express');
const cookieParser = require('cookie-parser'); // to parse cookies
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // to parse JSON bodies
app.use(cookieParser()); // to handle cookies

// Ping route (still useful)
app.get('/ping', (req, res) => {
  res.send('pong');
});

// 🔐 Login route
app.post('/auth/login', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  res.cookie('username', username, { httpOnly: true });
  res.json({ message: `Logged in as ${username}` });
});

// 🚪 Logout route
app.post('/auth/logout', (req, res) => {
  res.clearCookie('username');
  res.json({ message: 'Logged out successfully' });
});

// Server listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
