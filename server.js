const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const GAMES_FILE = path.join(__dirname, 'games.json');

const upload = multer({
  storage: multer.diskStorage({
    destination: 'images/',
    filename: (req, file, cb) => cb(null, file.originalname)
  })
});

app.use(express.static(__dirname));

// GET all games
app.get('/api/games', (req, res) => {
  const games = JSON.parse(fs.readFileSync(GAMES_FILE, 'utf8'));
  res.json(games);
});

// POST a new game (with optional image upload)
app.post('/api/games', upload.single('image'), (req, res) => {
  const games = JSON.parse(fs.readFileSync(GAMES_FILE, 'utf8'));
  const b = req.body;

  const game = {
    id:          b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    title:       b.title,
    year:        parseInt(b.year),
    genre:       b.genre,
    developer:   b.developer,
    grade:       b.grade,
    platforms:   Array.isArray(b.platforms) ? b.platforms : (b.platforms ? [b.platforms] : []),
    image:       req.file ? `images/${req.file.originalname}` : 'images/placeholder.jpg',
    shortReview: b.shortReview,
    fullReview:  b.fullReview,
    extraImages: []
  };

  games.push(game);
  fs.writeFileSync(GAMES_FILE, JSON.stringify(games, null, 2));
  res.json(game);
});

app.listen(3000, () => {
  console.log('Graded Games running at http://localhost:3000');
});
