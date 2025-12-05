// 1. LESSON CONFIG
// Edit this object to change the story, prompts, and word counts.

const LESSON = {
  title: "The Case of the Exploding Sandwich",
  tagline:
    "",
  introLine: "Read each section, respond to the prompt, and then continue the story.",
  parts: [
    {
      heading: "Part 1",
      paragraphs: [
        "Everyone at Maple Ridge Middle School knew one thing: never leave your lunch unattended. Last year a seagull broke into the cafeteria and stole three full slices of pizza. But today was worse. Much worse.",
        "Because today, Jake Brunner’s sandwich exploded.",
        "Jake opened his lunchbox at exactly 12:17 p.m. Several students saw it. He peeled back the wax paper, lifted the sandwich, and then there was a loud pop, a cloud of purple smoke, and Jake fell off his chair. The room filled with the smell of burned grape jelly and mystery chemicals.",
        "No one was hurt, but everyone screamed anyway.",
        "Lia, who sat across from Jake, coughed and waved away the smoke. “What was that?”",
        "Jake sat up slowly. His hair was dusted with sparkles. “I don’t know,” he said. “It was just peanut butter and jelly. The same thing I always bring.”"
      ],
      checkpoint: {
        label: "Checkpoint 1",
        prompt:
          "Why do you think the sandwich exploded? Make a prediction using clues from the story. Write 2 or 3 sentences.",
        minWords: 20,
        placeholder: "I think the sandwich exploded because..."
      }
    },
    {
      heading: "Part 2",
      paragraphs: [
        "By the time Mr. Trent, the vice principal, arrived, the smoke had faded, leaving only small purple specks on the table. He crossed his arms. “Who put something in this sandwich?”",
        "Everyone looked around. No one said a word.",
        "That was when Lia noticed something strange: a small folded card under Jake’s chair.",
        "“Jake,” she said, “what is that?”",
        "He picked it up. The card was bright orange and smelled like cinnamon. On the front, in crooked handwriting, were the words: Test number one.",
        "Jake opened the card. Inside was a single clue: Find the locker that hums. The next experiment is waiting.",
        "Lia stared. “Your sandwich exploded and someone left you a scavenger hunt.”",
        "Jake nodded. “Should we… follow it?”"
      ],
      checkpoint: {
        label: "Checkpoint 2",
        prompt:
          "How do Jake and Lia react to the clue? What does this tell you about their personalities? Write 3 or more sentences.",
        minWords: 30,
        placeholder: "This shows Jake is... Lia seems like..."
      }
    },
    {
      heading: "Part 3",
      paragraphs: [
        "They searched the hallway. At first everything looked normal, but then Jake froze. “Listen.”",
        "A low humming sound came from locker 108. It vibrated like a weak speaker trying its best. The locker door shook slightly.",
        "Jake looked at Lia. “Open it?”",
        "“No,” Lia said. “Absolutely not.”",
        "Jake opened it anyway.",
        "Inside the locker was a shoebox wrapped in duct tape and covered in warning labels drawn in crayon. One label said “Danger.” Another said “Probably Fine.” A third said “Do Not Smell.”",
        "Jake reached forward.",
        "“Stop,” Lia said. But she also leaned closer because she could not help herself."
      ],
      checkpoint: {
        label: "Checkpoint 3",
        prompt:
          "Do you think Jake and Lia should open mysterious things like this? Why or why not? Explain your thinking in 3 or 4 sentences.",
        minWords: 30,
        placeholder: "I think they should / should not because..."
      }
    },
    {
      heading: "Part 4",
      paragraphs: [
        "Together they lifted the lid.",
        "Inside was a ham and cheese sandwich. Perfectly normal. Except for the tiny wind-up key sticking out of the bread.",
        "Jake turned the key.",
        "The sandwich began to shake. Then it hopped. Then it launched itself out of the box, bounced off the ceiling, and zipped down the hallway like a confused squirrel.",
        "Jake and Lia stared in silence.",
        "Finally Lia said, “This is not about lunch anymore. Someone is doing science.”",
        "A second orange card lay in the bottom of the shoebox. Jake read it aloud: Test number two complete. Final challenge at 3 p.m. on the roof.",
        "Lia closed her eyes. “We are definitely going to get in trouble.” Jake smiled. “Yeah. But we are also definitely going.”"
      ],
      checkpoint: {
        label: "Checkpoint 4",
        prompt:
          "What do you think will happen on the roof at 3 p.m.? Make a prediction and support it with clues from the story. Write 4 or more sentences.",
        minWords: 35,
        placeholder: "I think the final challenge will be..."
      }
    }
  ]
};

// 2. RENDERING AND LOGIC
// You should not need to edit below this line for normal use.

