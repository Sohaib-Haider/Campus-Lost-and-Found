import { Link } from 'react-router-dom'


function NotFoundPage() {
  return (
    <>
      <h1>Page not found</h1>
      <p>We could not find this page.</p>

      <Link to="/">Back to the board</Link>
    </>
  )
}

export default NotFoundPage
