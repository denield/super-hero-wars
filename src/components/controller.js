class Controller {
  constructor(up, down, left, right) {
    this.up = up
    this.down = down
    this.left = left
    this.right = right
  }

  getControlls() {
    return {
      up: this.up,
      down: this.down,
      left: this.left,
      right: this.right,
    }
  }

  setControll(controll, key) {
    switch(controll) {
      case 'up':
        this.up = key
        break
      case 'down':
        this.down = key
        break
      case 'left':
        this.left = key
        break
      case 'right':
        this.right = key
        break
      default:
        console.error('There is no such controll')
    }
  }
}

export default Controller
