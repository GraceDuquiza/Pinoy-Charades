
/* Locally stored charades cards. Emoji are colorful cartoon illustrations.
 * Easy to edit or add more without an API, database, or image license.
 */
window.CHARADES_CARDS = [
  // ACTIONS
  ['actions','Running','🏃'],['actions','Sleeping','😴'],['actions','Dancing','💃'],['actions','Swimming','🏊'],['actions','Cooking','🍳'],
  ['actions','Brushing Teeth','🪥'],['actions','Washing Dishes','🧽'],['actions','Flying a Kite','🪁'],['actions','Singing','🎤'],['actions','Jumping Rope','🪢'],
  ['actions','Riding a Bicycle','🚴'],['actions','Taking a Selfie','🤳'],['actions','Fishing','🎣'],['actions','Painting','🎨'],['actions','Crying','😭'],
  ['actions','Laughing','😂'],['actions','Clapping','👏'],['actions','Sneezing','🤧'],['actions','Taking a Shower','🚿'],['actions','Mopping','🧹'],
  ['actions','Playing Basketball','🏀'],['actions','Hula Hooping','⭕'],['actions','Eating Spicy Noodles','🍜'],['actions','Digging','⛏️'],['actions','Blowing Balloons','🎈'],
  ['actions','Walking a Dog','🐕'],['actions','Opening a Gift','🎁'],['actions','Slipping on a Banana Peel','🍌'],['actions','Driving','🚗'],['actions','Lifting Weights','🏋️'],

  // ANIMALS
  ['animals','Monkey','🐒'],['animals','Elephant','🐘'],['animals','Chicken','🐔'],['animals','Dog','🐕'],['animals','Cat','🐈'],
  ['animals','Lion','🦁'],['animals','Rabbit','🐇'],['animals','Penguin','🐧'],['animals','Frog','🐸'],['animals','Snake','🐍'],
  ['animals','Horse','🐎'],['animals','Fish','🐟'],['animals','Crab','🦀'],['animals','Butterfly','🦋'],['animals','Duck','🦆'],
  ['animals','Cow','🐄'],['animals','Pig','🐖'],['animals','Shark','🦈'],['animals','Gorilla','🦍'],['animals','Seal','🦭'],
  ['animals','Giraffe','🦒'],['animals','Kangaroo','🦘'],['animals','Crocodile','🐊'],['animals','Turtle','🐢'],['animals','Octopus','🐙'],
  ['animals','Bat','🦇'],['animals','Owl','🦉'],['animals','Bear','🐻'],['animals','Flamingo','🦩'],['animals','T-Rex','🦖'],

  // OBJECTS
  ['objects','Umbrella','☂️'],['objects','Guitar','🎸'],['objects','Telephone','☎️'],['objects','Toothbrush','🪥'],['objects','Camera','📷'],
  ['objects','Laptop','💻'],['objects','Violin','🎻'],['objects','Chair','🪑'],['objects','Bow and Arrow','🏹'],['objects','Key','🔑'],
  ['objects','Backpack','🎒'],['objects','Headphones','🎧'],['objects','Broom','🧹'],['objects','Mirror','🪞'],['objects','Balloon','🎈'],
  ['objects','Sunglasses','🕶️'],['objects','Scissors','✂️'],['objects','Lipstick','💄'],['objects','Hair Dryer','💨'],['objects','Flashlight','🔦'],
  ['objects','Remote Control','🎛️'],['objects','Bicycle','🚲'],['objects','Toilet','🚽'],['objects','Yo-Yo','🪀'],['objects','Hammer','🔨'],
  ['objects','Suitcase','🧳'],['objects','Teddy Bear','🧸'],['objects','Fan','🪭'],['objects','Door','🚪'],['objects','Candle','🕯️'],

  // OCCUPATIONS
  ['occupations','Doctor','🩺'],['occupations','Teacher','👩‍🏫'],['occupations','Firefighter','🧑‍🚒'],['occupations','Chef','🧑‍🍳'],['occupations','Police Officer','👮'],
  ['occupations','Farmer','🧑‍🌾'],['occupations','Pilot','🧑‍✈️'],['occupations','Juggler','🤹'],['occupations','Dentist','🦷'],['occupations','Drummer','🥁'],
  ['occupations','Painter','🧑‍🎨'],['occupations','Construction Worker','👷'],['occupations','DJ','🎧'],['occupations','Photographer','📸'],['occupations','Boxer','🥊'],
  ['occupations','Waiter','🍽️'],['occupations','Hairdresser','💇'],['occupations','Mechanic','🔧'],['occupations','Bus Driver','🚌'],['occupations','Librarian','📚'],
  ['occupations','Cashier','🛒'],['occupations','Magician','🪄'],['occupations','Singer','🎙️'],['occupations','Dancer','💃'],['occupations','Delivery Rider','🛵'],
  ['occupations','Astronaut','🧑‍🚀'],['occupations','Gardener','🪴'],['occupations','Janitor','🧹'],['occupations','Mime','🎭'],['occupations','Baker','🥖'],

  // MOVIE TITLES (keep the 'pinoy' key for saved games)
  ['pinoy','Darna','🦸‍♀️'],['pinoy','Captain Barbell','🏋️'],['pinoy','Lastikman','🤸'],['pinoy','Four Sisters and a Wedding','💍'],['pinoy','Shake, Rattle & Roll','🫨'],
  ['pinoy','Spider-Man','🕸️'],['pinoy','Frozen','❄️'],['pinoy','Titanic','🚢'],['pinoy','Jaws','🦈'],['pinoy','Kung Fu Panda','🐼'],
  ['pinoy','The Karate Kid','🥋'],['pinoy','Jurassic Park','🦖'],['pinoy','The Lion King','🦁'],['pinoy','Finding Nemo','🐠'],['pinoy','The Little Mermaid','🧜‍♀️'],
  ['pinoy','Cinderella','👠'],['pinoy','Sleeping Beauty','😴'],['pinoy','Aladdin','🧞'],['pinoy','Tangled','👱‍♀️'],['pinoy','Moana','🛶'],
  ['pinoy','King Kong','🦍'],['pinoy','Batman','🦇'],['pinoy','Superman','🦸'],['pinoy','Ghostbusters','👻'],['pinoy','Home Alone','😱'],
  ['pinoy','Toy Story','🤠'],['pinoy','Cars','🏎️'],['pinoy','Up','🎈'],['pinoy','Ratatouille','🐀'],['pinoy','Happy Feet','🐧']
].map(([category,word,emoji],id)=>({id,category,word,emoji}));


