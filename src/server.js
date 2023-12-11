import { createServer, Model, Response } from 'miragejs'

createServer({
  models: {
    users: Model,
  },

  seeds(server) {
    server.create('user', {
      id: '001',
      email: 'admin@tokiored.com',
      password: 'p123',
      name: 'Ricky',
      role: 'superadmin',
      role_id: '01',
    })
    server.create('user', {
      id: '002',
      email: 'super@tokiored.com',
      password: 'p123',
      name: 'Julian',
      role: 'admin',
      role_id: '02',
    }),
      server.create('user', {
        id: '003',
        email: 'user@tokiored.com',
        password: 'p123',
        name: 'Bub',
        role: 'user',
        role_id: '03',
      })
  },

  routes() {
    this.namespace = 'api'
    this.logging = false
    // this.timing = 2000  // => mock a 2 second delay in server response

    this.post('/login', (schema, request) => {
      const { email, password } = JSON.parse(request.requestBody)
      const foundUser = schema.users.findBy({ email, password })

      if (!foundUser) {
        return new Response(
          401,
          {},
          { message: 'No user with those credentials found!' }
        )
      }
      // Remove password from return
      foundUser.password = undefined
      return {
        user: foundUser.name,
        token: "Enjoy your pizza, here's your tokens.",
      }
    })
  },
})
