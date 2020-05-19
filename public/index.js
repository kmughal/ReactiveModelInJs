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

fetch("https://randomuser.me/api/")
  .then((data) => data.json())
  .then((json) => (reactiveModel.me = json))
