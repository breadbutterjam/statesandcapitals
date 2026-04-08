// ── State data ───────────────────────────────────────────────────

let dataState_full = {"mh":["Maharashtra","mumbai","nagpur"],"gj":["Gujarat","gandhinagar"],"jh":["Jharkhand","Ranchi"],"up":["Uttar Pradesh","Lucknow"],"hp":["Himachal","Shimla","Dharamshala"],"kl":["Kerala","Trivandrum"],"ka":["Karnataka","Bengaluru"],"ga":["Goa","Panaji"],"tn":["Tamil Nadu","Chennai"],"ap":["Andhra Pradesh","Amaravati"],"tg":["Telangana","Hyderabad"],"ct":["Chattisgarh","Raipur"],"or":["Oddisha","Bhubaneswar"],"br":["Bihar","Patna"],"mp":["Madhya Pradesh", "Bhopal"],"rj":["Rajasthan","Jaipur"],"pb":["Punjab","Chandigarh"],"hr":["Haryana","Chandigarh"],"ut":["Uttarakhand","Bhararisain","Dehradun"],"sk":["Sikkim","Gangtok"],"wb":["West Bengal","Kolkatta"],"ar":["Arunachal Pradesh","Itanagar"],"as":["Assam","Dispur"],"nl":["Nagaland","Kohima"],"mn":["Manipur","Imphal"],"mz":["Mizoram","Aizawl"],"tr":["Tripura","Agartala"],"ml":["Meghalaya","Shillong"]}

let dataState_NE = {"sk":["Sikkim","Gangtok"],"ar":["Arunachal Pradesh","Itanagar"],"as":["Assam","Dispur"],"nl":["Nagaland","Kohima"],"mn":["Manipur","Imphal"],"mz":["Mizoram","Aizawl"],"tr":["Tripura","Agartala"],"ml":["Meghalaya","Shillong"]}

let dataState_shortened = {"mh":["Maharashtra","mumbai"],"gj":["Gujarat","gandhinagar"],"wb":["West Bengal","Kolkatta"],"tn":["Tamil Nadu","Chennai"]}

// ── Hints (keyed by 2-letter state code) ─────────────────────────

const stateHints = {
    mh: "India's most populous state. Home to Mumbai, the financial capital, and Bollywood.",
    gj: "Birthplace of Mahatma Gandhi. Known for the Rann of Kutch and diamond trade.",
    jh: "Rich in minerals; separated from Bihar in 2000. Famous for tribal culture.",
    up: "Most populous state in India. Home to the Taj Mahal and the Ganges river.",
    hp: "The 'Dev Bhoomi' (Land of Gods). Known for Himalayan peaks and apple orchards.",
    kl: "Highest literacy rate in India. Known for backwaters, spices, and Kathakali dance.",
    ka: "IT hub of India — Bengaluru. Known for Mysore Palace and coffee plantations.",
    ga: "India's smallest state by area. Famous for beaches and Portuguese heritage.",
    tn: "Land of temples and Carnatic music. Home to one of the oldest living civilisations.",
    ap: "Coastal state with Krishna-Godavari delta. Separated from Telangana in 2014.",
    tg: "Youngest state, carved from AP in 2014. Hyderabad is a major tech hub.",
    ct: "The 'Rice Bowl of Central India'. Rich in forests, waterfalls, and tribal culture.",
    or: "Known for the Jagannath Temple in Puri and classical Odissi dance.",
    br: "Birthplace of Buddhism — the Buddha attained enlightenment at Bodh Gaya here.",
    mp: "The 'Heart of India'. Has the most tiger reserves of any Indian state.",
    rj: "India's largest state by area. Known for Thar Desert and the Pink City, Jaipur.",
    pb: "The 'Land of Five Rivers'. Heartland of the Sikh religion and the Green Revolution.",
    hr: "Surrounds Delhi on three sides. Kurukshetra, where the Mahabharata was fought, is here.",
    ut: "The 'Land of Gods' — source of the Ganga and Yamuna. Char Dham pilgrimage is here.",
    sk: "India's least populous state. Shares borders with Nepal, China, and Bhutan.",
    wb: "Home to Kolkata, the former British capital. Known for Durga Puja and Rabindranath Tagore.",
    ar: "The 'Land of the Dawn-lit Mountains'. India's easternmost and largest North-East state.",
    as: "Famous for one-horned rhinos in Kaziranga National Park. Tea gardens dominate the landscape.",
    nl: "The 'Land of Festivals'. Each of its 16 tribes has a distinct culture and dialect.",
    mn: "Called the 'Jewel of India'. Polo is said to have originated here.",
    mz: "The 'Land of the Highlanders'. Has one of the highest literacy rates in India.",
    tr: "Surrounded by Bangladesh on three sides. Unakoti rock carvings are a heritage site.",
    ml: "The 'Abode of Clouds'. Mawsynram here is one of the wettest places on Earth.",
};

// ── Game state ───────────────────────────────────────────────────

let dataState;
let arrAllStates;
let NUM_STATES;

let bCheckWithStateCapital = false;
let bMapPractice  = false;
let bSpotMode     = false;    // highlighted state on map, user names it from dropdown
let bSpotMcqMode  = false;    // highlighted state on map, user picks from 4 chips
let prevIdentifiedCapitalforCh = "";

let arrCorrect = [];   // finalised correct (indices)
let arrWrong   = [];   // finalised wrong (indices)
let arrSkipped = [];   // in skip pool — not yet answered (indices)

// Bullet slot: assigned only when a state is first answered (not on skip)
let bulletSlotMap  = {};
let nextBulletSlot = 0;

let currentStateIndex = null;
let currentStreak     = 0;
let currentGameMode   = '';   // set at startGame, used by recordGameResult

// WB and TN are SVG <g> groups with child <path> elements
let arrSpecialStates = ["wb", "tn"];

let labelsEnabled = true;
let soundEnabled = true;
const modeLabels = {
    "quiz-mode": "Find the State",
    "map-practice": "Explore the Map",
    "states": "Match the Capital",
    "ne": "North East",
    "identify": "Guess the State",
    "spot": "Name the State",
    "spot-mcq": "Pick the State",
    "flashcard-practice": "Learn the Shapes",
    "flashcard-quiz": "Recall the State"
};
// ── Timer state ──────────────────────────────────────────────────

let timerInterval = null;
let timerSeconds  = 0;

// ── Stats display ────────────────────────────────────────────────

function updateStats() {
    let pad = n => String(n).padStart(2, '0');
    document.getElementById('statCorrectVal').textContent = pad(arrCorrect.length);
    document.getElementById('statWrongVal').textContent   = pad(arrWrong.length);
    document.getElementById('statStreakVal').textContent  = pad(currentStreak);
}

function updateTitleBar(mode) {
    const titleBar = document.getElementById('titleBar');
    const titleBarText = document.getElementById('titleBarText');
    const titleBarMode = document.getElementById('titleBarMode');
    const modeLabel = modeLabels[mode] || "";

    titleBarText.textContent = "States of India";
    titleBarMode.textContent = modeLabel ? modeLabel : "";
    titleBar.classList.toggle('dsplyNone', !modeLabel);
}

function showModeSelection() {
    let modal = document.getElementById('startModal');
    let infoBtn = document.getElementById('infoBtn');
    let settingsPanel = document.getElementById('settingsPanel');
    let gearBtn = document.getElementById('gearBtn');

    stopTimer();
    removeAllStateLabels();
    hideEndModal();

    if (infoBtn) infoBtn.classList.remove('active');
    if (settingsPanel) settingsPanel.classList.remove('visible');
    if (gearBtn) gearBtn.classList.remove('open');
    if (modal) modal.classList.remove('hddn');
}

// ── Timer ────────────────────────────────────────────────────────

