import Context from './context'

class Snake extends Context {
  constructor() {
    super()

    this.generateBody({ x: 20, y: 5 })
  }

  generateBody(startPosition = null, length = 5) {
    const body = []
    for (let i = 0; i < length; i++) {
      body.push({
        x: (this.rectSize * i) + startPosition.x * this.rectSize,
        y: startPosition.y * this.rectSize,
      })
    }

    this.body = body
  }

  get head() {
    return this.body[this.body.length - 1]
  }

  get tail() {
    return this.body[0]
  }

  getLength() {
    return this.body.length
  }

  getBody() {
    return this.body
  }

  checkPosition(x, y) {
    const coords = this.head

    return coords.x === x && coords.y === y
  }

  draw(dir, snakeAdditionalLength) {
    const head = this.head
    let newHead = {}

    switch (dir) {
      case 'l': newHead = { x: head.x - this.rectSize, y: head.y }; break
      case 'r': newHead = { x: head.x + this.rectSize, y: head.y }; break
      case 'd': newHead = { x: head.x, y: head.y + this.rectSize }; break
      case 'u': newHead = { x: head.x, y: head.y - this.rectSize }; break
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
