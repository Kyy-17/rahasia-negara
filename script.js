let playerName = "";
let score = 0;

// Element references
const scoreText = document.getElementById("score");
const loginModal = document.getElementById("loginModal");
const mulaiBtn = document.getElementById("mulaiBtn");
const namaInput = document.getElementById("namaPemain");
const prabowoImg = document.getElementById("prabowo");
const resetBtn = document.getElementById("resetBtn");
const leaderboardList = document.getElementById("listLeaderboard");
const popEffect = document.getElementById("popEffect");
const popSound = document.getElementById("popSound");

// Load leaderboard dari localStorage
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

// Tombol mulai (login)
mulaiBtn.addEventListener("click", () => {
  const nama = namaInput.value.trim();
  if (!nama) {
    alert("Nama gak boleh kosong!");
    return;
  }
  playerName = nama;
  loginModal.style.display = "none";
});

// Klik gambar Prabowo
function pop(event) {
  if (!playerName) return; // Biar gak bisa klik sebelum login

  score++;
  scoreText.textContent = 'Score: ' + score;

  // Efek +1 muncul
  const rect = prabowoImg.getBoundingClientRect();
  popEffect.style.left = (event.clientX - rect.left - 10) + 'px';
  popEffect.style.top = (event.clientY - rect.top - 20) + 'px';
  popEffect.style.opacity = 1;
  popEffect.style.transform = 'translateY(-30px)';

  setTimeout(() => {
    popEffect.style.opacity = 0;
    popEffect.style.transform = 'translateY(0)';
  }, 300);

  // Suara
  popSound.currentTime = 0;
  popSound.play();
}

prabowoImg.addEventListener('click', pop);

// Reset skor dan simpan ke leaderboard
resetBtn.addEventListener("click", () => {
  if (!playerName) return;

  // Simpan ke leaderboard
  leaderboard.push({ name: playerName, score: score });
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 10); // Top 10 aja
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

  showLeaderboard();

  score = 0;
  scoreText.textContent = 'Score: 0';
});

// Tampilkan leaderboard
function showLeaderboard() {
  leaderboardList.innerHTML = "";
  leaderboard.forEach((entry, index) => {
    const li = document.createElement("li");
    li.innerText = `${index + 1}. ${entry.name} - ${entry.score}`;
    leaderboardList.appendChild(li);
  });
}

// Tampilkan leaderboard saat halaman dibuka
showLeaderboard();