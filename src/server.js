import { createServer, Model, Response } from 'miragejs'
// import usersData from './users.json'

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
      // Remove all private data based on `role`
      // -- only admin and a superuser can view `email field`
      // -- only admin can view `ip_address`
      if (foundUser.role === 'user') {
        foundUser.email = undefined
        foundUser.ip_address = undefined
      } else if (foundUser.role === 'superadmin') {
        foundUser.ip_address = undefined
      }
      // Remove password from return for all roles
      foundUser.password = undefined
      return {
        user: foundUser,
        token: 'EnjoyYourPizzaSlice.',
      }
    })

    // We need to whitelist the request to the local
    // `users.json` file
    // Do a runtime check and return true so Mirage
    // will allow a request to the actual network layer.
    // Passing the path directly will fail
    // - this.passthrough('/public/users.json')
    this.passthrough((request) => {
      if (request.url === '/public/users.json') return true
    })
  },
})
