import { Link } from 'react-router-dom'


function MyPostsPage({ items, currentUser }) {


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
            </article>
          ))}
        </div>
      )}
    </>
  )
}

export default MyPostsPage
