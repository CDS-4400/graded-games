// ============================================
// GAME DATA
// ============================================
// This is where all your game info lives.
// To add a new game, copy one of these objects
// and paste it at the end of the array with a comma.
// ============================================

const games = [
  {
    id: "elden-ring",               // Unique ID - used in the URL (no spaces)
    title: "Elden Ring",            // Official game title
    year: 2022,                     // Year it released
    genre: "Action RPG",            // Genre
    developer: "FromSoftware",      // Developer
    grade: "A+",                    // Your grade (F, D, C, B, A, A+)
    shortReview: "A brutal, beautiful open world that redefines what an RPG can be.", // Short blurb shown on the card
    fullReview: "Elden Ring is FromSoftware's magnum opus. Taking the punishing, rewarding combat of Dark Souls and placing it inside a massive open world felt like a risk — but it paid off in every way. The Lands Between is one of gaming's most memorable settings, filled with secrets around every corner. The bosses are legendary, the lore is deep, and the sense of accomplishment when you finally beat a hard boss is unmatched. A must-play for any serious gamer.",
    image: "images/elden-ring.jpg", // Path to your image file
    platforms: ["PS5", "Xbox", "PC"],
    extraImages: []                 // Add more image paths here for the detail page
  },
  {
    id: "hollow-knight",
    title: "Hollow Knight",
    year: 2017,
    genre: "Metroidvania",
    developer: "Team Cherry",
    grade: "A",
    shortReview: "An indie masterpiece with stunning art and brutally satisfying gameplay.",
    fullReview: "Hollow Knight is proof that small teams can create something extraordinary. Team Cherry built a massive, interconnected underground world filled with atmosphere, challenge, and charm. The hand-drawn art style is gorgeous, the combat is tight, and the world feels genuinely alive. If you enjoy exploration and a good challenge, this is one of the best games ever made at any price point.",
    image: "images/hollow-knight.jpg",
    platforms: ["PC", "Switch", "PS4", "Xbox"],
    extraImages: []
  },
  {
    id: "cyberpunk-2077",
    title: "Cyberpunk 2077",
    year: 2020,
    genre: "Action RPG",
    developer: "CD Projekt Red",
    grade: "B",
    shortReview: "A flawed gem — messy launch, but Night City is unforgettable.",
    fullReview: "Cyberpunk 2077 had one of gaming's most infamous launches, but after years of patches it has transformed into something genuinely special. Night City is the most detailed urban environment ever put in a game. The story is engaging, the side quests rival the main story in quality, and the 2.0 update fixed most of the core gameplay issues. It's still not perfect, but it's worth playing today.",
    image: "images/cyberpunk.jpg",
    platforms: ["PS5", "Xbox", "PC"],
    extraImages: []
  },
  {
    id: "fall-guys",
    title: "Fall Guys",
    year: 2020,
    genre: "Party / Battle Royale",
    developer: "Mediatonic",
    grade: "B-",
    shortReview: "Pure chaotic fun — best enjoyed with friends.",
    fullReview: "Fall Guys carved out its own lane in the battle royale genre by ditching guns and replacing them with jelly bean people falling over each other. It's silly, it's fun, and it's a great game to play with friends or family. The rounds are quick, the variety is good, and nothing feels too punishing. It loses points for getting repetitive solo, but as a casual party game it delivers every time.",
    image: "images/fall-guys.jpg",
    platforms: ["PS4", "PS5", "Xbox", "Switch", "PC"],
    extraImages: []
  },
  {
    id: "no-mans-sky",
    title: "No Man's Sky",
    year: 2016,
    genre: "Survival / Exploration",
    developer: "Hello Games",
    grade: "A-",
    shortReview: "The greatest redemption arc in gaming. It's now everything it promised.",
    fullReview: "No Man's Sky launched as one of gaming's biggest disappointments. The promises didn't match the product. But Hello Games did something rare — they kept working. Years of free updates transformed it into one of the most content-rich survival games available. Base building, multiplayer, story missions, space combat — it's all there now. A remarkable comeback story and a genuinely great game.",
    image: "images/no-mans-sky.jpg",
    platforms: ["PS4", "PS5", "Xbox", "Switch", "PC"],
    extraImages: []
  }
];

// ============================================
// GRADE COLOR HELPER
// ============================================
// Returns a color class based on the grade.
// This is used to color-code the grade badge.
// ============================================

function getGradeColor(grade) {
  if (grade.startsWith("A")) return "grade-a";
  if (grade.startsWith("B")) return "grade-b";
  if (grade.startsWith("C")) return "grade-c";
  if (grade.startsWith("D")) return "grade-d";
  return "grade-f";
}

// ============================================
// BUILD THE CARD GRID (index.html)
// ============================================
// This runs on the main page and builds all
// the flip cards dynamically from the data above.
// ============================================

function buildGrid() {
  const grid = document.getElementById("game-grid");
  if (!grid) return; // Only run on the index page

  games.forEach(game => {
    // Create the outer card container
    const card = document.createElement("div");
    card.className = "card";

    // Inner wrapper that actually flips
    card.innerHTML = `
      <div class="card-inner">

        <!-- FRONT of card: just the game image -->
        <div class="card-front">
          <img src="${game.image}" alt="${game.title}" onerror="this.src='images/placeholder.jpg'">
          <div class="card-front-title">${game.title}</div>
        </div>

        <!-- BACK of card: the quick stats -->
        <div class="card-back">
          <div class="grade-badge ${getGradeColor(game.grade)}">${game.grade}</div>
          <h2>${game.title}</h2>
          <p class="year">${game.year} &bull; ${game.genre}</p>
          <p class="short-review">"${game.shortReview}"</p>
          <a href="game.html?id=${game.id}" class="detail-btn">Full Review →</a>
        </div>

      </div>
    `;

    // Click the card to flip it
    card.addEventListener("click", function (e) {
      // Don't flip if they clicked the "Full Review" button
      if (e.target.classList.contains("detail-btn")) return;
      this.classList.toggle("flipped");
    });

    grid.appendChild(card);
  });
}

// ============================================
// BUILD THE DETAIL PAGE (game.html)
// ============================================
// Reads the ?id= from the URL and loads
// the matching game's full review.
// ============================================

function buildDetailPage() {
  const detail = document.getElementById("game-detail");
  if (!detail) return; // Only run on the detail page

  // Get the game ID from the URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  // Find the matching game in our data
  const game = games.find(g => g.id === id);

  if (!game) {
    detail.innerHTML = "<p>Game not found. <a href='index.html'>Go back</a></p>";
    return;
  }

  // Build the detail page content
  detail.innerHTML = `
    <div class="detail-header">
      <a href="index.html" class="back-btn">← Back to All Games</a>
      <div class="detail-grade ${getGradeColor(game.grade)}">${game.grade}</div>
    </div>

    <div class="detail-hero">
      <img src="${game.image}" alt="${game.title}" onerror="this.src='images/placeholder.jpg'">
    </div>

    <div class="detail-content">
      <h1>${game.title}</h1>
      <div class="detail-meta">
        <span>${game.year}</span>
        <span>${game.genre}</span>
        <span>${game.developer}</span>
        <span>${game.platforms.join(" / ")}</span>
      </div>
      <div class="detail-review">
        <h3>My Review</h3>
        <p>${game.fullReview}</p>
      </div>
    </div>
  `;

  // Update the page title
  document.title = `${game.title} — Graded Games`;
}

// ============================================
// RUN ON PAGE LOAD
// ============================================

buildGrid();
buildDetailPage();
