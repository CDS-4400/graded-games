# Graded Games

A simple game review website where games are graded on a school-style scale (F to A+).

## How to Run

Just open `index.html` in your browser — no server needed.

## File Structure

```
graded-games/
├── index.html      ← Main page with card grid
├── game.html       ← Individual game detail page (reused for all games)
├── style.css       ← All styling and flip card animation
├── script.js       ← All game data + JavaScript logic
└── images/         ← Put your game cover images here
    └── placeholder.jpg
```

## How to Add a New Game

Open `script.js` and add a new object to the `games` array:

```javascript
{
  id: "game-id",            // Unique ID, no spaces (used in URL)
  title: "Game Title",      // Full official title
  year: 2024,               // Release year
  genre: "Genre",           // Genre
  developer: "Studio Name", // Developer
  grade: "A",               // Grade: F, D, C, B, A, A+, B-, B+, etc.
  shortReview: "One sentence review shown on the card back.",
  fullReview: "Your full review shown on the detail page.",
  image: "images/your-image.jpg",
  platforms: ["PS5", "PC"],
  extraImages: []           // Optional extra images for detail page
}
```

Then drop your image in the `images/` folder and you're done!

## Grade Color Scale

| Grade | Color  |
|-------|--------|
| A     | Green  |
| B     | Blue   |
| C     | Orange |
| D     | Red    |
| F     | Dark Red |
