const firstNames = [
    'Anna', 'Hanna', 'Luca', 'Zoé', 'Jázmin', 'Lili', 'Zsófia', 'Emma', 'Boglárka', 'Fanni',
    'Dóra', 'Réka', 'Viktória', 'Eszter', 'Nóra', 'Gréta', 'Csenge', 'Vivien', 'Adél', 'Izabella',
    'Petra', 'Laura', 'Bianka', 'Fruzsina', 'Kinga', 'Bernadett', 'Barbara', 'Orsolya', 'Kitti', 'Nikolett',
    'Brigitta', 'Alexandra', 'Enikő', 'Dorina', 'Virág', 'Vanda', 'Lilla', 'Noémi', 'Zselyke', 'Míra',
    'Léna', 'Janka', 'Natasa', 'Emília', 'Szonja', 'Tamara', 'Blanka', 'Kamilla', 'Olívia', 'Borbála',
    'Julianna', 'Sarolta', 'Dalma', 'Rebeka', 'Flóra', 'Panna', 'Szofia', 'Veronika', 'Ágnes', 'Zita',
    'Judit', 'Klára', 'Evelin', 'Regina', 'Sára', 'Dorottya', 'Tímea', 'Beatrix', 'Adrienn', 'Gabriella',
    'Krisztina', 'Andrea', 'Katalin', 'Mónika', 'Szilvia', 'Erika', 'Tünde', 'Ildikó', 'Mariann', 'Melinda',
    'Renáta', 'Edina', 'Gyöngyi', 'Anikó', 'Hajnalka', 'Bettina', 'Diána', 'Klaudia', 'Ditta', 'Zsanett',
    'Henriett', 'Anita', 'Szabina', 'Cintia', 'Dominika', 'Ramóna', 'Bíborka', 'Csilla', 'Emese', 'Gitta'
];
const lastNames = ['Nagy', 'Kovács', 'Tóth', 'Szabó', 'Horváth', 'Varga', 'Kiss', 'Molnár', 'Németh', 'Farkas', 'Balogh', 'Papp', 'Takács', 'Juhász', 'Lakatos', 'Mészáros', 'Simon', 'Rácz', 'Fekete', 'Szalai'];
const cities = [
    'Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pécs', 'Győr', 'Nyíregyháza', 'Kecskemét',
    'Székesfehérvár', 'Szombathely', 'Szolnok', 'Tatabánya', 'Kaposvár', 'Érd', 'Veszprém',
    'Békéscsaba', 'Zalaegerszeg', 'Eger', 'Sopron', 'Dunaújváros', 'Hódmezővásárhely', 'Nagykanizsa'
];
const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];

const portraitImages = [
    'img/portraits/girl_1.png',
    'img/portraits/girl_2.png',
    'img/portraits/girl_3.png'
];

function generateRandomData(count) {
    const data = [];
    const currentYear = new Date().getFullYear();

    for (let i = 0; i < count; i++) {
        const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
        const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
        // Age under 18 (e.g., 14-17)
        const age = Math.floor(Math.random() * (17 - 14 + 1)) + 14;

        // Generate Details
        const birthYear = currentYear - age;
        const birthMonth = Math.floor(Math.random() * 12) + 1;
        const birthDay = Math.floor(Math.random() * 28) + 1;
        const birthDate = `${birthYear}.${birthMonth.toString().padStart(2, '0')}.${birthDay.toString().padStart(2, '0')}`;

        const birthPlace = cities[Math.floor(Math.random() * cities.length)];
        const residence = Math.random() > 0.3 ? birthPlace : cities[Math.floor(Math.random() * cities.length)]; // 30% chance moved

        // Generate anonymous social handles (non-identifiable)
        const randomString = Math.random().toString(36).substring(2, 10);
        const randomNum = Math.floor(Math.random() * 9999);
        const codeName = `user_${randomString}`;
        const fbHandle = `id${randomNum}${Math.random().toString(36).substring(2, 6)}`;

        // Image handling logic
        let portrait;
        const imgIndex = (i % 50) + 1; // 1 to 50

        // girl_1, girl_2, girl_3 are PNG, girl_4 onwards are JPG
        if (imgIndex <= 3) {
            portrait = `img/portraits/girl_${imgIndex}.png`;
        } else {
            portrait = `img/portraits/girl_${imgIndex}.jpg`;
        }

        // Randomly decide which fields are redacted (Reduced probability: ~15-20%)
        const redactedFields = [];
        if (Math.random() > 0.85) redactedFields.push('instagram');
        if (Math.random() > 0.85) redactedFields.push('facebook');

        data.push({
            lastName: ln,
            firstName: fn,
            fullName: `${fn} ${ln}`,
            instagram: `@${codeName}`,
            age: age,
            birthDate: birthDate,
            birthPlace: birthPlace,
            residence: residence,
            facebook: `/u/${fbHandle}`,
            portrait: portrait,
            redactedFields: redactedFields
        });
    }
    return data;
}

