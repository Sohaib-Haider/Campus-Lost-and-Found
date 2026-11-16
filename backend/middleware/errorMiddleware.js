function handleNotFound(req, res) {
  return res.status(404).json({ message: 'Route not found.' })
}


function handleServerError(error, req, res, next) {
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Request body must be valid JSON.' })
  }

  return res.status(500).json({ message: 'Something went wrong on our end.' })
}


export { handleNotFound, handleServerError }
