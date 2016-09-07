/*global Phaser*/
import 'babel-polyfill'
import 'phaser-shim'
import WebFont from 'webfontloader'
import { LoadingState, MenuState, SettingsState } from './states'

const GAME_WIDTH = 1280
const GAME_HEIGHT = 720

class Game extends Phaser.Game {

  constructor(width, height) {
    super(width, height, Phaser.AUTO, 'game', null)
    this.state.add('loadingState', LoadingState, false)
    this.state.add('menuState', MenuState, false)
    this.state.add('settingsState', SettingsState, false)
  }

  start() {
    this.state.start('loadingState')
  }

}

const game = new Game(GAME_WIDTH, GAME_HEIGHT)

WebFont.load({

  active() {
    game.start()
  },
  //  The Google Fonts we want to load (specify as many as you like in the array)
  google: {
    families: ['Roboto::latin', 'Bangers::latin'],
  },

})
