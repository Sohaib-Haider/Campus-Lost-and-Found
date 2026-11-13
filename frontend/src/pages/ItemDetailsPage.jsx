import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'


function ItemDetailsPage({ item, itemLoading, itemError, loadItem, currentUser, onDeleteItem, onReturnItem }) {
  const { id } = useParams()


  useEffect(() => {
    loadItem(id)
  }, [id, loadItem])


  if (itemLoading) {
    return (
      <>
        <p><Link to="/">&larr; Back to the board</Link></p>
        <p className="empty-message" role="status">Loading item...</p>
      </>
    )
  }


  if (itemError) {
    return (
      <>
        <p><Link to="/">&larr; Back to the board</Link></p>
        <h1>Item not found</h1>
        <p>{itemError}</p>
        <Link to="/">Back to the board</Link>
      </>
    )
  }


  if (!item) {
    return (
      <>
        <p><Link to="/">&larr; Back to the board</Link></p>
        <h1>Item not found</h1>
        <p>We could not find an item with that ID.</p>
        <Link to="/">Back to the board</Link>
      </>
    )
  }


  const isOwner = Boolean(currentUser) && item.ownerId === currentUser.id

  const typeLabel = item.type === 'lost' ? 'Lost' : 'Found'


  return (
    <>
      <p><Link to="/">&larr; Back to the board</Link></p>

      <article className="item-details">
        <div className="item-labels">
          <span className={`status-label status-${item.type}`}>{typeLabel}</span>
          {item.returned && <span className="status-label status-returned">Returned</span>}
        </div>

        <h1>{item.title}</h1>

        <p>{item.description}</p>

        <dl className="details-list">
          <dt>Category</dt>
          <dd>{item.category}</dd>

          <dt>Location</dt>
          <dd>{item.location}</dd>

          <dt>Date {item.type === 'lost' ? 'lost' : 'found'}</dt>
          <dd>{item.itemDate}</dd>

          <dt>Contact</dt>
          <dd>{item.contact}</dd>

          <dt>Status</dt>
          <dd>{item.returned ? 'Returned to owner' : 'Still active'}</dd>
        </dl>

        {isOwner && (
          <div className="item-actions">
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
          </div>
        )}
      </article>
    </>
  )


}


export default ItemDetailsPage
