import { Link, useParams } from 'react-router-dom'


function ItemDetailsPage({ items }) {
  const { id } = useParams()
  const item = items.find((currentItem) => currentItem.id === id)

  if (!item) {
    return (
      <>
        <h1>Item not found</h1>
        <p>We could not find an item with that ID.</p>
        <Link to="/">Back to the board</Link>
      </>
    )
  }

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
      </article>
    </>
  )
}

export default ItemDetailsPage
