const firstExtremesColumn = document.querySelector("#firstExtremes");

async function loadLevels() {
    // Gets & Sorts data from data.json
    let response = await fetch("/data");
    let levelData = await response.json();
    levelData.sort((a, b) => a.num, b.num);

    // Loop that puts the levels where they belong
}