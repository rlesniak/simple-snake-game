import Context from './context'
import FOOD_TYPES from './const/food_types.js'

class Food extends Context {
  constructor() {
    super()
    this.props = {
      type: FOOD_TYPES.basic,
      pos: { x: 0, y: 0 },
    }
  }

  generate() {
    this.props.pos = {
      x: Math.round(Math.round(Math.random() * 390) / this.size) * 10,
      y: Math.round(Math.round(Math.random() * 390) / this.size) * 10,
    }

    this.setType()
  }

  // TODO: More accurate selecting type
  setType() {
    let type = null

    if (_.random(0, 100) > 70) {
      type = _.sample(FOOD_TYPES)
    } else {
      type = FOOD_TYPES.basic
    }

    this.props.type = type
  }

  getType() {
    return this.props.type
  }

  getPosition() {
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
