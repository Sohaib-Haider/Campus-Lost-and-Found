const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'


async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers }


  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`
  }


  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })


  let data = {}


  try {
    data = await response.json()
  } catch {
    data = {}
  }


  if (!response.ok) {
    const error = new Error(data.message || 'Request failed.')


    error.status = response.status
    error.errors = data.errors


    throw error
  }


  return data


}


export { request }