function startTimer() {
    stopTimer();
    timerSeconds = 0;
    updateTimerDisplay();
    timerInterval = setInterval(function() {
        timerSeconds++;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimerDisplay() {
    let pad = n => String(n).padStart(2, '0');
    let el  = document.getElementById('timerDisplay');
    if (el) el.textContent = pad(Math.floor(timerSeconds / 60)) + ':' + pad(timerSeconds % 60);
}

function setTimerVisibility(visible) {
    let row = document.getElementById('timerRow');
    if (!row) return;
    row.classList.toggle('dsplyNone', !visible);
}

// ── Mode flags ───────────────────────────────────────────────────

let bIdentifyMode  = false;
let bFlashcardMode = false;
let bFlashcardHard = false;

// ── Init ─────────────────────────────────────────────────────────

function init() {
    // Always show the startup mode-picker modal first.
    // The modal buttons will call startGame(mode) when chosen.
    setupStartModal();

    // Wire up settings toggles (timer, labels) now so they work once game starts
    let timerToggle = document.getElementById('timerToggle');
    if (timerToggle) {
        timerToggle.addEventListener('change', function() {
            setTimerVisibility(timerToggle.checked);
        });
    }
    let labelsToggle = document.getElementById('labelsToggle');
    if (labelsToggle) {
        labelsToggle.addEventListener('change', function() {
            labelsEnabled = labelsToggle.checked;
            if (!labelsEnabled) removeAllStateLabels();
        });
    }

    let soundToggle = document.getElementById('soundToggle');
    if (soundToggle) {
        soundToggle.addEventListener('change', function() {
            // Handle sound toggle logic here
            soundEnabled = soundToggle.checked;
        });
    }

    let titleBarClose = document.getElementById('titleBarClose');
    if (titleBarClose) {
        titleBarClose.addEventListener('click', function() {
            showModeSelection();
        });
    }
    
    // Skip button (map modes)
    document.getElementById('skipBtn').addEventListener('click', skipCurrent);
    // Skip button (identify mode)
    document.getElementById('identifySkipBtn').addEventListener('click', skipCurrent);
    // Skip button (spot-mcq mode)
    document.getElementById('spotMcqSkipBtn').addEventListener('click', spotMcqSkipClicked);
    // Info / hint button
    let infoBtn = document.getElementById('infoBtn');
    if (infoBtn) {
        infoBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            infoBtn.classList.toggle('active');
        });
        document.addEventListener('click', function(e) {
            if (!infoBtn.contains(e.target)) infoBtn.classList.remove('active');
        });
    }
}

function setupStartModal() {
    let modal = document.getElementById('startModal');
    modal.classList.remove('hddn');

    // Use a single delegated click on the grid — works every time modal is shown
    let grid = document.getElementById('startModes');
    grid.onclick = function(e) {
        let btn = e.target.closest('.startModeBtn');
        if (!btn) return;
        let mode = btn.getAttribute('data-mode');
        modal.classList.add('hddn');
        startGame(mode);
    };
}

function startGame(mode) {
    window.scrollTo(0, 0);
    updateTitleBar(mode);
    if (mode === 'quiz-mode'){
        document.querySelector('#svg1625').classList.add('moveMapUp');     
    } else if (mode === 'spot'){
        document.querySelector('#svg1625').classList.add('moveMapUp3x');
    }
    
    // console.log(mode + " mode starting...");
    // Restore elements that practice/map-practice mode may have hidden
    document.querySelector('.topBar').classList.remove('dsplyNone');
    document.querySelector('.statsRow').classList.remove('dsplyNone');

    // Detach any previous stateClicked handlers BEFORE stripping cls-2
    $('.cls-2').off('click');

    // Clear any explored-state highlights from previous map-practice session
    document.querySelectorAll('.exploredFill').forEach(function(el) {
        el.classList.remove('exploredFill');
    });
    // Clear spot highlights
    document.querySelectorAll('.spotHighlight').forEach(function(el) {
        el.classList.remove('spotHighlight');
    });
    // Reset all SVG state fills (correct=lightgreen, wrong=lightsalmon) and answered class
    document.querySelectorAll('#svg1625 .answered, #svg1625 .wrongFill, #svg1625 .cls-2').forEach(function(el) {
        el.style.fill = '';
        el.classList.remove('answered', 'wrongFill', 'cls-2');
    });
    // Remove all state labels from previous round
    removeAllStateLabels();

    document.getElementById('spotPanel').classList.add('dsplyNone');

    // Reset all state
    bIdentifyMode  = false;
    bFlashcardMode = false;
    bFlashcardHard = false;
    bMapPractice   = false;
    bSpotMode      = false;
    bSpotMcqMode   = false;
    bCheckWithStateCapital = false;
    arrCorrect = []; arrWrong = []; arrSkipped = [];
    bulletSlotMap = {}; nextBulletSlot = 0;
    currentStateIndex = null; currentStreak = 0;

    // Clear any existing bullets
    document.getElementById('bulletRow1').innerHTML = '';
    document.getElementById('bulletRow2').innerHTML = '';
    document.getElementById('bulletRow2').classList.remove('dsplyNone');

    // Pick dataset and set mode flags
    if (mode === 'states') {
        dataState = JSON.parse(JSON.stringify(dataState_full));
        bCheckWithStateCapital = true;
    } else if (mode === 'ne') {
        dataState = JSON.parse(JSON.stringify(dataState_NE));
    } else if (mode === 'identify') {
        dataState = JSON.parse(JSON.stringify(dataState_full));
        bIdentifyMode = true;
    } else if (mode === 'flashcard-practice') {
        dataState = JSON.parse(JSON.stringify(dataState_full));
        bFlashcardMode = true;
        bFlashcardHard = false;
    } else if (mode === 'flashcard-quiz') {
        dataState = JSON.parse(JSON.stringify(dataState_full));
        bFlashcardMode = true;
        bFlashcardHard = true;
    } else if (mode === 'map-practice') {
        dataState = JSON.parse(JSON.stringify(dataState_full));
        bMapPractice = true;
    } else if (mode === 'spot') {
        dataState = JSON.parse(JSON.stringify(dataState_full));
        bSpotMode = true;
    } else if (mode === 'spot-mcq') {
        dataState = JSON.parse(JSON.stringify(dataState_full));
        bSpotMcqMode = true;
    } else if (mode === 'quiz-mode') {
        dataState = JSON.parse(JSON.stringify(dataState_full));
    }

    arrAllStates = Object.keys(dataState);
    NUM_STATES   = arrAllStates.length - 1;
    currentGameMode = mode;

    let isPractice = (bFlashcardMode && !bFlashcardHard) || bMapPractice;

    // Progress bullets, topBar, stats — not shown in any practice mode
    if (isPractice) {
        document.querySelector('.topBar').classList.add('dsplyNone');
        document.querySelector('.statsRow').classList.add('dsplyNone');
    } else {
        let nBulletsToAdd = 14;
        if (mode === 'ne') {
            nBulletsToAdd = 8;
            document.getElementById('bulletRow2').classList.add('dsplyNone');
            addBullets(document.getElementById('bulletRow1'), nBulletsToAdd);
        } else {
            addBullets(document.getElementById('bulletRow1'), nBulletsToAdd);
            addBullets(document.getElementById('bulletRow2'), nBulletsToAdd);
        }
    }

    // Show / hide panels
    document.getElementById('identifyPanel').classList.add('dsplyNone');
    document.getElementById('flashcardPanel').classList.add('dsplyNone');
    document.getElementById('spotPanel').classList.add('dsplyNone');
    document.getElementById('spotMcqPanel').classList.add('dsplyNone');
    document.getElementById('mainMapHolder').classList.remove('dsplyNone');
    document.querySelector('.questionRow').classList.remove('dsplyNone');

    if (bIdentifyMode) {
        document.getElementById('identifyPanel').classList.remove('dsplyNone');
        document.getElementById('mainMapHolder').classList.add('dsplyNone');
        document.querySelector('.questionRow').classList.add('dsplyNone');
    } else if (bFlashcardMode) {
        document.getElementById('flashcardPanel').classList.remove('dsplyNone');
        document.getElementById('mainMapHolder').classList.add('dsplyNone');
        document.querySelector('.questionRow').classList.add('dsplyNone');
        initFlashcardUI();
    } else if (bSpotMode) {
        // Map stays visible; spot panel replaces questionRow
        document.querySelector('.questionRow').classList.add('dsplyNone');
        document.getElementById('spotPanel').classList.remove('dsplyNone');
        initSpotUI();
        // Make paths clickable for hover feedback
        document.querySelectorAll('path').forEach(function(elem) {
            if (elem.id.length === 2) elem.classList.add('cls-2');
        });
        arrSpecialStates.forEach(function(id) {
            let el = document.querySelector('#' + id);
            if (el) el.classList.add('cls-2');
        });
    } else if (bSpotMcqMode) {
        document.querySelector('.questionRow').classList.add('dsplyNone');
        document.getElementById('spotMcqPanel').classList.remove('dsplyNone');
        document.querySelectorAll('path').forEach(function(elem) {
            if (elem.id.length === 2) elem.classList.add('cls-2');
        });
        arrSpecialStates.forEach(function(id) {
            let el = document.querySelector('#' + id);
            if (el) el.classList.add('cls-2');
        });
    } else {
        // Map modes (quiz + practice): make state paths clickable
        document.querySelectorAll('path').forEach(function(elem) {
            if (elem.id.length === 2) elem.classList.add('cls-2');
        });
        arrSpecialStates.forEach(function(id) {
            let el = document.querySelector('#' + id);
            if (el) el.classList.add('cls-2');
        });
        addEventListeners();
        if (bMapPractice) {
            document.querySelector('.questionHolder').textContent = 'Tap any state to explore';
            document.getElementById('skipBtn').classList.add('dsplyNone');
            document.getElementById('infoBtn').classList.add('dsplyNone');
        } else {
            document.getElementById('skipBtn').classList.remove('dsplyNone');
            document.getElementById('infoBtn').classList.remove('dsplyNone');
        }
    }

    updateStats();
    if (bFlashcardMode && !bFlashcardHard) {
        stopTimer();
        fcPracticeRender();
    } else if (bMapPractice) {
        stopTimer();
        removeAllStateLabels();
    } else {
        startTimer();
        getNextQuestion();
    }
}

// ── Event listeners ──────────────────────────────────────────────

function addEventListeners() {
    $('.cls-2').off('click').on('click', stateClicked);
}

// ── Skip ─────────────────────────────────────────────────────────

function skipCurrent() {
    if (currentStateIndex === null) return;
    // No bullet slot assigned — skipping never marks a progress bullet
    if (arrSkipped.indexOf(currentStateIndex) === -1) {
        arrSkipped.push(currentStateIndex);
    }
    getNextQuestion();
}

// ── Question flow ────────────────────────────────────────────────

function getNextQuestion() {
    // Fresh = not yet answered, not currently in skip pool
    let fresh = [];
    for (let i = 0; i <= NUM_STATES; i++) {
        if (arrCorrect.indexOf(i) === -1 &&
            arrWrong.indexOf(i)   === -1 &&
            arrSkipped.indexOf(i) === -1) {
            fresh.push(i);
        }
    }

    let pool;
    if (fresh.length > 0) {
        pool = fresh;
    } else if (arrSkipped.length > 0) {
        pool = arrSkipped.slice();   // cycle through skipped states
    } else {
        showTopAlert();              // all done
        return;
    }

    let t = pool[Math.floor(Math.random() * pool.length)];
    currentStateIndex = t;

    let code        = arrAllStates[t];
    let stateName   = dataState[code][0];
    let capitalName = dataState[code][1] || "";
    if (dataState[code][2]) capitalName += " / " + dataState[code][2];

    if (bIdentifyMode) {
        renderIsolatedState(code);
        renderMCQOptions(t);
    } else if (bFlashcardMode) {
        renderFlashcard(code, t);
    } else if (bSpotMode) {
        spotHighlightState(code);
    } else if (bSpotMcqMode) {
        spotMcqHighlightState(code, t);
    } else {
        $('.questionHolder').text(bCheckWithStateCapital ? capitalName : stateName);
        // Update hint text and close tooltip
        let tooltip = document.getElementById('hintTooltip');
        let infoBtn = document.getElementById('infoBtn');
        if (tooltip) tooltip.textContent = stateHints[code] || "No hint available.";
        if (infoBtn) infoBtn.classList.remove('active');
    }
}

// ── Click handler ────────────────────────────────────────────────

function stateClicked(event) {
    let clickedId = event.target.id;

    // WB / TN: child path → resolve to parent group id
    if (clickedId.indexOf("path") === 0) {
        clickedId = document.querySelector("#" + clickedId).parentElement.id;
    }

    // Map Practice: just reveal the label and name, no scoring
    if (bMapPractice) {
        let name = dataState[clickedId] ? dataState[clickedId][0] : clickedId.toUpperCase();
        document.querySelector('.questionHolder').textContent = name;
        // Highlight the clicked state with the hover blue
        let el = document.getElementById(clickedId);
        if (el) {
            el.classList.add('exploredFill');
            // For groups (WB, TN) also colour children
            el.querySelectorAll('path').forEach(function(p) { p.classList.add('exploredFill'); });
        }
        showStateLabel(clickedId, name, 'explore', 0); // 0 = permanent
        return;
    }

    let correctAns = arrAllStates[currentStateIndex];

    if (clickedId === correctAns) {
        markAns("correct", clickedId);

    } else if (bCheckWithStateCapital && correctAns === "pb" && clickedId === "hr") {
        if (prevIdentifiedCapitalforCh.length === 0 || prevIdentifiedCapitalforCh === "pb") {
            markAns("correct", clickedId);
        } else {
            markAns("wrong", clickedId);
        }

    } else if (bCheckWithStateCapital && correctAns === "hr" && clickedId === "pb") {
        if (prevIdentifiedCapitalforCh.length === 0 || prevIdentifiedCapitalforCh === "hr") {
            markAns("correct", clickedId);
        } else {
            markAns("wrong", clickedId);
        }

    } else {
        markAns("wrong", clickedId);
    }

    // Identify mode handles its own post-answer flow in mcqClicked
    if (bIdentifyMode) return;

    // Check if round is over
    let fresh = [];
    for (let i = 0; i <= NUM_STATES; i++) {
        if (arrCorrect.indexOf(i) === -1 &&
            arrWrong.indexOf(i)   === -1 &&
            arrSkipped.indexOf(i) === -1) {
            fresh.push(i);
        }
    }

    if (fresh.length > 0 || arrSkipped.length > 0) {
        getNextQuestion();
    } else {
        showTopAlert();
    }
}

// ── Mark answer ──────────────────────────────────────────────────

function markAns(result, clickedStateId) {
    // Assign bullet slot only at answer time (never on skip)
    if (!(currentStateIndex in bulletSlotMap)) {
        bulletSlotMap[currentStateIndex] = nextBulletSlot++;
    }
    let slot       = bulletSlotMap[currentStateIndex];
    let bulletElem = document.querySelectorAll('.bullet')[slot];

    // Remove from skipped pool — now answered
    let si = arrSkipped.indexOf(currentStateIndex);
    if (si > -1) arrSkipped.splice(si, 1);

    if (result === "correct") {
        arrCorrect.push(currentStateIndex);
        if (bulletElem) {
            bulletElem.classList.remove("wrongBullet");
            bulletElem.classList.add("correctBullet");
        }
        if (!bIdentifyMode && !bFlashcardMode && !bSpotMode && !bSpotMcqMode) {
            let correctName = dataState[arrAllStates[currentStateIndex]][0];
            showStateLabel(clickedStateId, correctName, "", 2000);
            fillColor(clickedStateId, "correct");
        }
        currentStreak++;
        playSound("correct");

    } else {
        arrWrong.push(currentStateIndex);
        if (bulletElem) {
            bulletElem.classList.remove("correctBullet");
            bulletElem.classList.add("wrongBullet");
        }
        if (!bIdentifyMode && !bFlashcardMode && !bSpotMode && !bSpotMcqMode) {
            let wrongName   = dataState[arrAllStates[currentStateIndex]][0];
            let correctCode = arrAllStates[currentStateIndex];
            showStateLabel(clickedStateId, dataState[clickedStateId] ? dataState[clickedStateId][0] : clickedStateId.toUpperCase(), "wrong", 3000);
            if (clickedStateId !== correctCode) {
                showStateLabel(correctCode, wrongName, "correct-answer", 3000);
            }
            fillColor(clickedStateId, "incorrect");
        }
        currentStreak = 0;
        playSound("incorrect");
    }

    updateStats();
}

// ── End-of-round ─────────────────────────────────────────────────

function showTopAlert() {
    stopTimer();

    let perfect = arrWrong.length === 0;
    let n = arrWrong.length;

    // Record stats for scored (non-practice) modes
    let isPracticeMode = bMapPractice || (bFlashcardMode && !bFlashcardHard);
    let newBadges = [];
    if (!isPracticeMode) {
        newBadges = recordGameResult(currentGameMode, arrCorrect.length, n, currentStreak, timerSeconds);
    }

    // Populate stats
    document.getElementById('endEmoji').textContent      = perfect ? '🎉' : '😬';
    document.getElementById('endTitle').textContent      = perfect
        ? 'All states correct!'
        : 'You got ' + n + ' state' + (n > 1 ? 's' : '') + ' wrong.';
    document.getElementById('endCorrectVal').textContent = arrCorrect.length;
    document.getElementById('endWrongVal').textContent   = n;
    document.getElementById('endTimeVal').textContent    = formatTime(timerSeconds);

    // Show / hide action buttons
    let tryAgainBtn    = document.getElementById('endTryAgainBtn');
    let showAnswersBtn = document.getElementById('endShowAnswersBtn');

    if (perfect) {
        tryAgainBtn.classList.add('dsplyNone');
        showAnswersBtn.classList.add('dsplyNone');
    } else {
        tryAgainBtn.classList.remove('dsplyNone');
        showAnswersBtn.classList.remove('dsplyNone');
        tryAgainBtn.onclick    = tryAgain;
        showAnswersBtn.onclick = function() {
            hideEndModal();
            showCorrectAnswers();
        };
    }

    document.getElementById('endNewModeBtn').onclick = function() {
        hideEndModal();
        setupStartModal();
    };

    document.getElementById('endModal').classList.remove('hddn');

    // Show badge toast if any newly earned
    if (newBadges.length > 0) {
        setTimeout(function() { showBadgeToast(newBadges); }, 600);
    }
}

function hideEndModal() {
    let modal = document.getElementById('endModal');
    modal.classList.add('hddn');
}

function formatTime(secs) {
    let m = Math.floor(secs / 60);
    let s = secs % 60;
    return m + ':' + String(s).padStart(2, '0');
}

function tryAgain() {
    hideEndModal();
    removeAllStateLabels();

    if (bFlashcardMode) { fcSetFeedback('', ''); }
    if (bSpotMode) {
        spotSetFeedback('', '');
        document.querySelectorAll('.spotHighlight').forEach(function(el) { el.classList.remove('spotHighlight'); });
    }
    if (bSpotMcqMode) {
        spotMcqSetFeedback('', '');
        document.querySelectorAll('.spotHighlight').forEach(function(el) { el.classList.remove('spotHighlight'); });
    }

    document.querySelectorAll('.wrongBullet').forEach(function(el) { el.classList.remove('wrongBullet'); });

    arrSkipped    = arrWrong.slice();
    arrWrong      = [];
    currentStreak = 0;
    updateStats();
    startTimer();
    getNextQuestion();
}

// ── Colour fill ──────────────────────────────────────────────────

function fillColor(clickedStateId, correctIncorrect) {
    let color     = correctIncorrect === "correct" ? "lightgreen" : "lightsalmon";
    let isSpecial = arrSpecialStates.indexOf(clickedStateId) > -1;

    if (isSpecial) {
        Array.from($("#" + clickedStateId).children()).forEach(function(elem) {
            elem.style.fill = color;
            elem.classList.add("answered");
            if (correctIncorrect === "incorrect") elem.classList.add("wrongFill");
        });
    } else {
        let el = document.getElementById(clickedStateId);
        if (el) {
            el.style.fill = color;
            el.classList.add("answered");
            if (correctIncorrect === "incorrect") el.classList.add("wrongFill");
        }
    }

    if (correctIncorrect === "incorrect") setTimeout(removeIncorrectFill, 500);
}

function removeIncorrectFill() {
    document.querySelectorAll(".wrongFill").forEach(function(elem) {
        elem.style.fill = "";
        elem.classList.remove("wrongFill");
        elem.classList.remove("answered"); // re-enable hover after wrong answer fades
    });
}

// ── Audio — silent fail if file missing ─────────────────────────

function playSound(param) {
    if(soundEnabled === false) return;
    if (param === "correct") {
        // Play the bell audio file as before
        let el = document.querySelector("#correctAudio");
        if (!el) return;
        let p = el.play();
        if (p && typeof p.catch === 'function') p.catch(function() {});
        return;
    }

    // Incorrect: synthesised soft wah-wah trombone via Web Audio API
    try {
        let ctx = new (window.AudioContext || window.webkitAudioContext)();

        // Two descending notes: first "wah" then lower "wah"
        let notes = [
            { freq: 440, startTime: 0,    duration: 0.22 },
            { freq: 311, startTime: 0.22, duration: 0.28 }
        ];

        notes.forEach(function(note) {
            let osc    = ctx.createOscillator();
            let gain   = ctx.createGain();
            // Muted trombone tone: sawtooth softened with a low-pass filter
            let filter = ctx.createBiquadFilter();

            osc.type      = 'sawtooth';
            osc.frequency.setValueAtTime(note.freq, ctx.currentTime + note.startTime);
            // Slight downward pitch slide for the "wah" droop
            osc.frequency.linearRampToValueAtTime(
                note.freq * 0.80,
                ctx.currentTime + note.startTime + note.duration
            );

            filter.type            = 'lowpass';
            filter.frequency.value = 900;   // muffles the harsh high harmonics
            filter.Q.value         = 1.2;

            // Envelope: quick attack, hold, then fade out
            gain.gain.setValueAtTime(0, ctx.currentTime + note.startTime);
            gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + note.startTime + 0.04);
            gain.gain.setValueAtTime(0.18, ctx.currentTime + note.startTime + note.duration - 0.06);
            gain.gain.linearRampToValueAtTime(0, ctx.currentTime + note.startTime + note.duration);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime + note.startTime);
            osc.stop(ctx.currentTime + note.startTime + note.duration);
        });

        // Close context shortly after sound ends
        setTimeout(function() { ctx.close(); }, 800);
    } catch(e) { /* silent fail if Web Audio unavailable */ }
}

