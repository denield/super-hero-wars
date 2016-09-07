const TEXT_FONT = 'Roboto'
const TEXT_SIZE = 45
const TEXT_COLOR = '#ffffff'
const TEXT_HOVER_COLOR = '#01A2B8'
const TEXT_SHADOW_COLOR = 'rgba(0,0,0,0.5)'
const TEXT_SHADOW_SIZE = 4
const TEXT_PADDING = 10

const BUTTON_WIDTH = 359
const BUTTON_HEIGHT = 90

class MenuButton {

  constructor(game, x, y, callback, label) {
    this.button = game.add.button(x, y, 'menu_button', callback, game)
    this.button.input.useHandCursor = true
    this.button.events.onInputOver.add(this.onInputOver, this)
    this.button.events.onInputOut.add(this.onInputOut, this)
    this.button.events.onInputUp.add(callback, this)
    this.buttonText = game.add.text(x + BUTTON_WIDTH / 2 + TEXT_PADDING / 2, y + BUTTON_HEIGHT / 2 + TEXT_PADDING / 2, label)
    this.buttonText.anchor.setTo(0.5) // eslint-disable-line no-magic-numbers
    this.buttonText.font = TEXT_FONT
    this.buttonText.fontSize = TEXT_SIZE
    this.buttonText.fill = TEXT_COLOR
    this.buttonText.setShadow(TEXT_SHADOW_SIZE, TEXT_SHADOW_SIZE, TEXT_SHADOW_COLOR, TEXT_SHADOW_SIZE)
    this.buttonText.padding.set(TEXT_PADDING, TEXT_PADDING)
  }

  getButton() {
    return this.button
  }

  getButtonText() {
    return this.buttonText
  }

  onInputOver() {
    this.buttonText.fill = TEXT_HOVER_COLOR
  }

  onInputOut() {
    this.buttonText.fill = TEXT_COLOR
  }

}

export default MenuButton
