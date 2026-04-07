const addForm = document.querySelector("#addLevelForm");
const traitSelector = document.querySelector("#traitSelector");
const submitButton = document.querySelector("#submitLevelButton");

document.querySelectorAll(".traitOption").forEach((trait) => {
  trait.addEventListener("click", () => {
    trait.classList.toggle("selected");
  });
});

submitButton.addEventListener("click", async (e) => {
  e.preventDefault();
});