// ── Identify mode rendering ──────────────────────────────────────

function renderIsolatedState(code) {
    let el = document.getElementById('isolatedStateImg');
    if (!el) return;
    el.style.backgroundImage = 'url(img/' + code + '.svg)';
}

// Picks 3 random decoys + the correct answer, shuffles, renders buttons
function renderMCQOptions(correctIdx) {
    let correctCode = arrAllStates[correctIdx];
    let correctName = dataState[correctCode][0];

    // Pick 3 unique decoys from all states (not the correct one)
    let allIndices = [];
    for (let i = 0; i <= NUM_STATES; i++) {
        if (i !== correctIdx) allIndices.push(i);
    }
    // Shuffle and take first 3
    for (let i = allIndices.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = allIndices[i]; allIndices[i] = allIndices[j]; allIndices[j] = tmp;
    }
    let decoys = allIndices.slice(0, 3).map(function(i) {
        return dataState[arrAllStates[i]][0];
    });

    // Build options array and shuffle
    let options = decoys.concat([correctName]);
    for (let i = options.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = options[i]; options[i] = options[j]; options[j] = tmp;
    }

    // Render buttons
    for (let i = 0; i < 4; i++) {
        let btn = document.getElementById('mcqBtn' + i);
        btn.textContent = options[i];
        btn.className = 'mcqBtn';
        btn.disabled  = false;
        btn.onclick = function() { mcqClicked(options[i], correctName, correctCode); };
    }
}

