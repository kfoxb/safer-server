var messageBus = {
  topics: {},

  test: () => {
    console.log(this.topics);
  },
  
  subscribe: (topic, listener) => {
    if (!this.topics[topic]) {
      this.topics[topic] = []
    }
    this.topics[topic].push(listener)
  },
  
  publish: (topic, payload) => {
    if (!this.topics[topic] || this.topics[topic].length < 1) {
      return
    }
    this.topics[topic].forEach((listener) => {
    listener(data || {})
    })
  }
}
messageBus.test();
console.log(messageBus)