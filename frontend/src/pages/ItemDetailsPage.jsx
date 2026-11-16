import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ItemActions from '../components/ItemActions.jsx'


function ItemDetailsPage({ item, itemLoading, itemError, loadItem, currentUser, onDeleteItem, onReturnItem }) {
  const { id } = useParams()
  const navigate = useNavigate()


  useEffect(() => {
    loadItem(id)
  }, [id, loadItem])


  if (itemLoading || (!itemError && (!item || item.id !== id))) {
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
        <h1>Item unavailable</h1>
        <p>{itemError}</p>
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
          <ItemActions item={item} onDeleteItem={onDeleteItem} onReturnItem={onReturnItem} onDeleted={() => navigate('/')} />
        )}
      </article>
    </>
  )


}


export default ItemDetailsPage
