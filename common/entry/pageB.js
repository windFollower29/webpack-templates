import "@babel/polyfill"

// import $ from 'jquery'

// import "regenerator-runtime/runtime"

// import common from '../js/common'

class Server {
  constructor () {

    this.init()
  }

  init () {
    // console.log('server')
    // console.log(Promise.resolve)
    console.log('Array.includes', [1,2].includes(2))

    console.log(10**2)

    let a = this.delay()
      .then(res => {
        console.log(res)
      })
  }

  async delay () {
    return await(Promise.resolve(2))


  }
}

export default new Server()