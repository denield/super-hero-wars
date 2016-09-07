const FONT = 'Bangers'
const ANCHOR = 0.5
const SIZE = 100
const COLOR = '#01A2B8'
const SHADOW_COLOR = 'rgba(0,0,0,0.5)'
const SHADOW_SIZE = 4
const STROKE = 5
const STROKE_THICKNESS = 5
const PADDING = 20

class TitleText {

  constructor(game, x, y, text) {
    this.text = game.add.text(x + PADDING / 2, y + PADDING / 2, text)
    this.text.anchor.setTo(ANCHOR)
    this.text.font = FONT
    this.text.fontSize = SIZE
    this.text.fill = COLOR
    this.text.stroke = STROKE
    this.text.strokeThickness = STROKE_THICKNESS
    this.text.setShadow(SHADOW_SIZE, SHADOW_SIZE, SHADOW_COLOR, SHADOW_SIZE)
    this.text.padding.set(PADDING, PADDING)
  }

  getText() {
    return this.text
  }

}

export default TitleText
