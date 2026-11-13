function handleNotFound(req, res) {
  return res.status(404).json({ message: 'Route not found.' })
}


function handleServerError(error, req, res, next) {
  return res.status(500).json({ message: 'Something went wrong on our end.' })
}


export { handleNotFound, handleServerError }
