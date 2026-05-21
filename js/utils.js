export function getData() {
  // Extracting Data by ID
  const data = {
    num: document.querySelector("#num").value,
    gameId: document.querySelector("#gameId").value,
    name: document.querySelector("#name").value,
    placement: document.querySelector("#placement").value,
    status: document.querySelector("#status").value,
    best: document.querySelector("#best").value,
    attempts: document.querySelector("#attempts").value,
    startposAttempts: document.querySelector("#startposAttempts").value,
    enjoyment: document.querySelector("#enjoyment").value,
    startingDate: document.querySelector("#startingDate").value,
    endingDate: document.querySelector("#endingDate").value,
    reason: document.querySelector("#reason").value,
    songName: document.querySelector("#songName").value,
    songId: document.querySelector("#songId").value,
    imagePath: document.querySelector("#imagePath").value,
    subcategory: document.querySelector("#subcategory").value,
    lists: Array.from(document.querySelector("#lists").selectedOptions).map(
      (option) => option.value,
    ),
    traits: Array.from(document.querySelectorAll(".traitOption.selected")).map(
      (t) => t.dataset.value,
    ),
  };

  console.log(data);
  return data;
}