function mcqClicked(chosen, correctName, correctCode) {
    let isCorrect = (chosen === correctName);

    // Disable all buttons and colour them
    for (let i = 0; i < 4; i++) {
        let btn = document.getElementById('mcqBtn' + i);
        btn.disabled = true;
        if (btn.textContent === correctName) {
            btn.classList.add(isCorrect ? 'correct' : 'reveal');
        } else if (btn.textContent === chosen && !isCorrect) {
            btn.classList.add('wrong');
        }
    }

    if (isCorrect) {
        markAns("correct", correctCode);
    } else {
        markAns("wrong", correctCode);
    }

    // Pause briefly so user can read the result, then advance
    setTimeout(function() {
        let fresh = [];
        for (let i = 0; i <= NUM_STATES; i++) {
            if (arrCorrect.indexOf(i) === -1 &&
                arrWrong.indexOf(i)   === -1 &&
                arrSkipped.indexOf(i) === -1) fresh.push(i);
        }
        if (fresh.length > 0 || arrSkipped.length > 0) {
            getNextQuestion();
        } else {
            showTopAlert();
        }
    }, 900);
}

// ── Flashcard mode ───────────────────────────────────────────────

// Practice mode state
let fcPracticeOrder = [];   // shuffled array of state codes
let fcPracticeIndex = 0;    // current position in the list

