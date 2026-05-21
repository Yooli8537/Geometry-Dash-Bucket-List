import { getData } from "./utils";

const submitButton = document.querySelector("#submitLevelButton");
const errorMessage = document.querySelector("#errorMessage");

document.querySelectorAll(".traitOption").forEach((trait) => {
  trait.addEventListener("click", () => {
    trait.classList.toggle("selected");
  });
});

submitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const data = getData();

  console.log(`Traits: ${data.traits}`);
  console.log(`Traits Length: ${data.traits.length}`);

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
      return;
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
  } else if (data.enjoyment < 0 || data.enjoyment > 10) {
    errorMessage.textContent = "Enjoyment must be between 0 and 10";
  } else {
    errorMessage.textContent = "No Errors.";
  }

  // Saving Data to JSON
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
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(level),
  });

  if (response.ok) {
    errorMessage.textContent =
      "Level added to data successfully. You can view it on the homepage, may require a reload.";
  } else {
    errorMessage.textContent = "Error: Failed to save level :(";
  }

  // Resetting Form & Traits after successful addition
  document.querySelector("#addLevelForm").reset();
  document
    .querySelectorAll(".traitOption")
    .forEach((t) => t.classList.remove("selected"));
});
