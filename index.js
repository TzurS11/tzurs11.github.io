fetch("https://api.beatsaver.com/maps/uploader/4284455/0")
  .then((req) => req.json())
  .then((res) => {
    res.docs.forEach((map) => {
      let div = document.createElement("p");
      div.innerHTML = `<a class="map-list"target="_blank" href="https://beatsaver.com/maps/${map.id}"><span class = "bold">&#8226</span> ${map.name}</a>`;
      div.className = "map-list";
      document.getElementById("maps").appendChild(div);
    });
  });
