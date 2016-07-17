import Snake from '../src/js/snake'

describe('Hello world', () => {
  let snake

  beforeEach(() => {
    document.body.insertAdjacentHTML('afterbegin',
      '<canvas id="c" width="750" height="405" style="border:1px solid #000000;"></canvas>')
    snake = new Snake()
  })

  describe('#generateBody', () => {
    it('sets valid snake body', () => {
      snake.generateBody()

      expect(snake.body.length).toEqual(5)
    })
  })
})
