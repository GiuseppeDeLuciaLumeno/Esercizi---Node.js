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

  //player 1
const joeDraw = luckyDraw("Joe")

joeDraw

 .then(player1 => console.log(player1))
 .catch(err => console.log(err))


 //player 2
 const sabrinaDraw = luckyDraw("Sabrina")

sabrinaDraw

 .then(player2 => console.log(player2))
 .catch(err => console.log(err))


//player 3

const carolineDraw = luckyDraw("Carolina")

carolineDraw

.then(player3 => console.log(player3))
.catch(err => console.log(err))

