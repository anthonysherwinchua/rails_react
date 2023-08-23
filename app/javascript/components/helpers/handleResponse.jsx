export const handleResponse = (res, callback) => {
  if (res.ok) {
    return res.json().then(json => callback({ status: 'success', data: json }))
  } else {
    return res.json().then(json => callback({ status: 'error', data: json }))
  }
}
