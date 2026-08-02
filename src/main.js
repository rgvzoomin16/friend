const root = document.getElementById('root');
const starMessages = ['You are special.','You are stronger than you think.','You deserve the world.','Thank you for existing.','I appreciate you.','I admire you.','I respect you.','I trust you.','I cherish you.','You make ordinary days glow.','Your kindness has its own gravity.','You are a constellation of beautiful things.'];
const rooms = [
  ['📸','The Memory Atrium','A golden hallway of snapshots, soft laughter, and moments that still feel alive.','rose'],
  ['💌','The Letter Gallery','Animated handwritten notes drift like silk: thank you, stay happy, never forget your magic.','violet'],
  ['🎶','The Music Room','A piano, a pulse, and a playlist of songs that would choose your name if they could speak.','blue'],
  ['🎙️','The Voice-Nook','Tiny voice-note orbs hold pauses, smiles, and the warmth between words.','amber'],
  ['🔭','The Dream Observatory','Every telescope points toward futures where you are safe, celebrated, and endlessly loved.','emerald'],
  ['✨','The Laugh Archive','Confetti-filled echoes of the moments that made everything lighter.','pink']
];
const quiz = [
  { q: 'What is my favorite memory?', a: 'you smiling', choices: ['You smiling', 'A rainy day', 'A movie night'] },
  { q: 'When did we first talk?', a: 'the day everything changed', choices: ['The day everything changed', 'At midnight', 'Last summer'] },
  { q: 'Which song reminds me of you?', a: 'perfect', choices: ['Perfect', 'Yellow', 'Until I Found You'] }
];
let answers = {};

function stars(count = 60, interactive = false) {
  return `<div class="stars" ${interactive ? '' : 'aria-hidden="true"'}>${Array.from({ length: count }, (_, i) => {
    const s = { left: Math.random()*100, top: Math.random()*100, delay: Math.random()*5, size: 1 + Math.random()*3, msg: starMessages[i % starMessages.length] };
    return `<button class="star" style="left:${s.left}%;top:${s.top}%;animation-delay:${s.delay}s;width:${s.size}px;height:${s.size}px" title="${s.msg}">${interactive ? `<span>${s.msg}</span>` : ''}</button>`;
  }).join('')}</div>`;
}
function opening() { root.innerHTML = `<section class="opening full-screen">${stars(90)}<div class="opening-card"><p class="typewriter one">Among billions of people, somehow I found you.</p><p class="typewriter two">And that changed everything.</p><button class="glow-button delayed" id="enter">Enter Meera's Universe</button></div><div class="music-pill">🔊 soft cosmic music playing</div></section>`; document.getElementById('enter').onclick = app; }
function app() { root.innerHTML = `<main><div class="ambient"><span></span><span></span><span></span></div>${stars(140,true)}${moon()}${museum()}${quizPage()}<section class="panel sky"><h2>🌌 The Digital Sky</h2><p>Touch the stars around you. Every point of light carries a tiny truth for Meera.</p></section>${garden()}${vault()}${finalPage()}</main>`; bind(); }
function moon() { return `<section class="panel moon-panel"><h2>🌙 Touch the moon</h2><button class="moon" id="moon" aria-label="Awaken moon messages"></button><p class="panel-copy">A silver world floats quietly above Meera's sky. Touch it, and every star remembers something beautiful.</p><div class="message-cloud" id="moonMessages"></div></section>`; }
function museum() { return `<section class="panel museum"><h2>❤️ The Heart Museum</h2><div class="room-grid">${rooms.map(([icon,title,text,color]) => `<article class="room ${color}"><div class="room-icon">${icon}</div><h3>${title}</h3><p>${text}</p><div class="note">Open this room with a real photo, song, or voice note whenever you want.</div></article>`).join('')}</div></section>`; }
function quizPage() { return `<section class="panel quiz"><h2>🎭 How well do you know me?</h2>${quiz.map((item,i) => `<div class="question"><h3>${item.q}</h3>${item.choices.map(choice => `<button data-q="${i}" data-a="${choice.toLowerCase()}">${choice}</button>`).join('')}</div>`).join('')}<div id="surprise"></div></section>`; }
function garden() { return `<section class="panel garden"><h2>🌹 Endless Rose Garden</h2><div class="butterfly b1">🦋</div><div class="butterfly b2">🦋</div><div class="rose-bed">${Array.from({length:28},(_,i)=>`<button class="rose"><span>🌹</span><em>${starMessages[i%starMessages.length]}</em></button>`).join('')}</div></section>`; }
function vault() { return `<section class="panel vault"><h2>🔐 Secret Vault</h2><p>Hint: “Who is the most amazing person here?”</p><input id="vaultInput" placeholder="Type the password"/><div id="vaultOpen"></div></section>`; }
function finalPage() { return `<section class="panel final"><div class="big">💫</div><p>Some people become memories.<br/>Some people become lessons.<br/>And a very few become a part of our hearts forever.<br/><br/>Thank you for being one of those people, Meera.</p><button id="restart">↻ Start the journey again</button></section>`; }
function bind() {
  document.getElementById('moon').onclick = e => { e.currentTarget.classList.add('awake'); document.getElementById('moonMessages').innerHTML = starMessages.map((m,i)=>`<span style="animation-delay:${i*.08}s">${m}</span>`).join(''); };
  document.querySelectorAll('.question button').forEach(btn => btn.onclick = () => { answers[btn.dataset.q] = btn.dataset.a; btn.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('selected')); btn.classList.add('selected'); if (quiz.every((item,i)=>answers[i] === item.a)) document.getElementById('surprise').innerHTML = '<div class="surprise">🎊 Hidden surprise unlocked: Meera, every answer in this universe still leads back to you.</div>'; });
  document.getElementById('vaultInput').oninput = e => { document.getElementById('vaultOpen').innerHTML = e.target.value.trim().toLowerCase() === 'meera' ? '<div class="vault-open">Welcome to the most special place in this universe.</div>' : ''; };
  document.getElementById('restart').onclick = opening;
}
opening();
