import _ from 'lodash'
import PouchDB from 'pouchdb'
import { keyboardMap } from '../utils'
import SETTINGS from '../settings'

const CONTROLLER_BUTTON_WIDTH = 92
const CONTROLLER_BUTTON_HEIGHT = 65

const TEXT_ANCHOR = 0.5
const TEXT_FONT = 'Times New Roman'
const TEXT_SIZE = 50
const TEXT_COLOR = '#FFFFFF'
const TEXT_STROKE = '#000000'
const TEXT_STROKE_THICKNESS = 5

const UP = 0
const LEFT = 1
const DOWN = 2
const RIGHT = 3

class ControllButtons {

  constructor(game, x, y, controllerNumber, callback) {
    this.db = new PouchDB(SETTINGS.database)
    this.reset = this.reset.bind(this)
    this.setButton = this.setButton.bind(this)
    this.controllerNumber = controllerNumber
    this.getControllsAndCreateLayout = this.getControllsAndCreateLayout.bind(this)
    this.getControllsAndCreateLayout(game, x, y, this.db, controllerNumber, callback)
  }

  async getControllsAndCreateLayout(game, x, y, db, controllerNumber, callback) {
    game.add.sprite(x, y, 'controlls')
    this.createControllerNumberText(game, x, y, controllerNumber)
    this.createButtons(game, x, y, callback)
    try {
      this.controlls = await db.get(`controller${controllerNumber - 1}`)
    } catch (err) {
      console.error(err)
    }
    this.controllerButtons = this.createButtonTexts(game, x, y, this.controlls.keys)
  }

  createControllerNumberText(game, x, y, controllerNumber) {
    const text = game.add.text(x + CONTROLLER_BUTTON_WIDTH / 2, y + CONTROLLER_BUTTON_HEIGHT / 2, controllerNumber)
    text.anchor.setTo(TEXT_ANCHOR)
    text.font = TEXT_FONT
    text.fontSize = TEXT_SIZE
    text.fill = TEXT_COLOR
    text.stroke = TEXT_STROKE
    text.strokeThickness = TEXT_STROKE_THICKNESS
  }

  createButtons(game, x, y, callback) {
    const controllerButtons = game.add.group()
    controllerButtons.add(game.add.button(x + CONTROLLER_BUTTON_WIDTH, y, null, () => this.onButtonClick(UP, callback), this))
    controllerButtons.add(game.add.button(x, y + CONTROLLER_BUTTON_HEIGHT, null, () => this.onButtonClick(LEFT, callback), this))
    controllerButtons.add(game.add.button(x + CONTROLLER_BUTTON_WIDTH, y + CONTROLLER_BUTTON_HEIGHT, null, () => this.onButtonClick(DOWN, callback), this))
    controllerButtons.add(game.add.button(x + 2 * CONTROLLER_BUTTON_WIDTH, y + CONTROLLER_BUTTON_HEIGHT, null, () => this.onButtonClick(RIGHT, callback), this))
    controllerButtons.forEach(button => {
      button.input.useHandCursor = true
      button.width = CONTROLLER_BUTTON_WIDTH
      button.height = CONTROLLER_BUTTON_HEIGHT
    })
    return controllerButtons
  }

  createButtonTexts(game, x, y, controlls) {
    const controllerTexts = game.add.group()
    controllerTexts.add(game.add.text(x + CONTROLLER_BUTTON_WIDTH + CONTROLLER_BUTTON_WIDTH / 2, y + CONTROLLER_BUTTON_HEIGHT / 2, keyboardMap[controlls[UP]]))
    controllerTexts.add(game.add.text(x + CONTROLLER_BUTTON_WIDTH / 2, y + CONTROLLER_BUTTON_HEIGHT + CONTROLLER_BUTTON_HEIGHT / 2, keyboardMap[controlls[LEFT]]))
    controllerTexts.add(game.add.text(x + CONTROLLER_BUTTON_WIDTH + CONTROLLER_BUTTON_WIDTH / 2, y + CONTROLLER_BUTTON_HEIGHT + CONTROLLER_BUTTON_HEIGHT / 2, keyboardMap[controlls[DOWN]]))
    controllerTexts.add(game.add.text(x + 2 * CONTROLLER_BUTTON_WIDTH + CONTROLLER_BUTTON_WIDTH / 2, y + CONTROLLER_BUTTON_HEIGHT + CONTROLLER_BUTTON_HEIGHT / 2, keyboardMap[controlls[RIGHT]]))
    controllerTexts.forEach(text => {
      text.useHandCursor = true
      text.anchor.setTo(0.5)
      text.fontSize = 25
      text.stroke = '#000000'
      text.strokeThickness = 2
      text.fill = '#FFFFFF'
    })
    return controllerTexts
  }

  onButtonClick(controll, callback) {
    callback(controll, this.reset, this.setButton, this.controllerButtons.getChildAt(controll))
  }

  setButton(controll, controllKey) {
    this.controlls.keys[controll] = controllKey
    this.controllerButtons.getChildAt(controll).text = keyboardMap[controllKey]
  }

  reset(controll) {
    this.controllerButtons.getChildAt(controll).text = keyboardMap[this.controlls.keys[controll]]
  }

  async save() {
    try {
      await this.db.put({
        _id: `controller${this.controllerNumber - 1}`,
        _rev: this.controlls._rev,
        keys: this.controlls.keys,
      })
    } catch (err) {
      if (err.status !== 409) {
        console.log(err)
      }
    }
  }

}

export default ControllButtons
