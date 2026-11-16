import { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard.jsx'
import ItemFilters from '../components/ItemFilters.jsx'


const emptyFilters = { searchText: '', category: '', type: '', location: '' }


function BoardPage({ items, onLoad }) {
  const [filters, setFilters] = useState(emptyFilters)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(null)


  useEffect(() => {
    onLoad(filters)
      .then(() => {
        setError(null)
        setLoaded(true)
      })
      .catch(() => setError('Could not load items right now. Please try again.'))
  }, [filters, onLoad])


  return (
    <>
      <h1>Item Board</h1>


      <ItemFilters
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters(emptyFilters)}
      />


      {error && <p className="field-error" role="alert">{error}</p>}


      {!loaded && !error ? (
        <p className="empty-message" role="status">Loading items...</p>
      ) : loaded && items.length === 0 ? (
        <p className="empty-message" role="status">No items match your search. Try changing or clearing the filters.</p>
      ) : (
        <div className="item-grid">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  )


}


export default BoardPage
