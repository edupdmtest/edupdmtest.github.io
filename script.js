// Enhanced DDAK System
document.addEventListener("DOMContentLoaded", function() {
  // Initialize DDAKs
  const storedDdaks = sessionStorage.getItem("ddaks");
  let currentDdaks = storedDdaks ? parseInt(storedDdaks, 10) : 100;
  sessionStorage.setItem("ddaks", currentDdaks);
  updateAllScoreDisplays(currentDdaks);
});

function updateAllScoreDisplays(score) {
  const displays = document.querySelectorAll('#score, #nav-score, #points');
  displays.forEach(display => {
    display.textContent = score;
    display.classList.add('grow');
    setTimeout(() => display.classList.remove('grow'), 300);
  });
}

function addDdaks(points) {
  const current = parseInt(sessionStorage.getItem("ddaks"), 10);
  const newTotal = Math.max(0, current + points);
  sessionStorage.setItem("ddaks", newTotal);
  updateAllScoreDisplays(newTotal);
}

// Make functions available globally
window.addDdaks = addDdaks;
window.updateAllScoreDisplays = updateAllScoreDisplays;
</script>
