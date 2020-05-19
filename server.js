const fastify = require("fastify")()
const path = require("path")

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
})

fastify.get("/", (req, reply) => {
  reply.sendFile("index.html", "public")
})

const port = process.env.PROCESS || 3000
fastify.listen(port, (_, address) => console.log(address))
