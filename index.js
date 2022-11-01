function tableMap() {
  let table = document.getElementById("map-table");
  let tableTitle = document.getElementById("map-title");
  if (table.style.display === "none") {
    hideSubs();
    table.style.display = "inline-block";
    tableTitle.title = "Hide maps";
    tableTitle.innerHTML = 'Beat Saber Maps <span class="scaleArrow">▼</span>';
  } else {
    table.style.display = "none";
    tableTitle.title = "Show maps";
    tableTitle.innerHTML = 'Beat Saber Maps <span class="scaleArrow">►</span>';
  }
}
function openInNewTab(url) {
  window.open(url, "_blank").focus();
}

// document.addEventListener("click", (ele) => {
//   if (ele.target.className == "map-container")
//     window.open(`https://beatsaver.com/maps/${ele.target.id}`);
//   console.log(ele.target.id);
// });

function discordBots() {
  let projects = document.getElementById("discord-bots");
  let projectsTitle = document.getElementById("discord-projects-title");
  if (projects.style.display === "none") {
    hideSubs();
    projects.style.display = "inline-block";
    projectsTitle.title = "Hide projects";
    projectsTitle.innerHTML = 'Discord Bots <span class="scaleArrow">▼</span>';
  } else {
    projects.style.display = "none";
    projectsTitle.title = "Show projects";
    projectsTitle.innerHTML = 'Discord Bots <span class="scaleArrow">►</span>';
  }
}

function hideSubs() {
  // return;
  let table = document.getElementById("map-table");
  let tableTitle = document.getElementById("map-title");
  table.style.display = "none";
  tableTitle.title = "Show maps";
  tableTitle.innerHTML = 'Beat Saber Maps <span class="scaleArrow">►</span>';
  let projects = document.getElementById("discord-bots");
  let projectsTitle = document.getElementById("discord-projects-title");
  projects.style.display = "none";
  projectsTitle.innerHTML = 'Discord Bots <span class="scaleArrow">►</span>';
  projectsTitle.title = "Show projects";
}

function calcRating(upvotes, downvotes, rounding = 1) {
  let totalReviews = upvotes + downvotes;
  let reviewScore = upvotes / totalReviews;
  return Number(
    (
      (reviewScore -
        (reviewScore - 0.5) * Math.pow(2, -Math.log10(totalReviews + 1))) *
      100
    ).toFixed(rounding)
  );
}

fetch("https://api.beatsaver.com/maps/uploader/4284455/0")
  .then((req) => req.json())
  .then((res) => {
    let sum = [0, 0];
    let orderedMaps = [];
    res.docs.forEach((map) => {
      orderedMaps.push(map);
    });
    orderedMaps.sort(function (a, b) {
      return (
        calcRating(b.stats.upvotes, b.stats.downvotes, 5) -
        calcRating(a.stats.upvotes, a.stats.downvotes, 5)
      );
    });
    // let maxmaps = 0;
    orderedMaps.forEach((map) => {
      // if (maxmaps < 7) {
      //   maxmaps++;
      let mapContainer = document.createElement("div");
      mapContainer.className = "maps";
      mapContainer.setAttribute(
        "onclick",
        `openInNewTab("https://www.beatsaver.com/maps/${map.id}")`
      );
      mapContainer.title="open in beatsaver"
      mapContainer.className = "map-container";
      mapContainer.innerHTML = `<p class='map-title'>${map.name}</p>`;
      document.getElementById("map-table").appendChild(mapContainer);
      sum[0] += map.stats.upvotes;
      sum[1] += map.stats.downvotes;
      // }
    });
    let title = document.getElementById("map-title");
    title.onclick = tableMap;
    title.style.display = "inline";
    title.style.cursor = "pointer";
    title.innerHTML = 'Beat Saber Maps <span class="scaleArrow">►</span>';
  });
