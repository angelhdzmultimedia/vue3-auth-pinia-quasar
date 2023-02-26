import { isLoading, user, isAuth, timeout } from './state'

const serverUrl = 'http://localhost:5000'

function wait(milisegundos) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), milisegundos)
  })
}

export async function loadProfile() {
  isLoading.value = true
  await wait(timeout.value)

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
  await wait(timeout.value)
  await fetch(`${serverUrl}/api/auth/logout`)
  isAuth.value = false
}

export async function login(loginData) {
  return new Promise(async (resolve, reject) => {
    await wait(timeout.value)
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
  await wait(timeout.value)
  return fetch(`${serverUrl}/api/auth/register`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(registerData),
  })
}
