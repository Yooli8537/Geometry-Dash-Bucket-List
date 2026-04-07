const addForm = document.querySelector("#addLevelForm");
const traitSelector = document.querySelector("#traitSelector");
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

  // Checking required Fields
  const requiredFields = [
    { value: num, label: "Num" },
    { value: gameId, label: "Game ID" },
    { value: name, label: "Name" },
    { value: placement, label: "Placement" },
    { value: best, label: "Best" },
    { value: attempts, label: "Attempts from 0" },
    { value: startposAttempts, label: "Startpos Attempts" },
    { value: startingDate, label: "Starting Date" },
    { value: endingDate, label: "Ending Date" },
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
    }
  }

  // Checking Values
  if (num < 0) {
    errorMessage.textContent = "Error: Value {num} has a negative value.";
  } else if (gameId < 0) {
    errorMessage.textContent = "Error: Value {gameId} has a negative value.";
  } else {
    errorMessage.textContent = "No Errors.";
  }
});
