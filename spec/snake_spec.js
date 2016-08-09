import Snake from '../src/js/snake'

describe('Snake', () => {
  let snake

  beforeAll(() => {
    snake = new Snake()
    const baseSnakeLength = 5

    document.body.insertAdjacentHTML('afterbegin',
      '<canvas id="c" width="750" height="405" style="border:1px solid #000000;"></canvas>')
    snake.generateBody({ x: 5, y: 2 }, baseSnakeLength)
  })

  describe('#generateBody', () => {
    it('sets valid snake body', () => {
      expect(snake.body.length).toEqual(5)
    })
  })

  describe('getters', () => {
    it('gets valid head', () => {
      expect(snake.head).toEqual({ x: 135, y: 30 })
    })

    it('gets valid tail', () => {
      expect(snake.tail).toEqual({ x: 75, y: 30 })
    })

    it('gets valid length', () => {
      expect(snake.getLength()).toEqual(5)
    })

    it('gets valid body', () => {
      expect(snake.getBody()).toEqual(snake.body)
    })

    it('checks valid position', () => {
      expect(snake.checkPosition(135, 30)).toBe(true)
    })
  })

  describe('#draw', () => {
    describe('when normal move', () => {
      const additionalLength = 0

      it('moves to the right', () => {
        snake.draw('r', additionalLength)
        expect(snake.body[4]).toEqual({ x: 150, y: 30 })
      })

      it('moves to the down', () => {
        snake.draw('d', additionalLength)
        expect(snake.body[4]).toEqual({ x: 150, y: 45 })
      })

      it('moves to the left', () => {
        snake.draw('l', additionalLength)
        expect(snake.body[4]).toEqual({ x: 135, y: 45 })
      })

      it('moves to the up', () => {
        snake.draw('u', additionalLength)
        expect(snake.body[4]).toEqual({ x: 135, y: 30 })
      })

      it('moves still to the up', () => {
        snake.draw('ds', additionalLength)
        expect(snake.body[4]).toEqual({ x: 150, y: 30 })
      })
    })

    describe('when eat move', () => {
      const additionalLength = 2

      it('moves to the right', () => {
        snake.draw('r', additionalLength)
        expect(snake.body.length).toEqual(6)
      })
    })
  })
})
