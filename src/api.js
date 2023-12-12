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

const getUsers = async () => {
  try {
    // React router conflicts with file lookup
    // json file should be in `/public` folder
    // `import users from ./users.json` would be
    // the correct way to use data fom a .json file
    // this solution is for diginius test criteria  *only*
    const res = await fetch('/users.json')
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export { login, getUsers }
