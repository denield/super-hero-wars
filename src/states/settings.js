/*global Phaser*/
import { ControllButtons, MenuButton, TitleText } from '../components'

class SettingsState extends Phaser.State { // eslint-disable-line no-undef

  constructor() {
    super()
    this.cancel = this.cancel.bind(this)
    this.save = this.save.bind(this)
    this.listenForPlayerKey = this.listenForPlayerKey.bind(this)
  }

  preload() {
    this.add.sprite(0, 0, 'settings_background')
  }

  async create() {
    new MenuButton(this, 269, 612, this.cancel, 'Back')
    new MenuButton(this, 714, 612, this.save, 'Save')

    new TitleText(this, 470 + (this.game.width - 470) / 2, 60, 'SETTINGS')
    new TitleText(this, 520, 180, 'Controlls')
    new TitleText(this, 950, 180, 'Sound')

    this.controller1 = new ControllButtons(this, 220, 280, 1, this.listenForPlayerKey)
    this.controller2 = new ControllButtons(this, 530, 280, 2, this.listenForPlayerKey)
    this.controller3 = new ControllButtons(this, 220, 450, 3, this.listenForPlayerKey)
    this.controller4 = new ControllButtons(this, 530, 450, 4, this.listenForPlayerKey)

    this.input.keyboard.onUpCallback = e => {
      if (this.setKey) {
        this.setKey = false
        this.setButton(this.controll, e.keyCode)
      }
    }
  }

  setPlayerButton(controller, controllerKey) {

  }

  listenForPlayerKey(controll, reset, setButton, key) {
    if (this.reset && this.controll !== null) {
      this.reset(this.controll)
    }
    key.text = '?'
    this.controll = controll
    this.reset = reset
    this.setButton = setButton
    this.setKey = true
  }

  save() {
    this.controller1.save()
    this.controller2.save()
    this.controller3.save()
    this.controller4.save()
    this.state.start('menuState')
    this.reset = null
  }

  cancel() {
    this.state.start('menuState')
    this.reset = null
  }

}

export default SettingsState