const data = generateRandomData(50);

// State Management
const isRedacted = true; // Permanently redacted

// DOM Elements
const tableBody = document.getElementById('table-body');
const recordCount = document.getElementById('record-count');
const filterBtn = document.getElementById('filter-btn');

// Initialize Application
function init() {
    initCustomCursor();
    // initLandingPage(); // Removed
    renderTable();
    updateRecordCount();
    attachEventListeners();
    animateOnLoad(); // Defer until entered
    startSurveillanceClocks();
    initScrollObserver();
    initInteractions(); // Advanced interactions
    initHackingGame(); // Minigame
}

function initHackingGame() {
    const startBtn = document.getElementById('start-hack-btn');
    const startScreen = document.getElementById('hack-start-screen');
    const gameUI = document.getElementById('hack-game-ui');
    const slider = document.getElementById('freq-slider');
    const signalVal = document.getElementById('signal-val');
    const feedItem = document.getElementById('interactive-feed');
    const secretImg = document.getElementById('secret-feed-img');
    const statusText = document.getElementById('hack-status');
    const recIndicator = document.getElementById('cam-4-rec');

    if (!startBtn) return;

    // Random target frequency between 10 and 90
    const targetFreq = Math.floor(Math.random() * 80) + 10;
    // console.log("Target Frequency:", targetFreq); // For debugging aka cheating

    startBtn.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        gameUI.classList.remove('hidden');
    });

    slider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        const diff = Math.abs(val - targetFreq);

        // Visual feedback based on proximity
        let signalStrength = 0;

        if (diff < 20) {
            signalStrength = 100 - (diff * 5); // 0 diff = 100%, 20 diff = 0%
        } else {
            signalStrength = Math.random() * 10; // Noise
        }

        // Clamp
        if (signalStrength < 0) signalStrength = 0;
        signalStrength = Math.floor(signalStrength);

        signalVal.textContent = `${signalStrength}%`;

        // Update noise on image
        const blurAmount = Math.max(0, (diff - 2) / 2); // Less blur as we get closer
        secretImg.style.filter = `blur(${blurAmount}px) grayscale(${diff > 5 ? 1 : 0})`;
        secretImg.style.opacity = 0.3 + (signalStrength / 200);

        if (diff < 3) {
            statusText.textContent = "LOCKING SIGNAL...";
            statusText.style.color = "#0f0";
            checkWin();
        } else {
            statusText.textContent = "SEARCHING...";
            statusText.style.color = "var(--text-muted)";
            resetWinTimer();
        }
    });

    let winTimer = null;

    function checkWin() {
        if (winTimer) return;
        winTimer = setTimeout(() => {
            unlockFeed();
        }, 1500); // Hold for 1.5 seconds
    }

    function resetWinTimer() {
        if (winTimer) {
            clearTimeout(winTimer);
            winTimer = null;
        }
    }

    function unlockFeed() {
        gameUI.classList.add('hidden');
        feedItem.classList.add('unlocked', 'decrypt-success');
        secretImg.style.filter = "none";
        secretImg.style.opacity = "1";

        // Change image to something cool if possible, or just keep the 'evidence'
        // Let's use one of the girl portraits as the "Target Found"
        const randomTarget = portraitImages[Math.floor(Math.random() * portraitImages.length)];
        secretImg.src = randomTarget; // Reveal a person!

        recIndicator.classList.remove('hidden');

        // Add a fancy success flash
        const flash = document.createElement('div');
        flash.style.position = 'absolute';
        flash.style.top = '0'; flash.style.left = '0';
        flash.style.width = '100%'; flash.style.height = '100%';
        flash.style.background = '#fff';
        flash.style.opacity = '0.8';
        flash.style.transition = 'opacity 0.5s';
        feedItem.appendChild(flash);

        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => flash.remove(), 500);
        }, 100);
    }
}

