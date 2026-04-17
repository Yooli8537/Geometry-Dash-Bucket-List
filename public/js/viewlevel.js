// Viewing level Detail
// Extracting ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const traitList = document.querySelector("#traitList");
const statusHeader = document.querySelector("#statusHeader");

async function loadLevelDetail() {
  // Fetching correct level Data
  let response = await fetch("/data");
  let levelData = await response.json();
  const level = levelData.find((l) => Number(l.game_id) == id);

  // Level Display conditions
  const startingDate = new Date(level.starting_date);
  const formattedStarting = startingDate.toLocaleDateString("de-CH"); // DD/MM/YYYY formatting, anything else and you're an animal.
  const endingDate = new Date(level.ending_date);
  const formattedEnding = endingDate.toLocaleDateString("de-CH");

  // Loading Data
  document.querySelector("#levelPlacement").textContent =
    "#" + level.num + " | ";
  document.querySelector("#levelName").textContent = level.name;
  document.querySelector("#startingDate").textContent =
    "Starting Date: " + formattedStarting;
  document.querySelector("#endingDate").textContent =
    "Ending Date: " + formattedEnding;
  document.querySelector("#enjoyment").textContent =
    "Enjoyment: " + level.enjoyment_rating + "/10";
  document.querySelector("#song").textContent = "Song: " + level.song;
  document.querySelector("#songId").textContent = "Song ID: " + level.song_id;
  document.querySelector("#placement").textContent =
    "Placement: " + level.aredl_placement;
  document.querySelector("#reason").textContent = "Reason: " + level.reason;
  document.querySelector("#attempts").textContent =
    "Attempts: " + level.attempts;
  document.querySelector("#startposAttempts").textContent =
    "Startpos Attempts: " + level.startpos_attempts;
  document.querySelector("#subcategory").textContent =
    "Subcategory: " + level.subcategory;

  // Correct Header Color
  if (level.best == 100) {
    statusHeader.classList.add("complete");
  } else {
    statusHeader.classList.add(level.status);
  }

  // Styling Traits
  for (i = 0; i < level.traits.length; i++) {
    trait = document.createElement("div");
    trait.classList.add("trait");
    trait.classList.add(level.traits[i]);
    trait.textContent = level.traits[i];
    traitList.appendChild(trait);
  }

  // Applying Background
  document
    .querySelector("#bg")
    .style.setProperty("--bg-image", `url(../images/${level.screenshot_path})`);
}

loadLevelDetail();
