const submitButton = document.querySelector("#submitLevelButton");
const errorMessage = document.querySelector("#errorMessage");
const backButton = document.querySelector("#backButton");
const editingLevelName = document.querySelector("#editingLevelName");

// Input Fields
const num = document.querySelector("#num");
const gameId = document.querySelector("#gameId");
const name = document.querySelector("#name");
const placement = document.querySelector("#placement");
const status = document.querySelector("#status");
const best = document.querySelector("#best");
const attempts = document.querySelector("#attempts");
const startposAttempts = document.querySelector("#startposAttempts");
const enjoyment = document.querySelector("#enjoyment");
const startingDate = document.querySelector("#startingDate");
const endingDate = document.querySelector("#endingDate");
const reason = document.querySelector("#reason");
const subcategory = document.querySelector("#subcategory");
const songName = document.querySelector("#songName");
const songId = document.querySelector("#songId");
const imagePath = document.querySelector("#imagePath");

// Return Button
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function getLevelData() {
  let editResponse = await fetch("/data");
  let levelData = await editResponse.json();
  const editingLevel = levelData.find((l) => Number(l.game_id) == id);

  // Showing Data in the fields
  editingLevelName.textContent = "Editing Level " + editingLevel.name;
  num.value = editingLevel.num;
  gameId.value = editingLevel.game_id;
  name.value = editingLevel.name;
  placement.value = editingLevel.aredl_placement;
  if (editingLevel.best == 100) {
    status.value = "finished";
  } else {
    status.value = editingLevel.status;
  }
  best.value = editingLevel.best;
  attempts.value = editingLevel.attempts;
  startposAttempts.value = editingLevel.startpos_attempts;
  enjoyment.value = editingLevel.enjoyment_rating;
  startingDate.value = editingLevel.starting_date;
  endingDate.value = editingLevel.ending_date;
  reason.value = editingLevel.reason;
  Array.from(lists.options).forEach((option) => {
    option.selected = editingLevel.lists.includes(option.value);
  });
  subcategory.value = editingLevel.subcategory;
  songName.value = editingLevel.song;
  songId.value = editingLevel.song_id;
  imagePath.value = editingLevel.screenshot_path;
  document.querySelectorAll(".traitOption").forEach((trait) => {
    if (editingLevel.traits.includes(trait.dataset.value)) {
      trait.classList.add("selected");
    }
  });
}

getLevelData();

backButton.addEventListener("click", () => {
  window.location.href = `/pages/level.html?id=${id}`;
});

document.querySelectorAll(".traitOption").forEach((trait) => {
  trait.addEventListener("click", () => {
    trait.classList.toggle("selected");
  });
});

submitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  // Checking required Fields
  const requiredFields = [
    { value: num, label: "Num" },
    { value: gameId, label: "Game ID" },
    { value: name, label: "Name" },
    { value: placement, label: "Placement" },
    { value: best, label: "Best" },
    { value: attempts, label: "Attempts from 0" },
    { value: startposAttempts, label: "Startpos Attempts" },
    { value: reason, label: "Reason" },
    { value: lists, label: "Lists" },
    { value: subcategory, label: "Subcategory" },
    { value: songName, label: "Song Name" },
    { value: imagePath, label: "Image Path" },
  ];

  for (const field of requiredFields) {
    if (field.value === "" || field.value === null) {
      errorMessage.textContent = `Error: ${field.label} is empty.`;
      return;
    } else if (lists.length < 1) {
      errorMessage.textContent = "Error: No Lists selected.";
      return;
    } else if (subcategory === "none") {
      errorMessage.textContent = "Error: No Subcategory selected.";
      return;
    }
  }

  // Checking Values
  if (num < 0) {
    errorMessage.textContent = `Error: Num (${num}) is a negative value.`;
  } else if (gameId < 0) {
    errorMessage.textContent = `Error: Game ID (${gameId}) is a negative value.`;
  } else if (best < 0) {
    errorMessage.textContent = `Error: Best (${best}) is a negative value.`;
  } else if (attempts < 0) {
    errorMessage.textContent = `Error: Attempts (${attempts}) is a negative value.`;
  } else if (startposAttempts < 0) {
    errorMessage.textContent = `Error: Startpos Attempts (${startposAttempts}) is a negative value.`;
  } else if (enjoyment < 0 || enjoyment > 10) {
    errorMessage.textContent = "Enjoyment must be between 0 and 10";
  } else if (traits.length < 1 || traits.length > 7) {
    errorMessage.textContent = `You can only select between one and seven traits.`;
  } else {
    errorMessage.textContent = "No Errors.";
  }
});
