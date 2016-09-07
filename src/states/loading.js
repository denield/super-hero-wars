/*global Phaser*/
import _ from 'lodash'
import PouchDB from 'pouchdb'
import DEFAULTS from '../defaults'
import SETTINGS from '../settings'

class LoadingState extends Phaser.State {

  preload() {
    this.load.image('main_menu_background', './images/main_menu_background.png')
    this.load.image('settings_background', './images/settings_background.png')
    this.load.image('menu_button', './images/menu_button.png')
    this.load.image('controlls', './images/controlls.png')
  }

  create() {
    this.game.canvas.oncontextmenu = e => e.preventDefault()
    this.game.scale.pageAlignHorizontally = true
    this.game.scale.pageAlignVertically = true
    this.game.scale.refresh()
    this.loadDefaults()
    this.state.start('menuState')
  }

  loadDefaults() {
    const db = new PouchDB(SETTINGS.database)
    _.map(_.range(0, DEFAULTS.controllers.length), controllerNumber => db.get(`controller${controllerNumber}`)
      .then(controller => console.log(controller))
      .catch(() => {
        db.put({
          _id: `controller${controllerNumber}`,
          keys: [
            DEFAULTS.controllers[controllerNumber][0],
            DEFAULTS.controllers[controllerNumber][1],
            DEFAULTS.controllers[controllerNumber][2],
            DEFAULTS.controllers[controllerNumber][3],
          ],
        }, (err, result) => {
          if (!err) {
            console.log('Default controlls saved to database!')
          }
        })
      })
    )
  }

}

export default LoadingState
