const fakeLogin = () =>
  new Promise((resolve) => {
    let token = '123456789'
    setTimeout(() => resolve(token), 250)
  })

const login = async (creds) => {
  const res = await fetch('/api/login', {
    method: 'post',
    body: JSON.stringify(creds),
  })
  const data = await res.json()

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    }
  }

  return data
}

export { fakeLogin, login }
