import { Link } from 'react-router-dom'


function ItemCard({ item }) {
  const typeLabel = item.type === 'lost' ? 'Lost' : 'Found'

  return (
    <article className="item-card">
      <span className={`status-label status-${item.type}`}>{typeLabel}</span>

      <h2>{item.title}</h2>

      <p className="item-meta">{item.category} &middot; {item.location}</p>
      <p className="item-meta">{item.itemDate}</p>

      <Link to={`/items/${item.id}`}>View details</Link>
    </article>
  )
}

export default ItemCard
