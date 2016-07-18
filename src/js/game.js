import Context from './context'
import Snake from './snake'
import Food from './food'
import Api from './api'

class Game extends Context {
  constructor(options = {}) {
    super()
    this.snake = new Snake()
    this.food = new Food()
    this.api = new Api(options.events)

    this.api.score = 0
    this.eatCounter = 0
    this.snakeSpeed = 100

    this.dir = 'r'
    this.isOver = false
    this.snakeAdditionalLength = 0
    this.isPaused = false
  }

  restart() {
    this.api.onGameStart()

    this.dir = 'r'
    this.snake = new Snake()
    this.food = new Food()
    this.isOver = false

    this.start()
  }

  init() {
    document.addEventListener('keydown', this.initKeys.bind(this))
  }

  start() {
    this.api.score = 0
    this.snakeSpeed = 100
    this.food.generate()

    this.gameLoop()
  }

  gameLoop() {
    if (this.isPaused) {
      setTimeout(() => {
        this.gameLoop()
      }, this.snakeSpeed)
      return
    }

    if (this.isOver) {
      this.api.onGameOver()
      return
    }

    this.clear()
    this.draw()

    setTimeout(() => {
      this.gameLoop()
    }, this.snakeSpeed)
  }

  togglePause() {
    if (this.isPaused) {
      this.isPaused = false
      this.gameLoop()
    } else {
      this.isPaused = true
      this.api.onGamePause()
    }
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
    } else if (key === 80) { // p
      this.togglePause()
    } else if (key === 82) { // r
      this.restart()
    }
  }

  isEaten() {
    const foodPos = this.food.position
    return this.snake.checkPosition(foodPos.x, foodPos.y)
  }

  generateFood() {
    while (this.food.isNotWithinArray(this.snake.getBody())) {
      this.food.generate()
    }
  }

  checkCollisionWithBody() {
    const head = this.snake.head
    const body = this.snake.getBody()

    const isCollision = !!body.slice(0, -1).filter((frag) => (
      frag.x === head.x && frag.y === head.y
    )).length

    if (isCollision) {
      this.isOver = true
    }
  }

  checkCollisionWithBoundary() {
    const head = this.snake.head
    const boardSize = { x: this.ctxSize.w - this.rectSize, y: this.ctxSize.h - this.rectSize }

    if (head.x < -1 || head.x > boardSize.x || head.y < -1 || head.y > boardSize.y) {
      this.isOver = true
    }
  }

  draw() {
    if (this.isEaten()) {
      this.snakeAdditionalLength += this.food.type.power
      this.generateFood()
      this.snakeSpeed -= 5

      this.api.score = this.snake.getLength() + this.food.type.power
    }

    this.snake.draw(this.dir, this.snakeAdditionalLength)
    this.food.draw()

    if (this.snakeAdditionalLength !== 0) {
      --this.snakeAdditionalLength
    }

    this.checkCollisionWithBoundary()
    this.checkCollisionWithBody()
  }
}

export default Game