function initFlashcardUI() {
    if (bFlashcardHard) {
        // ── Quiz mode ──
        document.getElementById('fcPracticeNav').classList.add('dsplyNone');
        document.getElementById('fcQuizSpacer').classList.remove('dsplyNone');
        document.getElementById('fcDropdownRow').classList.remove('dsplyNone');

        // Populate dropdown (sorted alphabetically)
        let select = document.getElementById('fcSelect');
        while (select.options.length > 1) select.remove(1);
        let names = arrAllStates.map(function(code) {
            return { code: code, name: dataState[code][0] };
        });
        names.sort(function(a, b) { return a.name.localeCompare(b.name); });
        names.forEach(function(item) {
            let opt = document.createElement('option');
            opt.value = item.code;
            opt.textContent = item.name;
            select.appendChild(opt);
        });

        document.getElementById('fcSubmit').onclick = fcSubmitClicked;
        document.getElementById('fcSkipBtn').onclick = fcSkipClicked;
        select.onkeydown = function(e) { if (e.key === 'Enter') fcSubmitClicked(); };

    } else {
        // ── Practice mode ──
        document.getElementById('fcDropdownRow').classList.add('dsplyNone');
        document.getElementById('fcQuizSpacer').classList.add('dsplyNone');
        document.getElementById('fcPracticeNav').classList.remove('dsplyNone');

        // Hide quiz UI elements (bullets, stats, timer) — practice is just browsing
        document.querySelector('.topBar').classList.add('dsplyNone');
        document.querySelector('.statsRow').classList.add('dsplyNone');

        // Build a shuffled order of all state codes
        fcPracticeOrder = arrAllStates.slice();
        for (let i = fcPracticeOrder.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let tmp = fcPracticeOrder[i]; fcPracticeOrder[i] = fcPracticeOrder[j]; fcPracticeOrder[j] = tmp;
        }
        fcPracticeIndex = 0;

        document.getElementById('fcPrevBtn').onclick = fcPracticeGoPrev;
        document.getElementById('fcNextBtn').onclick = fcPracticeGoNext;
    }
}

// Practice navigation
function fcPracticeGoNext() {
    fcPracticeIndex = (fcPracticeIndex + 1) % fcPracticeOrder.length;
    fcPracticeRender();
}

function fcPracticeGoPrev() {
    fcPracticeIndex = (fcPracticeIndex - 1 + fcPracticeOrder.length) % fcPracticeOrder.length;
    fcPracticeRender();
}

function fcPracticeRender() {
    let code = fcPracticeOrder[fcPracticeIndex];
    document.getElementById('fcPracticeName').textContent = dataState[code][0];
    document.getElementById('fcImgHolder').style.backgroundImage = 'url(img/' + code + '.svg)';
}

function renderFlashcard(code, stateIdx) {
    if (!bFlashcardHard) {
        // Practice mode — driven by prev/next, not getNextQuestion
        fcPracticeRender();
        return;
    }

    // Quiz mode: hide name, load image, reset controls
    document.getElementById('fcImgHolder').style.backgroundImage = 'url(img/' + code + '.svg)';
    fcSetFeedback('', '');

    let select = document.getElementById('fcSelect');
    select.value    = '';
    select.disabled = false;
    document.getElementById('fcSubmit').disabled  = false;
    document.getElementById('fcSkipBtn').disabled = false;
}

function fcSubmitClicked() {
    let select = document.getElementById('fcSelect');
    let chosen = select.value;
    if (!chosen) return;

    let correctCode = arrAllStates[currentStateIndex];
    let correctName = dataState[correctCode][0];
    let isCorrect   = (chosen === correctCode);

    select.disabled = true;
    document.getElementById('fcSubmit').disabled  = true;
    document.getElementById('fcSkipBtn').disabled = true;

    if (isCorrect) {
        fcSetFeedback('✔ ' + correctName, 'fc-correct');
        markAns('correct', correctCode);
        // Remove this state from the dropdown — no point guessing it again
        let opt = select.querySelector('option[value="' + correctCode + '"]');
        if (opt) opt.remove();
    } else {
        let chosenName = dataState[chosen] ? dataState[chosen][0] : chosen;
        fcSetFeedback('✘ ' + correctName, 'fc-wrong');
        markAns('wrong', correctCode);
    }

    setTimeout(fcAdvance, 1400);
}

function fcSkipClicked() {
    if (currentStateIndex === null) return;
    document.getElementById('fcSelect').disabled  = true;
    document.getElementById('fcSubmit').disabled  = true;
    document.getElementById('fcSkipBtn').disabled = true;
    fcSetFeedback('', '');
    if (arrSkipped.indexOf(currentStateIndex) === -1) {
        arrSkipped.push(currentStateIndex);
    }
    setTimeout(fcAdvance, 200);
}

function fcAdvance() {
    let fresh = [];
    for (let i = 0; i <= NUM_STATES; i++) {
        if (arrCorrect.indexOf(i) === -1 &&
            arrWrong.indexOf(i)   === -1 &&
            arrSkipped.indexOf(i) === -1) fresh.push(i);
    }
    if (fresh.length > 0 || arrSkipped.length > 0) {
        getNextQuestion();
    } else {
        showTopAlert();
    }
}

