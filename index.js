function onNamePress() {
  colorChange = setInterval(function () {
    document.body.style.backgroundColor =
      "#" + ((Math.random() * 0xffffff) << 0).toString(16);
  }, 10);
}
fetch("https://api.beatsaver.com/maps/uploader/4284455/0")
  .then((req) => req.json())
  .then((res) => {
    let sum = [0, 0];
    res.docs.forEach((map) => {
      let tr = document.createElement("tr");
      tr.className = "maps";
      tr.innerHTML = `<td>${map.name}</td><td>${map.stats.upvotes}</td><td>${map.stats.downvotes}</td><td><a class="link" title="One-Click install" href="beatsaver://${map.id}">${map.id}<a></td>`;
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
