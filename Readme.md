# Introduction 

This is sample code to how to build reactive model in javascript using vanilla javascript.

In order to run this code :

```
yarn install
yarn start

```

In this sample code I am fetching a random json object and I attach the result to the model the moment I attach the result to the model it publishes a change event which notifies all the subscribers. See code sample. Feel free to fork and contact me.

```

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


```