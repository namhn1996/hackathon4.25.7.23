let players = document.getElementById("players");
let form = document.getElementById("playerForm");
let url = "http://localhost:3000/api/v1/player";
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    let { player } = data;
    player.forEach((e, i) => {
      players.innerHTML += ` 
      <li class="list-group-item">${e.name}</li>
       `;
    });
  })
  .catch((err) => {
    console.log(err);
  });
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let username = { name: form.name.value };
  try {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(username),
    });
    let data = await res.json();
    players.innerHTML += `
    <li class="list-group-item">${data.player.name}</li>`;
    form.name.value = "";
    let playerss = await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data.player;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(playerss);
    if (playerss.length == 4) {
      window.location.href = "http://localhost:3000/scores";
    }
  } catch (error) {
    console.log(error);
  }
});
