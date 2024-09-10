import fastify from 'fastify'

const app = fastify()

app.listen({ port: 3000 }).then(() => {
  console.log('Fastify server listening on port 3000')
})
