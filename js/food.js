import Context from './context'

class Food extends Context {
  constructor() {
    super()
    this.position = {
      x: 0,
      y: 0,
    }
  }

  generate() {
    this.position = {
      x: Math.round(Math.round(Math.random() * 390) / this.size) * 10,
      y: Math.round(Math.round(Math.random() * 390) / this.size) * 10,
    }
  }

  getPosition() {
    return this.position
  }

  isNotWithinArray(arr) {
    if (arr.find((item) => item.x === this.position.x && item.y === this.position.y)) {
      return true
    }

    return false
  }

  draw() {
    this.drawRect(this.position.x, this.position.y, '#000000')
  }
}

export default Food
