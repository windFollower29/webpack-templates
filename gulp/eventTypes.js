

module.exports = {
  isChanged (file) {
    return file.event === 'change'
  },

  isAdded (file) {
    return file.event === 'add'
  }
}