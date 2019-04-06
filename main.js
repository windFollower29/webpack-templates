
export default class Page {
  constructor () {

    this.init()
  }

  init () {

    this.delay(300)
      .then(() => {

        console.log('after_delay')
      })
  }

  async delay (time) {

    await new Promise((resolve, reject) => {

      setTimeout(() => {
        console.log('setTimeout')

        resolve()
      }, time);
    })

    console.log('after_await')
  }
}

new Page