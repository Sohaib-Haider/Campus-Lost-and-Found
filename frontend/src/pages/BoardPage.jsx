import { useState } from 'react'
import ItemCard from '../components/ItemCard.jsx'
import ItemFilters from '../components/ItemFilters.jsx'


const emptyFilters = { searchText: '', category: '', type: '', location: '' }


function BoardPage({ items }) {
  const [filters, setFilters] = useState(emptyFilters)

  const searchText = filters.searchText.trim().toLowerCase()

  const activeItems = items
    .filter((item) => !item.returned)
    .filter((item) => !filters.category || item.category === filters.category)
    .filter((item) => !filters.type || item.type === filters.type)
    .filter((item) => !filters.location || item.location === filters.location)
    .filter((item) => (
      item.title.toLowerCase().includes(searchText) ||
      item.description.toLowerCase().includes(searchText)
    ))
    .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt))

  return (
    <>
      <h1>Item Board</h1>

      <ItemFilters
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters(emptyFilters)}
      />

      {activeItems.length === 0 ? (
        <p className="empty-message" role="status">No items match your search. Try changing or clearing the filters.</p>
      ) : (
        <div className="item-grid">
          {activeItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  )
}

export default BoardPage