/* Pinoy Charades — static browser-only game logic.
 * The acting player belongs to the team OPPOSITE the guessing team.
 * Team PINs are a casual lock, not strong security against someone with
 * physical access or developer tools. No remote service or account is used.
 */
(() => {
  'use strict';

  const STORE = 'pinoyCharades.game.v2';
  const PUBLIC_STORE = 'pinoyCharades.public.v1';
  const CARDS = window.CHARADES_CARDS || [];

  const $ = (id) => document.getElementById(id);
  const screens = [...document.querySelectorAll('.screen')];

  const nodes = {
    teamA:$('team-a'),
    teamB:$('team-b'),
    turns:$('turn-count'),
    duration:$('duration'),
    pinA:$('pin-a'),
    pinB:$('pin-b'),
    error:$('setup-error'),
  };

  let game = loadGame();
  let unlocked = false;
  let ticker = null;
  let wakeLock = null;
  let lastCardId = null;

  const publicChannel = 'BroadcastChannel' in window
    ? new BroadcastChannel('pinoyCharades.public.v1')
    : null;

  // ---------------------------
  // SCREEN NAVIGATION
  // ---------------------------

  function view(id) {
    screens.forEach(s => {
      const visible = s.id === id;
      s.hidden = !visible;
      s.classList.toggle('active',visible);
    });
    window.scrollTo(0,0);
  }

  function validInt(n,min,max) {
    const parsed = Number.parseInt(n,10);
    return Number.isInteger(parsed)
      ? Math.max(min, Math.min(max,parsed))
      : min;
  }

  // ---------------------------
  // LOCAL GAME STORAGE
  // ---------------------------

  function save() {
    if (!game) return;

    try {
      localStorage.setItem(STORE,JSON.stringify(game));
    } catch {
      // The game still works in the current session.
    }

    $('resume-game-btn').hidden = !game;
    publish();
  }

  function loadGame() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE));

      if (
        saved &&
        saved.version === 2 &&
        saved.teams?.length === 2 &&
        Number.isInteger(saved.completedTurns)
      ) {
        return saved;
      }
    } catch {
      // A bad or old save starts a new game.
    }

    return null;
  }

  function clearGame() {
    game = null;
    unlocked = false;
    stopTicker();

    try {
      localStorage.removeItem(STORE);
    } catch {}

    $('resume-game-btn').hidden = true;
    publish();
  }

  // The TV shares this smaller snapshot. The secret card and team PIN data
  // stay in the controller's saved game.
  function publish() {
    const status = game ? {
      version:1,
      phase:game.phase,
      scores:game.scores,
      completedTurns:game.completedTurns,
      totalTurns:game.turnsPerTeam*2,
      firstGuesser:game.firstGuesser,
      guessing:game.phase==='playing' && game.round
        ? game.round.guessing
        : (game.phase==='results'
            ? null
            : upcomingTurn()?.guessing ?? null),
      endAt:game.phase==='playing' && game.round
        ? game.round.endAt
        : null,
      durationSeconds:game.durationSeconds,
      winner:game.phase==='results' ? winner() : null
    } : {
      version:1,
      phase:'home',
      scores:[0,0],
      completedTurns:0,
      totalTurns:0,
      guessing:null,
      endAt:null,
      winner:null
    };

    try {
      localStorage.setItem(PUBLIC_STORE,JSON.stringify(status));
    } catch {}

    publicChannel?.postMessage(status);
  }

  // ---------------------------
  // TEAM PIN LOCK
  // ---------------------------

  // PIN hashes are only for casual game protection,
  // not secure authentication.
  function pinHash(value,salt) {
    let h = 2166136261;

    for (const ch of `${salt}:${value}`) {
      h ^= ch.charCodeAt(0);
      h = Math.imul(h,16777619);
    }

    return (h>>>0).toString(16);
  }

  function salt() {
    if (crypto?.getRandomValues) {
      const values = crypto.getRandomValues(new Uint32Array(2));

      return [...values]
        .map(x=>x.toString(16))
        .join('-');
    }

    return `${Date.now()}-${Math.random()}`;
  }

  const teamLabel = (i) => i === 0 ? 'TEAM A' : 'TEAM B';

  function playerName(team,index) {
    return game.teams[team].players[index] || `Player ${index+1}`;
  }

  // ---------------------------
  // TURN ROTATION AND SCORING
  // ---------------------------

  function upcomingTurn() {
    if (
      !game ||
      game.completedTurns >= game.turnsPerTeam*2 ||
      game.firstGuesser === null
    ) return null;

    const guessing = (game.firstGuesser + game.completedTurns)%2;
    const acting = 1-guessing;

    // Each pair of turns gives both teams one chance to act. Cycle through
    // each acting team's own roster, including when team sizes differ.
    const index =
      Math.floor(game.completedTurns/2) %
      game.teams[acting].players.length;

    return {guessing,acting,index};
  }

  function winner() {
    return game.scores[0]===game.scores[1]
      ? 'tie'
      : game.scores[0]>game.scores[1]
        ? 'A'
        : 'B';
  }

  function updateScores() {
    document.querySelectorAll('.score-a').forEach(el => {
      el.textContent = game?.scores?.[0] ?? 0;
    });

    document.querySelectorAll('.score-b').forEach(el => {
      el.textContent = game?.scores?.[1] ?? 0;
    });
  }

  // ---------------------------
  // FLEXIBLE GAME SETUP
  // ---------------------------

  function summary() {
    const rounds = validInt(nodes.turns.value,1,30);
    const minutes = validInt(nodes.duration.value,1,3);

    $('total-turns').textContent =
      `${rounds*2} total turns`;

    $('total-duration').textContent =
      `${rounds*2*minutes} minutes of play, plus breaks`;
  }

  function syncNames(team) {
    const count = validInt(
      team===0 ? nodes.teamA.value : nodes.teamB.value,
      2,
      15
    );

    const box = $(team===0 ? 'names-a' : 'names-b');

    const current = [...box.querySelectorAll('input')]
      .map(input=>input.value);

    box.replaceChildren();

    for (let i=0;i<count;i++) {
      const input = document.createElement('input');

      input.type = 'text';
      input.maxLength = 24;
      input.placeholder = `Player ${i+1}`;
      input.value = current[i] || '';

      input.setAttribute(
        'aria-label',
        `Team ${team===0?'A':'B'} Player ${i+1} name`
      );

      box.append(input);
    }
  }

  function showPinMessage(input, message) {
    const error = $(input.getAttribute('aria-describedby'));
    error.textContent = message;
    error.hidden = !message;
    if (message) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  }

  function setupPinMessage(input) {
    const team = input === nodes.pinA ? 'Team A' : 'Team B';
    if (!input.value) return `Pick a secret code for ${team}. Use two digits, like 27.`;
    if (input.validity.patternMismatch) return `Use two digits for ${team}’s code, like 27.`;
    if (input === nodes.pinB && input.value === nodes.pinA.value) {
      return 'Both codes are the same. Pick a different code for Team B.';
    }
    return '';
  }

  function setupGame(ev) {
    ev.preventDefault();

    nodes.error.hidden = true;

    const a = validInt(nodes.teamA.value,2,15);
    const b = validInt(nodes.teamB.value,2,15);
    const turns = validInt(nodes.turns.value,1,30);
    const duration = validInt(nodes.duration.value,1,3);
    const pins = [nodes.pinA.value,nodes.pinB.value];
    const categories = checkedCategories($('setup-form'));

    // The browser checks each PIN's format. Comparing the two requires both fields.
    const duplicate = setupPinMessage(nodes.pinB);
    if (duplicate) {
      showPinMessage(nodes.pinB, duplicate);
      nodes.pinB.focus();
      return;
    }

    if (!categories.length) {
      nodes.error.textContent = 'Pick at least one category.';
      nodes.error.hidden = false;
      return;
    }

    const players = [a,b].map((count,t)=>{
      const entered = [
        ...$(t===0?'names-a':'names-b').querySelectorAll('input')
      ].map(i=>i.value.trim());

      return Array.from(
        {length:count},
        (_,index)=>entered[index]||`Player ${index+1}`
      );
    });

    if (
      game &&
      !confirm('Start a new game? This clears the old scores.')
    ) return;

    stopTicker();
    lastCardId = null;
    game = {
      version:2,
      phase:'draw',
      pinLength:pins[0].length,
      teams:players.map((names,t)=>{
        const s = salt();

        return {
          players:names,
          salt:s,
          pinHash:pinHash(pins[t],s)
        };
      }),
      turnsPerTeam:turns,
      durationSeconds:duration*60,
      draw:[null,null],
      firstGuesser:null,
      completedTurns:0,
      scores:[0,0],
      usedCards:[],
      selectedCategories:categories,
      round:null,
      lastRound:null
    };

    nodes.pinA.value = '';
    nodes.pinB.value = '';

    unlocked = false;

    save();
    renderDraw();
    view('draw');
  }

  // ---------------------------
  // RANDOM DRAW
  // ---------------------------

  function randomNumber() {
    if (crypto?.getRandomValues) {
      const arr = new Uint32Array(1);
      const limit = Math.floor(4294967296/100)*100;

      do {
        crypto.getRandomValues(arr);
      } while(arr[0]>=limit);

      return arr[0]%100+1;
    }

    return Math.floor(Math.random()*100)+1;
  }

  function drawFor(team) {
    if (
      !game ||
      game.phase!=='draw' ||
      game.draw[team]!==null
    ) return;

    game.draw[team] = randomNumber();

    if (
      game.draw.every(n=>n!==null) &&
      game.draw[0]!==game.draw[1]
    ) {
      game.firstGuesser =
        game.draw[0]>game.draw[1] ? 0 : 1;
    }

    save();
    renderDraw();
  }

  function renderDraw() {
    if (!game) return;

    $('draw-number-a').textContent = game.draw[0]??'?';
    $('draw-number-b').textContent = game.draw[1]??'?';

    $('draw-a').disabled = game.draw[0]!==null;
    $('draw-b').disabled = game.draw[1]!==null;

    const complete = game.draw.every(n=>n!==null);
    const tie = complete && game.firstGuesser===null;

    $('draw-message').textContent =
      !complete
        ? 'Tap your team’s button to get a number from 1 to 100.'
        : tie
          ? 'Same number! Tap Try Again.'
          : `${teamLabel(game.firstGuesser)} will guess first!`;

    $('draw-retry').hidden = !tie;
    $('draw-continue').hidden = !complete || tie;
  }

  function redraw() {
    if (game?.phase!=='draw') return;

    game.draw = [null,null];
    game.firstGuesser = null;

    save();
    renderDraw();
  }

  function advanceFromDraw() {
    if (
      game?.firstGuesser===null ||
      game?.phase!=='draw'
    ) return;

    game.phase = 'between';

    save();
    renderBetween();
    view('between');
  }

  // ---------------------------
  // BETWEEN TURNS
  // ---------------------------

  function renderBetween() {
    const t = upcomingTurn();

    if (!t) return renderResults();

    updateScores();

    $('next-guessing').textContent =
      game.phase==='playing'
        ? `${teamLabel(t.guessing)} IS GUESSING`
        : `${teamLabel(t.guessing)} GUESSES NEXT`;

    $('next-acting').textContent =
      `${teamLabel(t.acting)} — ${playerName(t.acting,t.index)} acts`;

    $('next-progress').textContent =
      `Turn ${game.completedTurns+1} of ${game.turnsPerTeam*2}`;

    $('between-title').innerHTML =
      game.phase==='playing'
        ? 'TIME IS <span>TICKING</span>'
        : 'NEXT <span>TURN!</span>';

    $('unlock-next').textContent =
      game.phase==='playing'
        ? 'UNLOCK TO KEEP PLAYING ➜'
        : 'TYPE TEAM CODE ➜';
  }

  // ---------------------------
  // LOCK AND UNLOCK
  // ---------------------------

  function showLock() {
    const t = game?.phase==='playing'
      ? game.round
      : upcomingTurn();

    if (!t) return;

    unlocked = false;

    $('lock-team').textContent = teamLabel(t.acting);

    $('lock-description').textContent =
      game.phase==='playing'
        ? 'The timer is still going! Type your team’s code to keep playing.'
        : `Actor, type ${teamLabel(t.acting)}’s code. Then give the phone to your checker.`;

    // Games saved before the switch to two digits still use their original PINs.
    const length = game.pinLength ?? 4;
    const input = $('unlock-pin');
    input.maxLength = length;
    input.pattern = `[0-9]{${length}}`;
    input.value = '';
    $('unlock-pin-label').textContent = `${teamLabel(t.acting)}’s ${length}-digit code`;
    showPinMessage(input, '');

    view('lock');
  }

  function unlock(ev) {
    ev.preventDefault();

    if (!game) return;

    const t = game.phase==='playing'
      ? game.round
      : upcomingTurn();

    if (!t) return;

    const team = game.teams[t.acting];

    if (
      pinHash($('unlock-pin').value,team.salt)!==
      team.pinHash
    ) {
      $('unlock-pin').value = '';
      showPinMessage($('unlock-pin'), `Try ${teamLabel(t.acting)}’s secret code again.`);
      $('unlock-pin').focus();
      return;
    }

    unlocked = true;
    $('unlock-pin').value = '';

    if (game.phase==='playing') {
      checkTimer();

      if (game.phase==='playing') {
        renderPlaying();
        view('playing');
      }
    } else if (game.phase==='between') {
      renderCategories();
      view('categories');
    }
  }

  // ---------------------------
  // CATEGORY SELECTION
  // ---------------------------

  // Setup and the current turn have independent checkboxes. Read only the
  // controls on the screen where the player made the selection.
  function checkedCategories(container) {
    return [...container.querySelectorAll('input[name="category"]:checked')]
      .map(box => box.value);
  }

  function renderCategories() {
    const t = upcomingTurn();

    $('category-actor').textContent =
      `${teamLabel(t.acting)} — ${playerName(t.acting,t.index)}`;

    const minutes = game.durationSeconds / 60;
    $('turn-instructions').textContent =
      `${teamLabel(t.guessing)} has ${minutes} ${minutes === 1 ? 'minute' : 'minutes'} to guess. Checker, say the category out loud. Tap Correct for a right guess. Actor, act without talking. If the word feels too hard, make an X with your arms. The checker taps Skip for a new card.`;

    $('turn-categories').querySelectorAll('input[name="category"]')
      .forEach(box=>{
        box.checked = game.selectedCategories.includes(box.value);
      });

    $('category-error').hidden = true;
  }

  function pickCard() {
    const selected = new Set(game.selectedCategories);

    const pool = CARDS.filter(
      card=>selected.has(card.category)
    );

    if (!pool.length) return null;

    let free = pool.filter(
      card=>!game.usedCards.includes(card.id)
    );

    // Recycle only the exhausted categories so other decks keep their history.
    if (!free.length) {
      const recycleIds = new Set(pool.map(card=>card.id));

      game.usedCards = game.usedCards.filter(
        id=>!recycleIds.has(id)
      );

      free = pool;
    }

    const candidates = free.filter(
      card=>card.id!==lastCardId
    );

    const choices = candidates.length ? candidates : free;
    const card = choices[randomIndex(choices.length)];

    game.usedCards.push(card.id);
    lastCardId = card.id;

    return card;
  }

  function randomIndex(length) {
    if (!length) return 0;
    return Math.floor(Math.random()*length);
  }

  // ---------------------------
  // START CHARADES TURN
  // ---------------------------

  function startTurn() {
    if (
      !game ||
      game.phase!=='between' ||
      !unlocked
    ) return;

    const checked = checkedCategories($('turn-categories'));

    if (!checked.length) {
      $('category-error').hidden = false;
      return;
    }

    const t = upcomingTurn();

    game.selectedCategories = checked;
    game.phase = 'playing';

    // Save an absolute deadline so locking the screen or reloading the page
    // keeps the same amount of time on both the controller and the TV.
    game.round = {
      ...t,
      correct:0,
      skips:0,
      endAt:Date.now()+game.durationSeconds*1000,
      cardId:null
    };

    const card = pickCard();

    if (!card) {
      game.phase = 'between';
      return;
    }

    game.round.cardId = card.id;

    save();
    renderPlaying();
    view('playing');
    startTicker();
    keepAwake();
  }

  // ---------------------------
  // COUNTDOWN TIMER
  // ---------------------------

  function formatTime(ms) {
    const seconds = Math.max(0,Math.ceil(ms/1000));

    return `${
      String(Math.floor(seconds/60)).padStart(2,'0')
    }:${
      String(seconds%60).padStart(2,'0')
    }`;
  }

  function renderPlaying() {
    if (!game?.round) return;

    const t = game.round;
    const card = CARDS.find(c=>c.id===t.cardId);

    $('playing-turn').textContent =
      `${teamLabel(t.guessing)} IS GUESSING`;

    $('acting-line').textContent =
      `${teamLabel(t.acting)} — ${playerName(t.acting,t.index)} acts`;

    $('card-emoji').textContent = card?.emoji||'🎭';
    $('card-word').textContent = card?.word||'CHARADES';

    $('card-category').textContent = ({
      actions:'ACTIONS',
      animals:'ANIMALS',
      objects:'THINGS',
      occupations:'JOBS',
      pinoy:'MOVIE TITLES'
    })[card?.category]||'';

    $('round-status').textContent =
      `Correct: ${t.correct} · Skipped: ${t.skips}`;

    $('clock').textContent =
      formatTime(t.endAt-Date.now());

    $('clock-panel').classList.toggle(
      'danger',
      t.endAt-Date.now()<=15000
    );

    updateScores();
  }

  // ---------------------------
  // CORRECT / SKIP
  // ---------------------------

  function answer(correct) {
    if (
      !game ||
      game.phase!=='playing' ||
      !unlocked ||
      !game.round
    ) return;

    if (Date.now()>=game.round.endAt) {
      endTurn();
      return;
    }

    if (correct) {
      game.round.correct++;
      game.scores[game.round.guessing]++;
    } else {
      game.round.skips++;
    }

    const next = pickCard();

    if (next) {
      game.round.cardId = next.id;
    }

    save();
    renderPlaying();
  }

  // ---------------------------
  // TIMER MANAGEMENT
  // ---------------------------

  function startTicker() {
    stopTicker();

    ticker = window.setInterval(checkTimer,200);
    checkTimer();
  }

  function stopTicker() {
    if (ticker!==null) {
      clearInterval(ticker);
    }

    ticker = null;
    releaseAwake();
  }

  function checkTimer() {
    if (game?.phase!=='playing'||!game.round) return;

    const left = game.round.endAt-Date.now();

    if (left<=0) {
      endTurn();
      return;
    }

    if (
      unlocked &&
      document.querySelector('#playing.active')
    ) {
      $('clock').textContent = formatTime(left);

      $('clock-panel').classList.toggle(
        'danger',
        left<=15000
      );
    }
  }

  function endTurn() {
    if (
      !game ||
      game.phase!=='playing' ||
      !game.round
    ) return;

    stopTicker();
    unlocked = false;

    game.lastRound = {...game.round};
    game.round = null;
    game.completedTurns++;

    game.phase =
      game.completedTurns>=game.turnsPerTeam*2
        ? 'results'
        : 'round-end';

    save();

    if (game.phase==='results') {
      renderResults();
    } else {
      renderRoundEnd();
    }

    view(game.phase);
  }

  // ---------------------------
  // ROUND RESULTS
  // ---------------------------

  function renderRoundEnd() {
    const last = game.lastRound;

    $('ended-team').textContent =
      `${teamLabel(last.guessing)} GUESSED`;

    $('ended-summary').textContent =
      `${last.correct} correct · ${last.skips} skipped`;

    $('ended-progress').textContent =
      `${game.completedTurns} of ${game.turnsPerTeam*2} turns finished`;

    updateScores();
  }

  function nextTurn() {
    if (game?.phase!=='round-end') return;

    game.phase = 'between';

    save();
    renderBetween();
    view('between');
  }

  // ---------------------------
  // FINAL WINNER
  // ---------------------------

  function renderResults() {
    if (!game) return;

    updateScores();

    const win = winner();

    $('winner-text').textContent =
      win==='tie'
        ? 'IT’S A TIE!'
        : `TEAM ${win} WINS!`;

    $('results-detail').textContent =
      `${game.completedTurns} turns played, ${
        game.scores[0]+game.scores[1]
      } correct guesses in total.`;
  }

  // ---------------------------
  // PHONE SCREEN WAKE LOCK
  // ---------------------------

  async function keepAwake() {
    try {
      if (navigator.wakeLock?.request) {
        wakeLock = await navigator.wakeLock.request('screen');
      }
    } catch {}
  }

  function releaseAwake() {
    try {
      wakeLock?.release();
    } catch {}

    wakeLock = null;
  }

  // ---------------------------
  // RESUME AND NEW GAME
  // ---------------------------

  function resume() {
    if (!game) return;

    if (game.phase==='playing') {
      if (Date.now()>=game.round.endAt) {
        endTurn();
      } else {
        startTicker();
        showLock();
      }
    } else if (game.phase==='draw') {
      renderDraw();
      view('draw');
    } else if (game.phase==='between') {
      renderBetween();
      view('between');
    } else if (game.phase==='round-end') {
      renderRoundEnd();
      view('round-end');
    } else if (game.phase==='results') {
      renderResults();
      view('results');
    } else {
      view('home');
    }
  }

  function newGame() {
    if (
      game &&
      !confirm('Start a new game? This clears the old scores.')
    ) return;

    clearGame();

    $('resume-game-btn').hidden = true;
    $('setup-form').reset();

    syncNames(0);
    syncNames(1);
    summary();

    nodes.error.hidden = true;

    view('setup');
  }

  function openTV() {
    $('tv-dialog').showModal();
  }

  // ---------------------------
  // EVENT LISTENERS
  // ---------------------------

  document.querySelectorAll('[data-go]')
    .forEach(btn=>btn.addEventListener('click',()=>{
      view(btn.dataset.go);
    }));

  $('resume-game-btn').addEventListener('click',resume);

  $('setup-form').addEventListener('submit',setupGame);

  const setupPins = [nodes.pinA, nodes.pinB];
  setupPins.forEach(input => {
    // A required or malformed PIN blocks submit before setupGame runs.
    // Explain that validation at the field the browser scrolls to.
    input.addEventListener('invalid', () => showPinMessage(input, setupPinMessage(input)));
    input.addEventListener('input', () => {
      for (const pin of setupPins) {
        if (pin.hasAttribute('aria-invalid')) showPinMessage(pin, setupPinMessage(pin));
      }
    });
  });
  $('setup-form').addEventListener('reset', () => {
    setupPins.forEach(pin => showPinMessage(pin, ''));
  });
  $('unlock-pin').addEventListener('invalid', () => {
    const input = $('unlock-pin');
    showPinMessage(input, `Type your team’s ${input.maxLength}-digit code.`);
  });
  $('unlock-pin').addEventListener('input', () => showPinMessage($('unlock-pin'), ''));

  [
    nodes.teamA,
    nodes.teamB,
    nodes.turns,
    nodes.duration
  ].forEach(el=>el.addEventListener('input',summary));

  nodes.teamA.addEventListener('input',()=>syncNames(0));
  nodes.teamB.addEventListener('input',()=>syncNames(1));

  $('draw-a').addEventListener('click',()=>drawFor(0));
  $('draw-b').addEventListener('click',()=>drawFor(1));
  $('draw-retry').addEventListener('click',redraw);
  $('draw-continue').addEventListener('click',advanceFromDraw);

  $('unlock-next').addEventListener('click',showLock);
  $('unlock-form').addEventListener('submit',unlock);

  $('lock-back').addEventListener('click',()=>{
    renderBetween();
    view('between');
  });

  $('start-turn').addEventListener('click',startTurn);

  $('cancel-categories').addEventListener('click',()=>{
    unlocked = false;
    renderBetween();
    view('between');
  });

  $('correct-btn').addEventListener('click',()=>answer(true));
  $('skip-btn').addEventListener('click',()=>answer(false));

  $('lock-during').addEventListener('click',showLock);

  $('next-turn-btn').addEventListener('click',nextTurn);
  $('results-new').addEventListener('click',newGame);

  $('open-tv').addEventListener('click',openTV);

  $('close-tv-dialog').addEventListener('click',()=>{
    $('tv-dialog').close();
  });

  document.addEventListener('visibilitychange',()=>{
    if (
      document.visibilityState==='visible' &&
      game?.phase==='playing'
    ) {
      checkTimer();

      if (unlocked) {
        keepAwake();
      }
    }
  });

  window.addEventListener('pageshow',()=>{
    if (game?.phase==='playing') {
      checkTimer();
    }
  });

  // ---------------------------
  // INITIALIZATION
  // ---------------------------

  // Build the live controls from the same markup so category values and
  // team labels stay consistent across screens.
  $('turn-categories').prepend(document.querySelector('#setup .category-list').cloneNode(true));
  document.querySelectorAll('.score-strip:empty').forEach(strip => {
    strip.append($('score-template').content.cloneNode(true));
  });

  syncNames(0);
  syncNames(1);
  summary();

  $('resume-game-btn').hidden = !game;

  if (game) {
    resume();
  } else {
    view('home');
    publish();
  }
})();
