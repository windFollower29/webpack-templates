

export default class Foo {

  constructor () {
    this.init()
    // console.log('foo')
  }

  init () {  

    document.getElementById('foo').addEventListener('click', function () {
      this.value = Math.random()
    })
    
  }
}

