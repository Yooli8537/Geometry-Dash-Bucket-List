export function getData() {
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
}