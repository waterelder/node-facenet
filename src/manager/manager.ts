import * as path  from 'path'
import {
  widget,
  // Widgets,
}                 from 'blessed'

import {
  log,
  MODULE_ROOT,
}                 from '../config'

import {
  Face,
}                 from '../face'

import {
  clear,
  MainFrame,
  SplashMenu,
}                 from './ui/'

interface MenuItem {
  text:     string,
  callback: () => Promise<void>,
}

export class Manager {
  private mainFrame:  MainFrame
  private screen:     widget.Screen
  private splashMenu: SplashMenu

  private menuItemList: MenuItem[]

  constructor() {
    log.verbose('Manager', 'constructor()')
    this.screen = new widget.Screen({
      smartCSR: true,
      warnings: true,
      // log: '/tmp/fm.log' as any,
    })
  }

  public async init(): Promise<void> {
    log.verbose('Manager', 'init()')

    this.mainFrame = new MainFrame(this.screen)

    this.menuItemList = [
      {
        text: 'Validate on LFW',
        callback: async () => console.log('validate lfw'),
      },
      {
        text: 'Photo Alignment',
        callback: async () => console.log('alignment'),
      },
      {
        text: 'Face Embedding',
        callback: async () => console.log('embedding'),
      },
      {
        text: 'Show Distance Between Faces',
        callback: async () => console.log('visulize'),
      },
      {
        text: 'Sort Photos Group by Face',
        callback: async () => console.log('sort'),
      },
    ]

    this.splashMenu = new SplashMenu(
      this.screen,
      this.menuItemList.map(m => m.text),
    )
  }

  public async start(): Promise<void> {
    log.verbose('Manager', 'start()')

    const menuIndex = await this.splashMenu.start()

    clear(this.screen)

    const callback = this.menuItemList
                          .map(m => m.callback)
                          [menuIndex]

    this.screen.key(['escape', 'q', 'x', 'C-q', 'C-x', 'f4', 'f10'], (/* ch: any, key: any */) => {
      this.screen.destroy()
    })

    await callback()

    await this.mainFrame.init()

    this.mainFrame.emit('image', path.join(
      MODULE_ROOT,
      'tests/fixtures/aligned-face.png',
    ))

    this.mainFrame.emit('face', new Face(
      path.join(
        MODULE_ROOT,
        'tests/fixtures/aligned-face.png',
      ),
    ))

    this.mainFrame.emit('face', new Face(
      path.join(
        MODULE_ROOT,
        'tests/fixtures/aligned-face.png',
      ),
    ))

    this.mainFrame.emit('face', new Face(
      path.join(
        MODULE_ROOT,
        'tests/fixtures/aligned-face.png',
      ),
    ))

    this.mainFrame.emit('face', new Face(
      path.join(
        MODULE_ROOT,
        'tests/fixtures/aligned-face.png',
      ),
    ))

    this.mainFrame.emit('face', new Face(
      path.join(
        MODULE_ROOT,
        'tests/fixtures/aligned-face.png',
      ),
    ))

    this.screen.render()

    return new Promise<void>((resolve) => {
      this.screen.once('destroy', resolve)
    })
  }

  public async align(file: string) {
    log.verbose('Manager', 'align(%s)', file)

  }

  public async validate(filepath: string) {
    log.verbose('Manager', 'validate(%s)', filepath)
  }

  public async validateDataset(dataset = 'lfw') {
    log.verbose('Manager', 'validateDateset(%s)', dataset)
  }

  public async visualize(file: string) {
    log.verbose('Manager', 'visualize(%s)', file)
  }

  public async sort(filepath: string) {
    log.verbose('Manager', 'sort(%s)', filepath)
  }

  public async embedding(file: string) {
    log.verbose('Manager', 'embedding(%s)', file)
  }

}

export default Manager