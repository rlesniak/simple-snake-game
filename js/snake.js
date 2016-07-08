import Context from './context'

class Snake extends Context {
  constructor() {
    super()

    this.generateBody({ x: 20, y: 5 })
  }

  generateBody(startPosition = null, size = 5) {
    const body = []
    for (let i = 0; i < size; i++) {
      body.push({
        x: (this.size * i) + startPosition.x * this.size,
        y: startPosition.y * this.size,
      })
    }

    this.body = body
  }

  getHead() {
    return this.body[this.body.length - 1]
  }

  getTail() {
    return this.body[0]
  }

  getBody() {
    return this.body
  }

  checkPosition(x, y) {
    const coords = this.getHead()

    return coords.x === x && coords.y === y
  }

  draw(dir, snakeAdditionalLength) {
    const head = this.getHead()
    let newHead = {}

    switch (dir) {
      case 'l': newHead = { x: head.x - this.size, y: head.y }; break
      case 'r': newHead = { x: head.x + this.size, y: head.y }; break
      case 'd': newHead = { x: head.x, y: head.y + this.size }; break
      case 'u': newHead = { x: head.x, y: head.y - this.size }; break
      default: break
    }

    if (snakeAdditionalLength === 0) {
      this.body.shift()
    }

    this.body.push(newHead)

    this.body.forEach((s) => {
      this.drawRect(s.x, s.y)
    })
  }
}

export default Snake