function buildPartHtml(parts, index) {
  if (index >= parts.length) return "";

  const part = parts[index];
  const isLast = index === parts.length - 1;

  let html = `
    <section class="story-section">
      <div class="passage-heading">${part.heading}</div>
      ${part.paragraphs.map(p => `<p class="passage">${p}</p>`).join("")}
    </section>

    <section class="checkpoint" data-min-words="${part.checkpoint.minWords}">
      <div class="gate-label">${part.checkpoint.label}</div>
      <div class="gate-prompt">
        ${part.checkpoint.prompt}
      </div>

      <div class="gate-input">
        <textarea
          placeholder="${part.checkpoint.placeholder}"
          data-role="checkpoint-input"
        ></textarea>

        <div class="gate-meta-row">
          <div class="word-count">
            Words: <span data-role="word-count">0</span> /
            <span data-role="word-target">${part.checkpoint.minWords}</span>
          </div>
          <button type="button" data-role="unlock-btn" disabled>
            ${isLast ? "Finish" : "Unlock next part"}
          </button>
        </div>

        <div class="gate-note">
          Your response does not need to be perfect. It needs to be honest and complete.
        </div>
      </div>
  `;

  if (!isLast) {
    html += `
      <div class="gate-hidden" data-role="hidden-content">
        ${buildPartHtml(parts, index + 1)}
      </div>
    `;
  } else {
    html += `
      <div class="gate-hidden" data-role="hidden-content"></div>
    `;
  }

  html += `</section>`;

  return html;
}

function renderLesson(lesson) {
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = `
    <header class="top-bar">
      <div class="title-block">
        <h1>Reading Checkpoints</h1>
        <p>${lesson.introLine}</p>
      </div>

      <form class="student-info" onsubmit="return false">
        <div class="field">
          <label for="student-name">Student name</label>
          <input id="student-name" type="text" placeholder="Type your name">
        </div>
      </form>
    </header>

    <section class="card">
      <h2>${lesson.title}</h2>
      <p class="tagline">${lesson.tagline}</p>

      ${buildPartHtml(lesson.parts, 0)}

      <section class="submit-block">
        <button type="button" id="copy-btn" disabled>
          Copy all responses
        </button>
        <p class="submit-note">
          When the button is active, click it, then paste your answers into Google Classroom or your reading document.
        </p>
        <p class="submit-note" id="copy-status"></p>
      </section>
    </section>
  `;
}

function countWords(text) {
  const cleaned = text.trim();
  if (!cleaned) return 0;
  return cleaned.split(/\s+/).filter(Boolean).length;
}

function setupCheckpoint(checkEl) {
  const textarea = checkEl.querySelector('[data-role="checkpoint-input"]');
  const wordCountEl = checkEl.querySelector('[data-role="word-count"]');
  const wordTargetEl = checkEl.querySelector('[data-role="word-target"]');
  const unlockBtn = checkEl.querySelector('[data-role="unlock-btn"]');
  const hiddenContent = checkEl.querySelector('[data-role="hidden-content"]');

  if (!textarea || !wordCountEl || !unlockBtn) return;

  const minWords = parseInt(checkEl.getAttribute("data-min-words"), 10) || 30;
  if (wordTargetEl) wordTargetEl.textContent = minWords;

  function updateState() {
    const words = countWords(textarea.value);
    wordCountEl.textContent = words;
    unlockBtn.disabled = words < minWords;
  }

  textarea.addEventListener("input", updateState);

  unlockBtn.addEventListener("click", () => {
    checkEl.classList.add("unlocked");
    if (hiddenContent) {
      hiddenContent.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    checkAllCheckpointsComplete();
  });

  updateState();
}

function checkAllCheckpointsComplete() {
  const checkpoints = document.querySelectorAll(".checkpoint");
  if (!checkpoints.length) return;

  const allUnlocked = Array.from(checkpoints).every(el =>
    el.classList.contains("unlocked")
  );

  const copyBtn = document.getElementById("copy-btn");
  if (copyBtn) {
    copyBtn.disabled = !allUnlocked;
  }
}

function fallbackCopy(text, setStatus) {
  const temp = document.createElement("textarea");
  temp.value = text;
  document.body.appendChild(temp);
  temp.select();
  try {
    document.execCommand("copy");
    setStatus("Copied. Paste into Google Classroom.");
  } catch (e) {
    setStatus("Could not copy automatically. Select the text and copy by hand.");
  }
  document.body.removeChild(temp);
}

function handleCopy() {
  const nameInput = document.getElementById("student-name");
  const statusEl = document.getElementById("copy-status");

  const studentName = nameInput && nameInput.value.trim()
    ? nameInput.value.trim()
    : "No name entered";

  const checkpoints = document.querySelectorAll(".checkpoint");
  const parts = [];

  checkpoints.forEach((checkEl, index) => {
    const textarea = checkEl.querySelector('[data-role="checkpoint-input"]');
    const labelEl = checkEl.querySelector(".gate-label");
    const label = labelEl ? labelEl.textContent.trim() : `Checkpoint ${index + 1}`;
    const value = textarea && textarea.value.trim()
      ? textarea.value.trim()
      : "(no response)";

    parts.push(label + ":\n" + value);
  });

  const output =
    `${LESSON.title}\n` +
    `Student name: ${studentName}\n\n` +
    parts.join("\n\n");

  function setStatus(msg) {
    if (statusEl) statusEl.textContent = msg;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(output)
      .then(() => setStatus("Copied. Paste into Google Classroom."))
      .catch(() => fallbackCopy(output, setStatus));
  } else {
    fallbackCopy(output, setStatus);
  }
}

function init() {
  renderLesson(LESSON);

  const checkpoints = document.querySelectorAll(".checkpoint");
  checkpoints.forEach(setupCheckpoint);

  const copyBtn = document.getElementById("copy-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", handleCopy);
  }

  checkAllCheckpointsComplete();
}

// Work in both CodePen and plain pages
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
