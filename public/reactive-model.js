function ReactiveModel(model) {
  const pb = new PubSub()
  return {
    buildReactiveModel: () => {
      return createModel(model)
    },
    notify: pb.addSubscriber,
  }

  // Private method and classes

  function isObject(value) {
    return value instanceof Object
  }

  function createModel(obj, result = {}) {
    for (let prop in obj) {
      let value = obj[prop]
      let valueIsObject = isObject(value)
      if (!valueIsObject) createProperty(obj, prop, result)
      else createObject(value, prop, result)
    }
    return result
  }

  function createObject(value, prop, result) {
    let backingStore = createModel(value)

    Object.defineProperty(result, prop, {
      set(value) {
        const oldValue = backingStore
        backingStore = Object.assign({}, value)
        pb.publish(backingStore, { oldValue, newValue: backingStore })
      },
      get() {
        return backingStore
      },
    })
  }

  function createProperty(obj, prop, result) {
    Object.defineProperty(result, prop, {
      set(value) {
        const oldValue = obj[prop]
        obj[prop] = value
        pb.publish(obj, { oldValue, newValue: value })
      },
      get() {
        return obj[prop]
      },
    })
    return result
  }

  function PubSub() {
    const list = []

    this.addSubscriber = (index, cb) => {
      if (!list[index]) list[index] = new Array()
      list[index].push(cb)
    }

    this.publish = (index, data) => {
      const item = list[index]
      if (!item) return
      const equal = (p1, p2) => JSON.stringify(p1) === JSON.stringify(p2)
      for (let cb of item) {
        var propsAreNotEqual = !equal(data.oldValue, data.newValue)
        if (propsAreNotEqual) cb(data)
      }
    }
  }
}


