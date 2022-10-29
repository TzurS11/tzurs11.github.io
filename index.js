function tableMap() {
  let table = document.getElementById("map-table");
  let tableTitle = document.getElementById("map-title");
  if (table.style.display === "none") {
    table.style.display = "inline-table";
    tableTitle.innerHTML = 'Beat saber maps <span class="scaleArrow">▼</span>';
  } else {
    table.style.display = "none";
    tableTitle.innerHTML = 'Beat saber maps <span class="scaleArrow">►</span>';
  }
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
      return b.stats.upvotes - a.stats.upvotes;
    });
    orderedMaps.forEach((map) => {
      let tr = document.createElement("tr");
      tr.className = "maps";
      tr.innerHTML = `<td><img class="coverImage" src="${
        map.versions[map.versions.length - 1].coverURL
      }"> <span class="map-table-title">${map.name}</span></td><td>${map.stats.upvotes}</td><td>${
        map.stats.downvotes
      }</td><td><a class="link" title="One-Click install" href="beatsaver://${
        map.id
      }">${map.id}<a></td>`;
      document.getElementById("map-table").appendChild(tr);
      sum[0] += map.stats.upvotes;
      sum[1] += map.stats.downvotes;
    });
    // let tr = document.createElement("tr");
    // tr.className = "maps";
    // tr.innerHTML = `<td></td><td>${sum[0]}</td><td>${sum[1]}</td><td></td>`;
    // document.getElementById("map-table").appendChild(tr);
    document.body.style.filter = "blur(0px)";
  });
