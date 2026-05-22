import { getData } from "./utils";

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

  const data = getData();

  // Checking required Fields
  const requiredFields = [
    { value: data.num, label: "Num" },
    { value: data.gameId, label: "Game ID" },
    { value: data.name, label: "Name" },
    { value: data.placement, label: "Placement" },
    { value: data.best, label: "Best" },
    { value: data.attempts, label: "Attempts from 0" },
    { value: data.startposAttempts, label: "Startpos Attempts" },
    { value: data.reason, label: "Reason" },
    { value: data.lists, label: "Lists" },
    { value: data.subcategory, label: "Subcategory" },
    { value: data.songName, label: "Song Name" },
    { value: data.imagePath, label: "Image Path" },
  ];

  for (const field of requiredFields) {
    if (field.value === "" || field.value === null) {
      errorMessage.textContent = `Error: ${field.label} is empty.`;
      return;
    } else if (data.lists.length < 1) {
      errorMessage.textContent = "Error: No Lists selected.";
      return;
    } else if (data.subcategory === "none") {
      errorMessage.textContent = "Error: No Subcategory selected.";
      return;
    } else if (data.traits.length < 1 || data.traits.length > 7) {
      errorMessage.textContent = `You can only select between one and seven traits.`;
    }
  }

  // Checking Values
  if (data.num < 0) {
    errorMessage.textContent = `Error: Num (${num}) is a negative value.`;
  } else if (data.gameId < 0) {
    errorMessage.textContent = `Error: Game ID (${gameId}) is a negative value.`;
  } else if (data.best < 0) {
    errorMessage.textContent = `Error: Best (${best}) is a negative value.`;
  } else if (data.attempts < 0) {
    errorMessage.textContent = `Error: Attempts (${attempts}) is a negative value.`;
  } else if (data.startposAttempts < 0) {
    errorMessage.textContent = `Error: Startpos Attempts (${startposAttempts}) is a negative value.`;
  } else if (data.enjoyment < 0 || enjoyment > 10) {
    errorMessage.textContent = "Enjoyment must be between 0 and 10";
  } else {
    errorMessage.textContent = "No Errors.";
  }

  // Creating updated JSON
  const level = {
    num: data.num,
    game_id: data.gameId,
    name: data.name,
    aredl_placement: data.placement,
    status: data.status,
    best: data.best,
    attempts: data.attempts,
    startpos_attempts: data.startposAttempts,
    enjoyment_rating: data.enjoyment,
    starting_date: data.startingDate,
    ending_date: data.endingDate,
    reason: data.reason,
    lists: data.lists,
    subcategory: data.subcategory,
    song: data.songName,
    song_id: data.songId,
    screenshot_path: data.imagePath,
    traits: data.traits,
  };

  const response = await fetch("/data", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(level),
  });
});
