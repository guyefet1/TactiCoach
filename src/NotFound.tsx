import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="page not-found-page">
      <p className="not-found-code">404</p>
      <h1>We can’t find that page</h1>
      <p>The page may have moved, or the address may be incorrect.</p>
      <Link className="back-to-squad" to="/">
        Back to Squad
      </Link>
    </section>
  )
}

export default NotFound
