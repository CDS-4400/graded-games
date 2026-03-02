// ============================================
// GRADE COLOR HELPER
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

async function buildGrid() {
  const grid = document.getElementById("game-grid");
  if (!grid) return;

  const res = await fetch('/api/games');
  const games = await res.json();

  grid.innerHTML = '';

  games.forEach(game => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <img src="${game.image}" alt="${game.title}" onerror="this.src='images/placeholder.jpg'">
          <div class="card-front-title">${game.title}</div>
        </div>
        <div class="card-back">
          <div class="grade-badge ${getGradeColor(game.grade)}">${game.grade}</div>
          <h2>${game.title}</h2>
          <p class="year">${game.year} &bull; ${game.genre}</p>
          <p class="short-review">"${game.shortReview}"</p>
          <a href="game.html?id=${game.id}" class="detail-btn">Full Review →</a>
        </div>
      </div>
    `;

    card.addEventListener("click", function (e) {
      if (e.target.classList.contains("detail-btn")) return;
      this.classList.toggle("flipped");
    });

    grid.appendChild(card);
  });
}

// ============================================
// BUILD THE DETAIL PAGE (game.html)
// ============================================

async function buildDetailPage() {
  const detail = document.getElementById("game-detail");
  if (!detail) return;

  const res = await fetch('/api/games');
  const games = await res.json();

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const game = games.find(g => g.id === id);

  if (!game) {
    detail.innerHTML = "<p>Game not found. <a href='index.html'>Go back</a></p>";
    return;
  }

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

  document.title = `${game.title} — Graded Games`;
}

// ============================================
// ADD REVIEW MODAL
// ============================================

function initModal() {
  const btn = document.getElementById('add-review-btn');
  if (!btn) return;

  const overlay = document.getElementById('modal-overlay');

  btn.addEventListener('click', () => overlay.classList.remove('hidden'));

  document.getElementById('cancel-btn').addEventListener('click', () => {
    overlay.classList.add('hidden');
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.add('hidden');
  });

  document.getElementById('review-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;

    await fetch('/api/games', {
      method: 'POST',
      body: new FormData(form)
    });

    form.reset();
    overlay.classList.add('hidden');
    buildGrid();
  });
}

// ============================================
// RUN ON PAGE LOAD
// ============================================

buildGrid();
buildDetailPage();
initModal();