function fcSetFeedback(text, cssClass) {
    let el = document.getElementById('fcFeedback');
    if (!el) return;
    el.textContent = text;
    el.className = 'flashcardFeedback ' + (cssClass || 'fc-empty');
}

// ── Spot the State mode ──────────────────────────────────────────

function initSpotUI() {
    let select = document.getElementById('spotSelect');
    // Populate dropdown (sorted alphabetically) — cleared each init
    while (select.options.length > 1) select.remove(1);
    arrAllStates.map(function(code) {
        return { code: code, name: dataState[code][0] };
    }).sort(function(a, b) {
        return a.name.localeCompare(b.name);
    }).forEach(function(item) {
        let opt = document.createElement('option');
        opt.value = item.code;
        opt.textContent = item.name;
        select.appendChild(opt);
    });

    document.getElementById('spotSubmit').onclick  = spotSubmitClicked;
    document.getElementById('spotSkipBtn').onclick = spotSkipClicked;
    select.onkeydown = function(e) { if (e.key === 'Enter') spotSubmitClicked(); };
}

let currentSpotCode = null;   // code of the currently highlighted state

function spotHighlightState(code) {
    // Remove previous highlight
    document.querySelectorAll('.spotHighlight').forEach(function(el) {
        el.classList.remove('spotHighlight');
    });
    currentSpotCode = code;
    let el = document.getElementById(code);
    if (el) {
        el.classList.add('spotHighlight');
        el.querySelectorAll('path').forEach(function(p) { p.classList.add('spotHighlight'); });
    }
    // Reset controls
    let select = document.getElementById('spotSelect');
    select.value    = '';
    select.disabled = false;
    document.getElementById('spotSubmit').disabled  = false;
    document.getElementById('spotSkipBtn').disabled = false;
    spotSetFeedback('', '');
}

function spotSubmitClicked() {
    let select = document.getElementById('spotSelect');
    let chosen = select.value;
    if (!chosen) return;

    let correctCode = arrAllStates[currentStateIndex];
    let correctName = dataState[correctCode][0];
    let isCorrect   = (chosen === correctCode);

    select.disabled = true;
    document.getElementById('spotSubmit').disabled  = true;
    document.getElementById('spotSkipBtn').disabled = true;

    // Remove highlight, show correct colour on map briefly
    document.querySelectorAll('.spotHighlight').forEach(function(el) {
        el.classList.remove('spotHighlight');
    });

    if (isCorrect) {
        spotSetFeedback('✔ ' + correctName, 'fc-correct');
        markAns('correct', correctCode);
        fillColor(correctCode, 'correct');
        // Remove from dropdown — no point guessing it again
        let opt = select.querySelector('option[value="' + correctCode + '"]');
        if (opt) opt.remove();
    } else {
        let chosenName = dataState[chosen] ? dataState[chosen][0] : chosen;
        spotSetFeedback('✘ ' + correctName, 'fc-wrong');
        markAns('wrong', correctCode);
        fillColor(correctCode, 'incorrect');
    }

    setTimeout(spotAdvance, 1400);
}

function spotSkipClicked() {
    if (currentStateIndex === null) return;
    document.getElementById('spotSelect').disabled  = true;
    document.getElementById('spotSubmit').disabled  = true;
    document.getElementById('spotSkipBtn').disabled = true;
    document.querySelectorAll('.spotHighlight').forEach(function(el) {
        el.classList.remove('spotHighlight');
    });
    spotSetFeedback('', '');
    if (arrSkipped.indexOf(currentStateIndex) === -1) {
        arrSkipped.push(currentStateIndex);
    }
    setTimeout(spotAdvance, 200);
}

function spotAdvance() {
    let fresh = [];
    for (let i = 0; i <= NUM_STATES; i++) {
        if (arrCorrect.indexOf(i) === -1 &&
            arrWrong.indexOf(i)   === -1 &&
            arrSkipped.indexOf(i) === -1) fresh.push(i);
    }
    if (fresh.length > 0 || arrSkipped.length > 0) {
        getNextQuestion();
    } else {
        showTopAlert();
    }
}

function spotSetFeedback(text, cssClass) {
    let el = document.getElementById('spotFeedback');
    if (!el) return;
    el.textContent = text;
    el.className = 'flashcardFeedback ' + (cssClass || 'fc-empty');
}

// ── Spot MCQ mode ────────────────────────────────────────────────

function spotMcqHighlightState(code, stateIdx) {
    // Remove previous highlight
    document.querySelectorAll('.spotHighlight').forEach(function(el) {
        el.classList.remove('spotHighlight');
    });
    let el = document.getElementById(code);
    if (el) {
        el.classList.add('spotHighlight');
        el.querySelectorAll('path').forEach(function(p) { p.classList.add('spotHighlight'); });
    }
    // Render 4 MCQ chips
    spotMcqRenderOptions(stateIdx);
    spotMcqSetFeedback('', '');
    document.getElementById('spotMcqSkipBtn').disabled = false;
}

function spotMcqRenderOptions(correctIdx) {
    let correctCode = arrAllStates[correctIdx];
    let correctName = dataState[correctCode][0];

    // 3 random decoys
    let pool = [];
    for (let i = 0; i <= NUM_STATES; i++) {
        if (i !== correctIdx) pool.push(i);
    }
    for (let i = pool.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
    }
    let options = pool.slice(0, 3).map(function(i) {
        return dataState[arrAllStates[i]][0];
    }).concat([correctName]);

    // Shuffle
    for (let i = options.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = options[i]; options[i] = options[j]; options[j] = tmp;
    }

    for (let i = 0; i < 4; i++) {
        let btn = document.getElementById('spotMcqBtn' + i);
        btn.textContent = options[i];
        btn.className = 'mcqBtn';
        btn.disabled = false;
        btn.onclick = (function(chosen) {
            return function() { spotMcqClicked(chosen, correctName, correctCode); };
        })(options[i]);
    }
}

function spotMcqClicked(chosen, correctName, correctCode) {
    let isCorrect = (chosen === correctName);

    // Lock all buttons, colour correct/wrong/reveal
    for (let i = 0; i < 4; i++) {
        let btn = document.getElementById('spotMcqBtn' + i);
        btn.disabled = true;
        if (btn.textContent === correctName) {
            btn.classList.add(isCorrect ? 'correct' : 'reveal');
        } else if (btn.textContent === chosen && !isCorrect) {
            btn.classList.add('wrong');
        }
    }
    document.getElementById('spotMcqSkipBtn').disabled = true;

    // Remove highlight, show colour on map
    document.querySelectorAll('.spotHighlight').forEach(function(el) {
        el.classList.remove('spotHighlight');
    });

    if (isCorrect) {
        spotMcqSetFeedback('✔ ' + correctName, 'fc-correct');
        markAns('correct', correctCode);
        fillColor(correctCode, 'correct');
    } else {
        spotMcqSetFeedback('✘ ' + correctName, 'fc-wrong');
        markAns('wrong', correctCode);
        fillColor(correctCode, 'incorrect');
    }

    setTimeout(spotMcqAdvance, 900);
}

function spotMcqSkipClicked() {
    if (currentStateIndex === null) return;
    document.querySelectorAll('#spotMcqOptions .mcqBtn').forEach(function(b) { b.disabled = true; });
    document.getElementById('spotMcqSkipBtn').disabled = true;
    document.querySelectorAll('.spotHighlight').forEach(function(el) {
        el.classList.remove('spotHighlight');
    });
    spotMcqSetFeedback('', '');
    if (arrSkipped.indexOf(currentStateIndex) === -1) {
        arrSkipped.push(currentStateIndex);
    }
    setTimeout(spotMcqAdvance, 200);
}

