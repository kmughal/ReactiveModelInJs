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

setInterval(
  () =>
    fetch("https://randomuser.me/api/")
      .then((data) => data.json())
      .then((json) => (reactiveModel.me = json)),
  5000
)

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

//chrome://flags/#enable-portals
if ("HTMLPortalElement" in window) {
  const style = document.createElement("style")
  style.innerHTML = `
  portal {
    position:fixed;
    width: 100%;
    height: 100%;
    opacity: 0;
    box-shadow: 0 0 20px 10px #999;
    transform: scale(0.4);
    transform-origin: bottom left;
    bottom: 20px;
    left: 20px;
    animation-name: fade-in;
    animation-duration: 1s;
    animation-delay: 2s;
    animation-fill-mode: forwards;
  }
  .portal-transition {
    transition: transform 0.4s;
  }
  @media (prefers-reduced-motion: reduce) {
    .portal-transition {
      transition: transform 0.001s;
    }
  }
  .portal-reveal {
    transform: scale(1.0) translateX(-20px) translateY(20px);
  }
  @keyframes fade-in {
    0%   { opacity: 0; }
    100% { opacity: 1; }
  }
`

  const portal = document.createElement("portal")
  portal.src = "https://www.bbc.com"
  portal.style = style
  document.body.appendChild(portal)
  // portal.activate()
}
