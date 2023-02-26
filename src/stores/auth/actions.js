import { isLoading, user, isAuth } from './state'

const serverUrl = 'http://localhost:5000'

export async function loadProfile() {
  isLoading.value = true
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

export function logout() {
  return fetch(`${serverUrl}/api/auth/logout`)
}

export async function login(loginData) {
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
  }
}

export async function register(registerData) {
  return fetch(`${serverUrl}/api/auth/register`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(registerData),
  })
}
