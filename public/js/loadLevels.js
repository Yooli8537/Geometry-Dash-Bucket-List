const insaneDemonsColumn = document.querySelector("#insaneDemons");
const firstExtremesColumn = document.querySelector("#firstExtremes");
const beginnerExtremesColumn = document.querySelector("#beginnerExtremes");
const advancedExtremesColumn = document.querySelector("#advancedExtremes");
const listExtremesColumn = document.querySelector("#listExtremes");
const goalExtremesColumn = document.querySelector("#goalExtremes");

async function loadLevels() {
  // Gets & Sorts data from data.json
  let response = await fetch("/data");
  let levelData = await response.json();
  levelData.sort((a, b) => a.num - b.num);

  // Loop that puts the levels where they belong
  for (i = 0; i < levelData.length; i++) {
    const level = levelData[i];

    // Table Element
    const tr = document.createElement("tr");
    tr.classList.add("tableRow");

    // Data
    // Number
    const num = document.createElement("td");
    num.textContent = level.num;
    // Name
    const name = document.createElement("td");
    name.textContent = level.name;
    // AREDL placement
    const placement = document.createElement("td");
    placement.textContent = "#" + level.aredl_placement;
    // Best
    const best = document.createElement("td");
    best.textContent = level.best + "%";
    // Total Attempts
    const attempts = document.createElement("td");
    attempts.textContent =
      Number(level.attempts) + Number(level.startpos_attempts);
    // Traits
    const traits = document.createElement("td");
    const traitsArray = level.traits;
    for (j = 0; j < traitsArray.length; j++) {
      const trait = document.createElement("div");
      trait.classList.add("trait");
      trait.classList.add(traitsArray[j]); // Adds the value of a trait as a class
      trait.textContent = traitsArray[j];
      traits.appendChild(trait);
    }
    // Selection Reason
    const reason = document.createElement("td");
    reason.textContent = level.reason;

    // Applying data to parent element
    tr.appendChild(num);
    tr.appendChild(name);
    tr.appendChild(placement);
    tr.appendChild(best);
    tr.appendChild(attempts);
    tr.appendChild(traits);
    tr.appendChild(reason);

    if (level.status === "inProgress") {
      tr.classList.add("inProgress");
    } else if (level.status === "lookingForward") {
      tr.classList.add("lookingForward");
    } else if (level.status === "finalGoal") {
      tr.classList.add("finalGoal");
    } else if (level.best == 100) {
      tr.classList.add("complete");
    }

    // Applying <tr> to correct category on HTML page
    const subcategory = level.subcategory;
    if (subcategory === "Insane Demons") {
      insaneDemonsColumn.appendChild(tr);
    } else if (subcategory === "First Extremes") {
      firstExtremesColumn.appendChild(tr);
    } else if (subcategory === "Beginner Extremes") {
      beginnerExtremesColumn.appendChild(tr);
    } else if (subcategory === "Advanced Extremes") {
      advancedExtremesColumn.appendChild(tr);
    } else if (subcategory === "List Extremes") {
      listExtremesColumn.appendChild(tr);
    } else if (subcategory === "Final Goals") {
      goalExtremesColumn.appendChild(tr);
    }
  }
}

loadLevels();