function spotMcqAdvance() {
    let fresh = [];
    for (let i = 0; i <= NUM_STATES; i++) {
        if (arrCorrect.indexOf(i) === -1 &&
            arrWrong.indexOf(i)   === -1 &&
            arrSkipped.indexOf(i) === -1) fresh.push(i);
    }
    if (fresh.length > 0 || arrSkipped.length > 0) {
        getNextQuestion();
    } else {
        showTopAlert();
    }
}

function spotMcqSetFeedback(text, cssClass) {
    // Feedback is an overlay inside .mapHolder
    let holder = document.getElementById('mainMapHolder');
    if (!holder) return;
    let el = document.getElementById('spotMcqFeedback');
    if (!el) {
        el = document.createElement('div');
        el.id = 'spotMcqFeedback';
        holder.appendChild(el);
    }
    el.textContent = text;
    el.className = 'spotMcqMapFeedback ' + (cssClass || 'fc-empty');
}

// ── Bullet helpers ───────────────────────────────────────────────

function addBullets(parentElem, nCount) {
    for (let i = 0; i < nCount; i++) {
        let div = document.createElement('div');
        div.classList.add("bullet");
        parentElem.appendChild(div);
    }
}

// ── Settings panel ───────────────────────────────────────────────

function initSettingsPanel() {
    const gearBtn     = document.getElementById('gearBtn');
    const panel       = document.getElementById('settingsPanel');
    const modeOptions = document.querySelectorAll('.modeOption');
    const applyBtn    = document.getElementById('applySettings');

    function getCurrentMode() {
        if (bMapPractice)  return 'map-practice';
        if (bSpotMode)     return 'spot';
        if (bSpotMcqMode)  return 'spot-mcq';
        if (bFlashcardMode && !bFlashcardHard) return 'flashcard-practice';
        if (bFlashcardMode && bFlashcardHard)  return 'flashcard-quiz';
        if (bIdentifyMode)  return 'identify';
        if (bCheckWithStateCapital) return 'states';
        if (arrAllStates && arrAllStates.length <= 8) return 'ne';
        return '';
    }

    function syncSelection() {
        let current = getCurrentMode();
        modeOptions.forEach(function(opt) {
            let match = opt.getAttribute('data-mode') === current;
            opt.classList.toggle('selected', match);
            opt.querySelector('input').checked = match;
        });
    }

    gearBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        let isOpen = panel.classList.toggle('visible');
        gearBtn.classList.toggle('open', isOpen);
        if (isOpen) syncSelection();
    });

    modeOptions.forEach(function(opt) {
        opt.addEventListener('click', function() {
            modeOptions.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
        });
    });

    /* applyBtn.addEventListener('click', function() {
        let selected = document.querySelector('.modeOption.selected');
        let mode = selected ? selected.getAttribute('data-mode') : '';
        panel.classList.remove('visible');
        gearBtn.classList.remove('open');
        stopTimer();
        removeAllStateLabels();
        startGame(mode);
    }); */

    document.addEventListener('click', function(e) {
        if (!panel.contains(e.target) && e.target !== gearBtn) {
            panel.classList.remove('visible');
            gearBtn.classList.remove('open');
        }
    });
}

document.addEventListener('DOMContentLoaded', initSettingsPanel);

// ── State labels on SVG map ──────────────────────────────────────

// Returns the centre {x, y} of an SVG element in SVG coordinate space
function getSVGCentre(stateId) {
    let el = document.getElementById(stateId);
    if (!el) return null;
    try {
        let bbox = el.getBBox();
        return { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2 };
    } catch(e) { return null; }
}

// Show a temporary label on the map over a state; auto-fades after `duration` ms
let labelFadeTimers = {}; // stateId → timeout handle

function showStateLabel(stateId, text, cssClass, duration) {
    if (!labelsEnabled) return;
    let svg = document.getElementById('svg1625');
    if (!svg) return;

    let centre = getSVGCentre(stateId);
    if (!centre) return;

    // Remove any existing label for this state
    removeStateLabel(stateId);

    let labelId = 'lbl-' + stateId;
    let textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textEl.setAttribute("id", labelId);
    textEl.setAttribute("x", centre.x);
    textEl.setAttribute("y", centre.y);
    textEl.setAttribute("class", "state-label " + (cssClass || ""));
    textEl.textContent = text;
    svg.appendChild(textEl);

    if (duration) {
        // Start fade after (duration - 1500ms) so the CSS transition completes by `duration`
        let fadeDelay = Math.max(0, duration - 1500);
        labelFadeTimers[stateId] = setTimeout(function() {
            textEl.classList.add('fading');
            setTimeout(function() { removeStateLabel(stateId); }, 1500);
        }, fadeDelay);
    }
}

function removeStateLabel(stateId) {
    let existing = document.getElementById('lbl-' + stateId);
    if (existing) existing.parentNode.removeChild(existing);
    if (labelFadeTimers[stateId]) {
        clearTimeout(labelFadeTimers[stateId]);
        delete labelFadeTimers[stateId];
    }
}

function removeAllStateLabels() {
    let svg = document.getElementById('svg1625');
    if (!svg) return;
    svg.querySelectorAll('.state-label').forEach(function(el) {
        el.parentNode.removeChild(el);
    });
    labelFadeTimers = {};
}

