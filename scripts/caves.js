const QUESTS = [
  {
    title: "Cloak of Colors",
    text: "Change the text color with the <code>color</code> rune in CSS.",
    hint: "p { color: red; }",
    dialogue: [
      {
        speaker: "Master",
        line: "The caves shimmer with crystals of light. Change the text’s color to match their glow.",
      },
      {
        speaker: "You",
        line: "I will weave the rune of <code>color</code> to paint my words.",
      },
    ],
    template: `<style>
/* Write CSS here */

</style>
<p>Hello Apprentice</p>
            
        `,
    check: (code) => code.includes("color"),
  },
  {
    title: "Borders & Runes",
    text: "Add a border around a <div> element.",
    hint: "div { border: 2px solid blue; }",
    dialogue: [
      {
        speaker: "Master",
        line: "Every relic must be protected. Forge a border around the stone of power.",
      },
      {
        speaker: "You",
        line: "Yes Master, I will enclose it with a border rune.",
      },
    ],
    template: `<!DOCTYPE html>
<html>
<head>
<style>
/* CSS here */

</style>
</head>
<body>
<div>Magic Stone</div>
</body>
</html>`,
    check: (code) => code.includes("border"),
  },
  {
    title: "Box Model",
    text: "Adjust padding and margin using the box model runes.",
    hint: "div { margin: 20px; padding: 10px; }",
    dialogue: [
      {
        speaker: "Master",
        line: "Space is as important as substance. Show me you can shape margins and padding.",
      },
      {
        speaker: "You",
        line: "I shall create breathing space for the elements.",
      },
    ],
    template: `<!DOCTYPE html>
<html>
<head>
<style>
/* CSS here */
      
</style>
</head>
<body>
<div>Box of Secrets</div>
</body>
</html>`,
    check: (code) => code.includes("margin") || code.includes("padding"),
  },
  {
    title: "Typography Sigils",
    text: "Style text with <code>font-size</code> and <code>font-family</code>.",
    hint: "h1 { font-size: 30px; font-family: Arial; }",
    dialogue: [
      {
        speaker: "Master",
        line: "Words carry power. Shape their form with size and family.",
      },
      {
        speaker: "You",
        line: "I will invoke typography runes to enhance my message.",
      },
    ],
    template: `<!DOCTYPE html>
    <html>
<head>
<style>
/* CSS here */

</style>
</head>
<body>
<h1>The Rune Weaver</h1>
</body>
</html>`,
    check: (code) => code.includes("font-size") || code.includes("font-family"),
  },
  // add more CSS Caves quests here...
];

const realmName = "CSS Caves";
let current = 0;

const titleEl = document.getElementById("questTitle");
const textEl = document.getElementById("questText");
const hintEl = document.getElementById("hint");
const editor = document.getElementById("editor");
const preview = document.getElementById("preview");
const dialogueBox = document.getElementById("dialogueBox");
const nextBtn = document.getElementById("nextBtn");

function loadQuest(i) {
  current = i;
  const q = QUESTS[i];
  titleEl.textContent = q.title;
  textEl.innerHTML = q.text;
  hintEl.textContent = q.hint;
  hintEl.classList.add("hidden");
  editor.value = q.template;
  preview.srcdoc = q.template;
  renderDialogue(q.dialogue);
  nextBtn.disabled = true;
  saveProgress(false);
}

function renderDialogue(lines) {
  dialogueBox.innerHTML = "";
  lines.forEach((d) => {
    const p = document.createElement("p");
    p.innerHTML = `<span class="font-bold ${
      d.speaker === "Master" ? "text-emerald-400" : "text-sky-400"
    }">${d.speaker}:</span> ${d.line}`;
    dialogueBox.appendChild(p);
  });
}

function runCode() {
  preview.srcdoc = editor.value;
}

function submitCode() {
  const code = editor.value;
  const q = QUESTS[current];
  if (q.check(code)) {
    alert("✅ The weave flows true!");
    nextBtn.disabled = false;
    saveProgress(true);
  } else {
    alert("❌ The rune flickers... refine your weave.");
  }
}

function saveProgress(markComplete) {
  const raw = localStorage.getItem("codequest_dashboard_v1") || "{}";
  const state = JSON.parse(raw);
  state.completed = state.completed || {};
  state.completed[realmName] = state.completed[realmName] || [];
  if (markComplete && !state.completed[realmName].includes(current)) {
    state.completed[realmName].push(current);
  }
  if (state.completed[realmName].length >= QUESTS.length) {
    state.realmCompleted = state.realmCompleted || {};
    state.realmCompleted[realmName] = true;
  }
  localStorage.setItem("codequest_dashboard_v1", JSON.stringify(state));
}

document.getElementById("runBtn").onclick = runCode;
document.getElementById("submitBtn").onclick = submitCode;
document.getElementById("nextBtn").onclick = () => {
  if (current < QUESTS.length - 1) loadQuest(current + 1);
  else alert("🌟 You have mastered the CSS Caves!");
};
document.getElementById("prevBtn").onclick = () => {
  if (current > 0) loadQuest(current - 1);
};
document.getElementById("hintBtn").onclick = () =>
  hintEl.classList.toggle("hidden");

loadQuest(0);
