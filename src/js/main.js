import Game from './game'

const callbacks = {
  onScoreChange: (value) => {
    console.log(value);
  }
}

const g = new Game(callbacks)
g.init()
g.start()
