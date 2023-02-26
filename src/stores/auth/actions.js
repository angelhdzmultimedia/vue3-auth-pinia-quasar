import { isLoading, user, isAuth } from './state'

const serverUrl = 'http://localhost:5000'

function wait(milisegundos) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), milisegundos)
  })
}

export async function loadProfile() {
  isLoading.value = true
  await wait(500)

  try {
    const response = await fetch(`${serverUrl}/api/auth/user`)

    if (response.ok) {
      const data = await response.json()
      user.value = { ...data }
      isAuth.value = true
    }
  } catch (error) {
  } finally {
    isLoading.value = false
  }
}

export async function logout() {
  await wait(500)
  return fetch(`${serverUrl}/api/auth/logout`)
}

export async function login(loginData) {
  return new Promise(async (resolve, reject) => {
    await wait(500)
    const response = await fetch(`${serverUrl}/api/auth/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(loginData),
    })

    if (response.ok) {
      const data = await response.json()
      user.value = { ...data }
      isAuth.value = true
      return resolve()
    }
    return reject(await response.text())
  })
}

export async function register(registerData) {
  await wait(500)
  return fetch(`${serverUrl}/api/auth/register`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(registerData),
  })
}
