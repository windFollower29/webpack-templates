
export default class Page {
  constructor () {

    this.init()
  }

  init () {

    this.delay(300)
      .then(() => {

        console.log('after_delay')
      })

    window.addEventListener('load', () => {

      new Hot()

      // console.log('mylaydate', mylaydate)
    }, false)
  }

  async delay (time) {

    await new Promise((resolve, reject) => {

      setTimeout(() => {
        // console.log('setTimeout')

        resolve()
      }, time);
    })

    // console.log('after_await')
  }
}

new Page()
