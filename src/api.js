const fakeLogin = () =>
  new Promise((resolve) => {
    let token = '123456789'
    console.log(token)
    setTimeout(() => resolve(token), 250)
  })

export { fakeLogin }
