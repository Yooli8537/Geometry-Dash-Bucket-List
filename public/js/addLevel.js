const submitButton = document.querySelector("#submitLevelButton");
const errorMessage = document.querySelector("#errorMessage");

document.querySelectorAll(".traitOption").forEach((trait) => {
  trait.addEventListener("click", () => {
    trait.classList.toggle("selected");
  });
});

submitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  // Extracting Data by ID
  const num = document.querySelector("#num").value;
  const gameId = document.querySelector("#gameId").value;
  const name = document.querySelector("#name").value;
  const placement = document.querySelector("#placement").value;
  const status = document.querySelector("#status").value;
  const best = document.querySelector("#best").value;
  const attempts = document.querySelector("#attempts").value;
  const startposAttempts = document.querySelector("#startposAttempts").value;
  const enjoyment = document.querySelector("#enjoyment").value;
  const startingDate = document.querySelector("#startingDate").value;
  const endingDate = document.querySelector("#endingDate").value;
  const reason = document.querySelector("#reason").value;
  const songName = document.querySelector("#songName").value;
  const songId = document.querySelector("#songId").value;
  const imagePath = document.querySelector("#imagePath").value;
  const subcategory = document.querySelector("#subcategory").value;
  const lists = Array.from(
    document.querySelector("#lists").selectedOptions,
  ).map((option) => option.value);
  const traits = Array.from(
    document.querySelectorAll(".traitOption.selected"),
  ).map((t) => t.dataset.value);

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

  // Saving Data to JSON
  const level = {
    num: num,
    game_id: gameId,
    name: name,
    aredl_placement: placement,
    status: status,
    best: best,
    attempts: attempts,
    startpos_attempts: startposAttempts,
    enjoyment_rating: enjoyment,
    starting_date: startingDate,
    ending_date: endingDate,
    reason: reason,
    lists: lists,
    subcategory: subcategory,
    song: songName,
    song_id: songId,
    screenshot_path: imagePath,
    traits: traits,
  };

  const response = await fetch("/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(level),
  });

  if (response.ok) {
    errorMessage.textContent = "Level added to data successfully. You can view it on the homepage, may require a reload."
  } else {
    errorMessage.textContent = "Error: Failed to save level :("
  }

  // Resetting Form & Traits after successful addition
  document.querySelector("#addLevelForm").reset();
  document.querySelector(".traitOption").forEach(t => t.classList.remove("selected"));
});
