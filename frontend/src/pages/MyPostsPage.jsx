import { Link } from 'react-router-dom'


function MyPostsPage({ items, currentUser, onDeleteItem, onReturnItem }) {


  const myItems = items.filter((item) => item.ownerId === currentUser.id)


  return (
    <>
      <h1>My Posts</h1>

      {myItems.length === 0 ? (
        <div className="empty-message">
          <p>You have no posts yet.</p>
          <p><Link to="/post-item">Post Item</Link></p>
        </div>
      ) : (
        <div className="item-grid">
          {myItems.map((item) => (
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

              <button type="button" onClick={() => {
                if (window.confirm('Are you sure you want to delete this item?')) {
                  onDeleteItem(item.id)
                }
              }}>Delete</button>

              {!item.returned && (
                <button type="button" onClick={() => {
                  onReturnItem(item.id)
                }}>Mark as returned</button>
              )}
            </article>
          ))}
        </div>
      )}
    </>
  )
}

export default MyPostsPage
