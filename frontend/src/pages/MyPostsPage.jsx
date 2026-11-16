import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ItemActions from '../components/ItemActions.jsx'


function MyPostsPage({ items, onLoad, onDeleteItem, onReturnItem }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(null)


  useEffect(() => {
    onLoad()
      .then(() => {
        setError(null)
        setLoaded(true)
      })
      .catch(() => setError('Could not load your posts right now. Please try again.'))
  }, [onLoad])


  return (
    <>
      <h1>My Posts</h1>

      {error && <p className="field-error" role="alert">{error}</p>}

      {!loaded && !error ? (
        <p className="empty-message" role="status">Loading your posts...</p>
      ) : loaded && items.length === 0 ? (
        <div className="empty-message">
          <p>You have no posts yet.</p>
          <p><Link to="/post-item">Post Item</Link></p>
        </div>
      ) : (
        <div className="item-grid">
          {items.map((item) => (
            <article key={item.id} className="item-card">
              <span className={`status-label status-${item.type}`}>
                {item.type === 'lost' ? 'Lost' : 'Found'}
              </span>
              {item.returned && <span className="status-label status-returned">Returned</span>}

              <h2>{item.title}</h2>

              <p className="item-meta">{item.category} &middot; {item.location}</p>
              <p className="item-meta">{item.itemDate}</p>

              <Link to={`/items/${item.id}`}>View details</Link>
              <Link to={`/items/${item.id}/edit`}>Edit</Link>


              <ItemActions item={item} onDeleteItem={onDeleteItem} onReturnItem={onReturnItem} />
            </article>
          ))}
        </div>
      )}
    </>
  )


}


export default MyPostsPage
