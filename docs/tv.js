
/*
 * PINOY CHARADES — TV SCOREBOARD
 * Read-only public display
 * No database or backend required.
 *
 * The game controller and TV page must share
 * the same browser origin and storage context.
 */

(() => {
  "use strict";

  const STORAGE_KEY = "pinoyCharades.public.v1";

  const $ = (id) => document.getElementById(id);

  let state = null;

  // ---------------------------------
  // 1. LOAD PUBLIC GAME DATA
  // ---------------------------------

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.warn("Unable to load scoreboard:", error);
      return null;
    }
  }

  state = loadState();

  // ---------------------------------
  // 2. LIVE UPDATES
  // ---------------------------------

  const channel = "BroadcastChannel" in window
    ? new BroadcastChannel(STORAGE_KEY)
    : null;

  // Receive public scoreboard changes
  if (channel) {
    channel.addEventListener("message", (event) => {
      if (event.data?.version !== 1) return;

      state = event.data;
      render();
    });
  }

  // Listen for localStorage updates
  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY) return;

    state = loadState();
    render();
  });

  // ---------------------------------
  // 3. FORMAT COUNTDOWN TIMER
  // ---------------------------------

  function formatTime(endAt) {
    if (!Number.isFinite(endAt)) {
      return "--:--";
    }

    const seconds = Math.max(
      0,
      Math.ceil((endAt - Date.now()) / 1000)
    );

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
      String(minutes).padStart(2, "0") +
      ":" +
      String(remainingSeconds).padStart(2, "0")
    );
  }

  // ---------------------------------
  // 4. UPDATE TEAM SCORES
  // ---------------------------------

  function updateScores() {
    $("score-a").textContent = state?.scores?.[0] ?? 0;
    $("score-b").textContent = state?.scores?.[1] ?? 0;
  }

  // ---------------------------------
  // 5. RENDER PUBLIC SCOREBOARD
  // ---------------------------------

  function render() {
    updateScores();

    // Waiting for game
    if (!state || state.phase === "home") {
      $("status").textContent = "WAITING FOR GAME";

      $("turn-label").textContent =
        "Go back to the game tab to start playing.";

      $("round-label").textContent = "Ready to play";

      $("timer").textContent = "--:--";

      return;
    }

    // Round progress
    $("round-label").textContent =
      `${state.completedTurns} of ${state.totalTurns} turns played`;

    // Game finished
    if (state.phase === "results") {
      $("status").textContent = "GAME OVER!";

      if (state.winner === "tie") {
        $("turn-label").textContent = "IT'S A TIE!";
      } else {
        $("turn-label").textContent =
          `TEAM ${state.winner} WINS!`;
      }

      $("timer").textContent = "🏆";
      return;
    }

    // Active guessing turn
    if (state.phase === "playing") {
      $("status").textContent = "TIME TO GUESS!";

      const team = state.guessing === 0 ? "A" : "B";

      $("turn-label").textContent =
        `TEAM ${team} IS GUESSING`;

      $("timer").textContent =
        formatTime(state.endAt);

      return;
    }

    // Between rounds
    $("status").textContent = "GET READY!";

    if (state.guessing === null ||
        state.guessing === undefined) {
      $("turn-label").textContent =
        "Tap each team’s button in the game tab to see who goes first.";
    } else {
      const team = state.guessing === 0 ? "A" : "B";

      $("turn-label").textContent =
        `TEAM ${team} GUESSES NEXT`;
    }

    const seconds = state.durationSeconds || 120;

    $("timer").textContent =
      formatTime(Date.now() + seconds * 1000);
  }

  // ---------------------------------
  // 6. LIVE COUNTDOWN
  // ---------------------------------

  setInterval(() => {
    if (state?.phase === "playing") {
      $("timer").textContent =
        formatTime(state.endAt);
    }
  }, 250);

  // ---------------------------------
  // 7. INITIALIZE
  // ---------------------------------

  render();

})();
