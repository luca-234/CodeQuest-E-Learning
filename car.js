const QUESTS = [
  {
    title: "Align the Elements",
    text: "Use <code>display: flex;</code> to align the elemental scrolls in a row.",
    hint: "#cave { display: flex; }",
    dialogue: [
      {
        speaker: "Master",
        line: "The scrolls of the elements scatter in chaos. Can you align them?",
      },
      {
        speaker: "You",
        line: "I will invoke the rune of Flex to bring them in order.",
      },
    ],
    template: `<!DOCTYPE html><html><head><style>
#cave {
  /* CSS here */
}
.scroll { border: 2px solid #333; padding: 10px; margin: 5px; }
</style></head><body>
<div id="cave">
  <div class="scroll">🔥 Fire</div>
  <div class="scroll">💧 Water</div>
  <div class="scroll">🌍 Earth</div>
  <div class="scroll">🌬 Air</div>
</div>
</body></html>`,
    check: (code) => code.includes("display: flex"),
  },
  {
    title: "Center the Scrolls",
    text: "Use <code>justify-content: center;</code> to place the scrolls in the middle horizontally.",
    hint: "#cave { justify-content: center; }",
    dialogue: [
      {
        speaker: "Master",
        line: "The scrolls drift to the edges. Place them in the center, Apprentice.",
      },
      {
        speaker: "You",
        line: "Yes Master, I will align them with justify-content.",
      },
    ],
    template: `<!DOCTYPE html><html><head><style>
#cave { display:flex; /* add more */ }
.scroll { border: 2px solid #333; padding: 10px; margin: 5px; }
</style></head><body>
<div id="cave">
  <div class="scroll">🔥 Fire</div>
  <div class="scroll">💧 Water</div>
  <div class="scroll">🌍 Earth</div>
  <div class="scroll">🌬 Air</div>
</div>
</body></html>`,
    check: (code) => code.includes("justify-content"),
  },
  {
    title: "Vertical Balance",
    text: "Use <code>align-items: center;</code> to align scrolls vertically.",
    hint: "#cave { align-items: center; }",
    dialogue: [
      {
        speaker: "Master",
        line: "Flex is not only sideways. Show me how to align them along the vertical.",
      },
      { speaker: "You", line: "I will weave align-items to balance them." },
    ],
    template: `<!DOCTYPE html><html><head><style>
#cave { display:flex; height:200px; border:1px solid #666; /* add more */ }
.scroll { border: 2px solid #333; padding: 10px; margin: 5px; }
</style></head><body>
<div id="cave">
  <div class="scroll">🔥 Fire</div>
  <div class="scroll">💧 Water</div>
  <div class="scroll">🌍 Earth</div>
  <div class="scroll">🌬 Air</div>
</div>
</body></html>`,
    check: (code) => code.includes("align-items"),
  },
  {
    title: "Space Between Forces",
    text: "Use <code>justify-content: space-between;</code> to push scrolls apart.",
    hint: "#cave { justify-content: space-between; }",
    dialogue: [
      {
        speaker: "Master",
        line: "The scrolls must hold distance, each guarding its place.",
      },
      { speaker: "You", line: "I will use space-between to separate them." },
    ],
    template: `<!DOCTYPE html><html><head><style>
#cave { display:flex; /* add more */ }
.scroll { border: 2px solid #333; padding: 10px; margin: 5px; }
</style></head><body>
<div id="cave">
  <div class="scroll">🔥 Fire</div>
  <div class="scroll">💧 Water</div>
  <div class="scroll">🌍 Earth</div>
  <div class="scroll">🌬 Air</div>
</div>
</body></html>`,
    check: (code) => code.includes("space-between"),
  },
  {
    title: "Column of Power",
    text: "Use <code>flex-direction: column;</code> to stack scrolls vertically.",
    hint: "#cave { flex-direction: column; }",
    dialogue: [
      {
        speaker: "Master",
        line: "The scrolls now flow in a row. Show me how to stack them into a column.",
      },
      { speaker: "You", line: "I will rotate the flow with flex-direction." },
    ],
    template: `<!DOCTYPE html><html><head><style>
#cave { display:flex; /* add more */ }
.scroll { border: 2px solid #333; padding: 10px; margin: 5px; }
</style></head><body>
<div id="cave">
  <div class="scroll">🔥 Fire</div>
  <div class="scroll">💧 Water</div>
  <div class="scroll">🌍 Earth</div>
  <div class="scroll">🌬 Air</div>
</div>
</body></html>`,
    check: (code) => code.includes("flex-direction"),
  },
];

const realmName = "Flexbox Caverns";
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
  else alert("🌟 You have mastered the Flexbox Caverns!");
};
document.getElementById("prevBtn").onclick = () => {
  if (current > 0) loadQuest(current - 1);
};
document.getElementById("hintBtn").onclick = () =>
  hintEl.classList.toggle("hidden");

loadQuest(0);
