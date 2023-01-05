const players = ["Joe", "Caroline", "Sabrina"]

function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}


players.forEach(player => {
  const result = luckyDraw(player)

  .then(player => console.log(player))
  .catch(e => console.log(e))
})


