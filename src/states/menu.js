/*global Phaser*/
import _ from 'lodash'
import { MenuButton } from '../components'

const menu = [
  { position: { x: 461, y: 253 }, state: 'createOfflineGameState', label: 'LOCAL GAME' },
  { position: { x: 461, y: 354 }, state: 'createOnlineGameState', label: 'ONLINE GAME' },
  { position: { x: 461, y: 456 }, state: 'settingsState', label: 'SETTINGS' },
  { position: { x: 461, y: 557 }, state: 'helpState', label: 'HELP' },
]

class MenuState extends Phaser.State {

  preload() {
    this.add.sprite(0, 0, 'main_menu_background')
  }

  create() {
    _.forEach(menu, menuItem => new MenuButton(this, menuItem.position.x, menuItem.position.y, () => this.goState(menuItem.state), menuItem.label))
  }

  goState(stateName) {
    this.state.start(stateName)
  }

}

export default MenuState
