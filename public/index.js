const model = {
  name: "khurram",
  address: { street: " uk" },
  me: null,
}

const { notify, buildReactiveModel } = ReactiveModel(model)
const reactiveModel = buildReactiveModel()

const rhtml = document.getElementById("rhtml")
notify(reactiveModel, ({ newValue }) => {
  const me = newValue.results[0]
  rhtml.innerHTML = `
    <h1>${me.id.name}</h1>
    <p>Email: ${me.email}</p>
  `
})

setInterval(() =>fetch("https://randomuser.me/api/")
.then((data) => data.json())
.then((json) => (reactiveModel.me = json)) , 5000)

// Timer example
const time = document.getElementById("time")
const timeModel = { current: new Date().toString() }
const reactiveTimeModelBuilder = ReactiveModel(timeModel)
const reactiveTimeModel = reactiveTimeModelBuilder.buildReactiveModel()

reactiveTimeModelBuilder.notify(reactiveTimeModel, ({ newValue }) => {
  time.innerHTML = newValue
})
setInterval(() => {
  reactiveTimeModel.current = new Date().toString()
}, 100)

// SImple counter example
const counterBtn = document.getElementById("counter-btn")
const counterValue = document.getElementById("counter-value")
const counterModel = { value: 0 }
const reactiveCounterModelBuilder = ReactiveModel(counterModel)
const reactiveCounterModel = reactiveCounterModelBuilder.buildReactiveModel()

reactiveCounterModelBuilder.notify(reactiveCounterModel, ({ newValue }) => {
  counterValue.innerHTML = newValue
})

counterBtn.addEventListener("click", () => {
  reactiveCounterModel.value++
})