// Show permanent labels for all states the user got wrong
function showCorrectAnswers() {
    removeAllStateLabels();
    arrWrong.forEach(function(stateIdx) {
        let code = arrAllStates[stateIdx];
        let name = dataState[code][0];
        showStateLabel(code, name, "correct-answer", null); // null = no fade
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // showAnswersLink now handled inline in showTopAlert via endShowAnswersBtn
});

// ── Stats & Badges Engine ────────────────────────────────────────

const STATS_KEY = 'indiaQuizStats';

const MODE_META = {
    '':                 { icon: '🗺️',  label: 'Map Quiz' },
    'map-practice':     { icon: '🧭',  label: 'Practice Map' },
    'states':           { icon: '🏛️',  label: 'Capitals' },
    'ne':               { icon: '🌿',  label: 'North East' },
    'identify':         { icon: '🔍',  label: 'Identify' },
    'spot':             { icon: '📍',  label: 'Spot the State' },
    'spot-mcq':         { icon: '🎲',  label: 'Spot Quick Pick' },
    'flashcard-practice':{ icon: '📖', label: 'FC Practice' },
    'flashcard-quiz':   { icon: '🎯',  label: 'FC Quiz' },
};

const BADGE_DEFS = [
    { id: 'first_game',   emoji: '🎮', label: 'First Game',    desc: 'Complete your first game' },
    { id: 'perfect_1',    emoji: '⭐', label: 'Perfect!',      desc: 'Finish a round with no wrong answers' },
    { id: 'perfect_5',    emoji: '🌟', label: 'Flawless x5',   desc: '5 perfect rounds' },
    { id: 'streak_5',     emoji: '🔥', label: 'Hot Streak',    desc: 'Reach a streak of 5 in one game' },
    { id: 'streak_10',    emoji: '💥', label: 'On Fire',       desc: 'Reach a streak of 10 in one game' },
    { id: 'streak_20',    emoji: '🚀', label: 'Unstoppable',   desc: 'Reach a streak of 20 in one game' },
    { id: 'daily_3',      emoji: '📅', label: '3-Day Run',     desc: 'Play 3 days in a row' },
    { id: 'daily_7',      emoji: '🗓️', label: 'Week Warrior',  desc: 'Play 7 days in a row' },
    { id: 'all_modes',    emoji: '🏆', label: 'Explorer',      desc: 'Try all 8 quiz modes' },
    { id: 'speed_demon',  emoji: '⚡', label: 'Speed Demon',   desc: 'Perfect round in under 90s' },
    { id: 'centurion',    emoji: '💯', label: 'Centurion',     desc: '100 correct answers total' },
    { id: 'daily_30',     emoji: '🔱', label: 'Dedicated',     desc: 'Play 30 days in a row' },
];

function loadStats() {
    try {
        let raw = localStorage.getItem(STATS_KEY);
        if (raw) return JSON.parse(raw);
    } catch(e) {}
    return {
        totalGames: 0,
        totalCorrect: 0,
        totalWrong: 0,
        bestStreak: 0,
        currentDayStreak: 0,
        lastPlayedDate: null,
        modesPlayed: [],
        badges: [],
        modes: {}
    };
}

function saveStats(s) {
    try { localStorage.setItem(STATS_KEY, JSON.stringify(s)); } catch(e) {}
}

function todayStr() {
    return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

// Called at end of every scored game round
function recordGameResult(mode, correct, wrong, streak, timeSecs) {
    let s = loadStats();

    // Daily streak tracking
    let today = todayStr();
    let yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (s.lastPlayedDate === today) {
        // already played today — no change to streak
    } else if (s.lastPlayedDate === yesterday) {
        s.currentDayStreak = (s.currentDayStreak || 0) + 1;
    } else {
        s.currentDayStreak = 1; // reset
    }
    s.lastPlayedDate = today;

    // Global totals
    s.totalGames   = (s.totalGames || 0) + 1;
    s.totalCorrect = (s.totalCorrect || 0) + correct;
    s.totalWrong   = (s.totalWrong || 0) + wrong;
    if (streak > (s.bestStreak || 0)) s.bestStreak = streak;

    // Mode stats
    if (!s.modes) s.modes = {};
    if (!s.modes[mode]) s.modes[mode] = { gamesPlayed: 0, bestStreak: 0, perfectRuns: 0, bestTime: null };
    let m = s.modes[mode];
    m.gamesPlayed = (m.gamesPlayed || 0) + 1;
    if (streak > (m.bestStreak || 0)) m.bestStreak = streak;
    if (wrong === 0) {
        m.perfectRuns = (m.perfectRuns || 0) + 1;
        if (m.bestTime === null || timeSecs < m.bestTime) m.bestTime = timeSecs;
    }

    // Modes tried
    if (!s.modesPlayed) s.modesPlayed = [];
    if (s.modesPlayed.indexOf(mode) === -1) s.modesPlayed.push(mode);

    // Badge evaluation
    if (!s.badges) s.badges = [];
    let newBadges = [];
    function earn(id) {
        if (s.badges.indexOf(id) === -1) { s.badges.push(id); newBadges.push(id); }
    }
    earn('first_game');
    if (wrong === 0)               earn('perfect_1');
    if (m.perfectRuns >= 5)        earn('perfect_5');
    if (streak >= 5)               earn('streak_5');
    if (streak >= 10)              earn('streak_10');
    if (streak >= 20)              earn('streak_20');
    if (s.currentDayStreak >= 3)   earn('daily_3');
    if (s.currentDayStreak >= 7)   earn('daily_7');
    if (s.currentDayStreak >= 30)  earn('daily_30');
    if (s.modesPlayed.length >= 8) earn('all_modes');
    if (wrong === 0 && timeSecs <= 90) earn('speed_demon');
    if (s.totalCorrect >= 100)     earn('centurion');

    saveStats(s);
    return newBadges;
}

// ── Stats panel UI ───────────────────────────────────────────────

function renderStatsPanel() {
    let s = loadStats();

    // Daily streak
    document.getElementById('spDayStreak').textContent = s.currentDayStreak || 0;
    let sub = document.getElementById('spDayStreakSub');
    if (!s.lastPlayedDate) {
        sub.textContent = 'Play today to start a streak!';
    } else if (s.lastPlayedDate === todayStr()) {
        sub.textContent = 'Played today ✓';
    } else {
        let yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        sub.textContent = s.lastPlayedDate === yesterday
            ? 'Play today to keep your streak!'
            : 'Streak ended — start again today';
    }

    // Global
    document.getElementById('spTotalGames').textContent   = s.totalGames || 0;
    document.getElementById('spBestStreak').textContent   = s.bestStreak || 0;
    document.getElementById('spTotalCorrect').textContent = s.totalCorrect || 0;

    // Per-mode rows
    let table = document.getElementById('spModeTable');
    table.innerHTML = '';
    let quizModes = Object.keys(MODE_META).filter(function(k) { return k !== 'map-practice' && k !== 'flashcard-practice'; });
    quizModes.forEach(function(modeKey) {
        let meta = MODE_META[modeKey];
        let ms   = (s.modes && s.modes[modeKey]) || {};
        let row  = document.createElement('div');
        row.className = 'statsModeRow';
        row.innerHTML =
            '<span class="statsModeIcon">' + meta.icon + '</span>' +
            '<span class="statsModeName">' + meta.label + '</span>' +
            '<div class="statsModeVals">' +
              '<div class="statsModeVal"><span>' + (ms.gamesPlayed || 0) + '</span><span>played</span></div>' +
              '<div class="statsModeVal"><span>' + (ms.bestStreak || 0) + '</span><span>streak</span></div>' +
              '<div class="statsModeVal"><span>' + (ms.perfectRuns || 0) + '</span><span>perfect</span></div>' +
            '</div>';
        table.appendChild(row);
    });

    // Badges
    let grid = document.getElementById('spBadgeGrid');
    grid.innerHTML = '';
    BADGE_DEFS.forEach(function(def) {
        let earned = s.badges && s.badges.indexOf(def.id) > -1;
        let cell = document.createElement('div');
        cell.className = 'badge' + (earned ? ' earned' : '');
        cell.title = def.desc;
        cell.innerHTML =
            '<span class="badgeEmoji">' + def.emoji + '</span>' +
            '<span class="badgeLabel">' + def.label + '</span>';
        grid.appendChild(cell);
    });
}

function initStatsPanel() {
    let btn   = document.getElementById('podiumBtn');
    let panel = document.getElementById('statsPanel');
    let close = document.getElementById('statsPanelClose');

    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        let isOpen = panel.classList.toggle('visible');
        btn.classList.toggle('active', isOpen);
        // Close settings if open
        document.getElementById('settingsPanel').classList.remove('visible');
        document.getElementById('gearBtn').classList.remove('open');
        if (isOpen) renderStatsPanel();
    });

    close.addEventListener('click', function() {
        panel.classList.remove('visible');
        btn.classList.remove('active');
    });

    document.addEventListener('click', function(e) {
        if (!panel.contains(e.target) && e.target !== btn) {
            panel.classList.remove('visible');
            btn.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', initStatsPanel);

// ── Badge toast notification ─────────────────────────────────────

function showBadgeToast(badgeIds) {
    // Show one toast per new badge, staggered
    badgeIds.forEach(function(id, i) {
        let def = BADGE_DEFS.find(function(b) { return b.id === id; });
        if (!def) return;
        setTimeout(function() {
            let toast = document.createElement('div');
            toast.className = 'badgeToast';
            toast.innerHTML =
                '<span class="badgeToastEmoji">' + def.emoji + '</span>' +
                '<div class="badgeToastText">' +
                  '<span class="badgeToastTitle">Badge Unlocked!</span>' +
                  '<span class="badgeToastName">' + def.label + '</span>' +
                '</div>';
            document.body.appendChild(toast);
            // Trigger animation
            requestAnimationFrame(function() {
                requestAnimationFrame(function() { toast.classList.add('show'); });
            });
            setTimeout(function() {
                toast.classList.remove('show');
                setTimeout(function() { toast.remove(); }, 400);
            }, 3000);
        }, i * 600);
    });
}