function initInteractions() {
    // 3D Tilt Effect for cards
    const cards = document.querySelectorAll('.evidence-card, .file-header');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Glitch Text on Hover
    const headers = document.querySelectorAll('h1, h2, th');
    headers.forEach(header => {
        header.addEventListener('mouseover', () => {
            header.style.animation = 'textGlitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite';
        });
        header.addEventListener('mouseleave', () => {
            header.style.animation = 'none';
        });
    });
}

// Custom Cursor Logic
function initCustomCursor() {
    // Custom cursor removed per user request
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) cursor.remove();
}

// Scroll Animation Observer
function initScrollObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe existing elements
    document.querySelectorAll('.evidence-card, .file-header, .controls, .feed-item').forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });

    // Make observer globally accessible to observe new table rows
    window.scrollObserver = observer;
}

function startSurveillanceClocks() {
    const camTime = document.getElementById('time-cam-1');
    if (!camTime) return;

    setInterval(() => {
        const now = new Date();
        camTime.textContent = now.toLocaleTimeString('hu-HU');
    }, 1000);
}

// Render Table
function renderTable(filteredData = data) {
    tableBody.innerHTML = '';

    filteredData.forEach((record, index) => {
        const row = document.createElement('tr');

        // Partial Name Redaction Logic:
        const lastNameInitial = record.lastName.charAt(0);
        const lastNameRest = record.lastName.slice(1);

        const nameHtml = `
            <div class="name-container">
                <strong>${record.firstName}&nbsp;${lastNameInitial}</strong>
                <span class="redacted-block"></span>
                <span class="hidden-part">${lastNameRest}</span>
            </div>
        `;

        // Portrait Photo HTML
        const photoHtml = `
            <div class="user-portrait-container">
                <img src="${record.portrait}" alt="User Photo" class="user-portrait" loading="lazy">
            </div>
        `;

        // The 3 Requested Points
        // 1. Hol született (Place of Birth)
        // 2. Mikor (Date of Birth)
        // 3. Hol lakik (Residence)
        const detailsHtml = `
            <ul class="user-details-list">
                <li><span class="detail-icon">🐣</span> Szül: ${record.birthDate}, ${record.birthPlace}</li>
                <li><span class="detail-icon">🏠</span> Lakik: ${record.residence}</li>
                <li class="faded"><span class="detail-icon">🔒</span> Anonim ID: #8392-A</li>
            </ul>
        `;

        row.innerHTML = `
            <td>${index + 1}</td>
            <td class="photo-cell">${photoHtml}</td>
            <td class="info-cell">
                ${nameHtml}
                ${detailsHtml}
            </td>
        `;

        // Add scroll animation class
        row.classList.add('reveal-on-scroll');
        tableBody.appendChild(row);

        // Observe for scroll reveal
        if (window.scrollObserver) {
            window.scrollObserver.observe(row);
        } else {
            setTimeout(() => row.classList.add('is-visible'), 100 + (index * 30));
        }
    });
}

// Update Record Count
function updateRecordCount() {
    recordCount.textContent = data.length;
}



// Filter Functionality
function showFilterDialog() {
    const searchTerm = prompt('Keresés a rekordokban (név vagy social media):');

    if (searchTerm === null) return; // User cancelled

    if (searchTerm.trim() === '') {
        renderTable(data);
        return;
    }

    const filtered = data.filter(record => {
        const lowerSearch = searchTerm.toLowerCase();
        return (
            record.lastName.toLowerCase().includes(lowerSearch) ||
            record.firstName.toLowerCase().includes(lowerSearch) ||
            record.instagram.toLowerCase().includes(lowerSearch) ||
            record.facebook.toLowerCase().includes(lowerSearch)
        );
    });

    if (filtered.length === 0) {
        alert('Nincs találat.');
        return;
    }

    renderTable(filtered);
}

// Attach Event Listeners
// Attach Event Listeners
function attachEventListeners() {
    filterBtn.addEventListener('click', showFilterDialog);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + F: Filter
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            showFilterDialog();
        }
    });
}

