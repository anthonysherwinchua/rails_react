export const handleResponse = (res, callback) => {
  if (res.ok) {
    if (res.status == 204) {
      return callback({ status: 'success', data: {} })
    } else {
      return res.json().then(json => callback({ status: 'success', data: json }))
    }
  } else {
    return res.json().then(json => callback({ status: 'error', data: json }))
  }
}
