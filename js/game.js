import Context from './context'
import Snake from './snake'
import Food from './food'

class Game extends Context {
  constructor() {
    super()
    this.snake = new Snake()
    this.food = new Food()

    this.interval = null
    this.dir = 'r'
    this.isOver = false
    this.snakeAdditionalLength = 0
    this.isPaused = false
  }

  restart() {
    clearInterval(this.interval)

    this.dir = 'r'
    this.snake = new Snake()
    this.food = new Food()
    this.isOver = false

    this.start()
  }

  start() {
    this.food.generate()

    this.interval = setInterval(() => {
      if (this.isOver) {
        this.restart()
        return
      }
      if (this.isPaused) {
        clearInterval(this.interval)
      }

      this.clear()
      this.draw()
    }, 100)
  }

  togglePause() {
    if (this.isPaused) {
      this.isPaused = false
      this.start()
    } else {
      this.isPaused = true
      clearInterval(this.interval)
    }
  }

  init() {
    document.addEventListener('keydown', this.initKeys.bind(this))
  }

  initKeys(e) {
    const key = e.keyCode

    if (key === 37 && this.dir !== 'r') {
      this.dir = 'l'
    } else if (key === 38 && this.dir !== 'd') {
      this.dir = 'u'
    } else if (key === 39 && this.dir !== 'l') {
      this.dir = 'r'
    } else if (key === 40 && this.dir !== 'u') {
      this.dir = 'd'
    } else if (key === 80) {
      this.togglePause()
    }
  }

  isEaten() {
    return this.snake.checkPosition(this.food.getPosition().x, this.food.getPosition().y)
  }

  generateFood() {
    while (this.food.isNotWithinArray(this.snake.getBody())) {
      this.food.generate()
    }
  }

  checkCollisionWithBody() {
    const head = this.snake.getHead()
    const body = this.snake.getBody()

    const isCollision = !!body.slice(0, -1).filter((frag) => (
      frag.x === head.x && frag.y === head.y
    )).length

    if (isCollision) {
      this.isOver = true
    }
  }

  checkCollisionWithBoundary() {
    const head = this.snake.getHead()
    const size = this.ctxSize - this.size

    if (head.x < -1 || head.x > size || head.y < -1 || head.y > size) {
      this.isOver = true
    }
  }

  draw() {
    this.snake.draw(this.dir, this.snakeAdditionalLength)

    if (this.isEaten()) {
      this.snakeAdditionalLength = 4
      this.generateFood()
    }

    this.food.draw()

    if (this.snakeAdditionalLength !== 0) {
      --this.snakeAdditionalLength
    }

    this.checkCollisionWithBoundary()
    this.checkCollisionWithBody()
  }
}

export default Game