// Animate elements on load
function animateOnLoad() {
    const header = document.querySelector('.header');
    const fileHeader = document.querySelector('.file-header');
    const controls = document.querySelector('.controls');

    header.style.opacity = '0';
    header.style.transform = 'translateY(-20px)';

    setTimeout(() => {
        header.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 100);

    setTimeout(() => {
        fileHeader.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fileHeader.style.opacity = '1';
        fileHeader.style.transform = 'translateY(0)';
    }, 300);

    setTimeout(() => {
        controls.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        controls.style.opacity = '1';
        controls.style.transform = 'translateY(0)';
    }, 500);
}

// Add click sound effect (optional)
function playClickSound() {
    // You can add a subtle click sound here if desired
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    alert('🎮 KONAMI CODE ACTIVATED! 🎮\n\nYou found the secret! All clearance levels unlocked.');
    document.querySelector('.clearance').textContent = 'CLEARANCE LEVEL: ∞';
    document.querySelector('.clearance').style.color = 'var(--accent-green)';
    document.body.style.fontFamily = '"Comic Sans MS", "Chalkboard SE", sans-serif'; // The ultimate evil
}

// Easter Egg 2: Console Warning
console.log("%cSTOP!", "color: red; font-size: 50px; font-weight: bold; text-shadow: 2px 2px 0px black;");
console.log("%cThis is a restricted government facility. Unauthorized access is a felony.", "color: white; background: black; font-size: 16px; padding: 10px; border-radius: 5px;");
console.log("%cIf you are reading this, your IP has been logged.", "color: #3b82f6; font-style: italic;");

// Easter Egg 3: Click 'CLASSIFIED' Badge 7 times
let badgeClicks = 0;
document.addEventListener('DOMContentLoaded', () => {
    const badge = document.querySelector('.classified-badge');
    if (badge) {
        badge.addEventListener('click', () => {
            badgeClicks++;
            if (badgeClicks === 5) {
                alert('Warning: Verify Clearance.');
            }
            if (badgeClicks === 10) {
                document.body.classList.add('glitch-active');
                alert('SYSTEM BREACHED into DEBUG MODE');
                // Reveal all redacted blocks
                document.body.classList.add('unredacted');
            }
        });
    }
});

// Easter Egg 4: Type 'matrix' to toggle rain effect (simulated via CSS changes)
let typeBuffer = '';
document.addEventListener('keydown', (e) => {
    typeBuffer += e.key;
    if (typeBuffer.length > 20) typeBuffer = typeBuffer.slice(-20);

    if (typeBuffer.endsWith('matrix')) {
        document.body.style.filter = 'hue-rotate(90deg) contrast(1.5)';
        document.body.style.backgroundImage = 'linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)';
        document.body.style.backgroundSize = '20px 20px';
        alert('The Matrix has you...');
    }

    if (typeBuffer.endsWith('reset')) {
        document.body.style.filter = '';
        document.body.style.backgroundImage = '';
        document.body.style.fontFamily = '';
        document.body.classList.remove('unredacted');
        alert('System Restored');
    }
});

// Modal Functionality
const modal = document.getElementById('evidence-modal');
const modalImg = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const closeModalSpan = document.getElementsByClassName('close-modal')[0];

window.openEvidenceModal = function (imageSrc, title) {
    modal.style.display = 'flex';
    // Trigger reflow
    void modal.offsetWidth;
    modal.classList.add('show');

    modalImg.src = imageSrc;
    modalTitle.textContent = title;

    // Reset zoom
    modalImg.classList.remove('zoomed');
}

// Zoom functionality
modalImg.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent closing modal
    modalImg.classList.toggle('zoomed');

    // When zoomed, we need to ensure the wrapper allows scrolling if scale pushes it out
    // Using transform scale(2) might not trigger scrollbars appropriately in all browsers
    // so we might need a mix. But let's try CSS transform first.
    // If we want panning, using width/height is better than transform. 
    // Wait, the user wants "nagyítódik ki" (enlarge).

    // Let's stick to the class toggle. CSS handles the visual.
    // If using transform: scale(2), overflow might clip. 
    // We will let the user pan by ensuring overflow:auto on wrapper handles the larger scrollWidth.
});

if (closeModalSpan) {
    closeModalSpan.onclick = function () {
        closeModal();
    }
}

function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        modalImg.src = '';
    }, 300);
}

window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Add escape key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
    }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
