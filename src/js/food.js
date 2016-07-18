import Context from './context'
import FOOD_TYPES from './const/food_types'
import { numberBetween } from './helpers'

class Food extends Context {
  constructor() {
    super()
    this.props = {
      type: FOOD_TYPES[0],
      pos: { x: 0, y: 0 },
    }
  }

  generateRandomPoint(multiplier) {
    let point = Math.round(Math.random() * multiplier)

    if (point > this.rectSize) {
      point -= this.rectSize
    }

    return Math.round(point / this.rectSize) * this.rectSize
  }

  generate() {
    this.props.pos = {
      x: this.generateRandomPoint(this.ctxSize.w),
      y: this.generateRandomPoint(this.ctxSize.h),
    }
    this.generateType()
  }

  // TODO: More accurate selecting type
  generateType() {
    let type = null
    let c = 0

    if (_.random(0, 100) > 70) {
      c = _.random(0, 90)
      const food = _.find(FOOD_TYPES, (v) => (
        numberBetween(c, v.generatingRatio[0], v.generatingRatio[1])
      ))

      type = food
    } else {
      type = FOOD_TYPES[0]
    }

    this.props.type = type
  }

  get type() {
    return this.props.type
  }

  get position() {
    return this.props.pos
  }

  isNotWithinArray(arr) {
    if (arr.find((item) => item.x === this.props.pos.x && item.y === this.props.pos.y)) {
      return true
    }

    return false
  }

  draw() {
    const props = this.props
    this.drawRect(props.pos.x, props.pos.y, props.type.color, props.type.isFilled)
  }
}

export default Food
