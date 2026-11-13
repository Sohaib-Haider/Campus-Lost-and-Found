import { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard.jsx'
import ItemFilters from '../components/ItemFilters.jsx'


const emptyFilters = { searchText: '', category: '', type: '', location: '' }


function BoardPage({ items, onLoad }) {
  const [filters, setFilters] = useState(emptyFilters)


  useEffect(() => {
    onLoad(filters)
  }, [filters, onLoad])


  return (
    <>
      <h1>Item Board</h1>


      <ItemFilters
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters(emptyFilters)}
      />


      {items.length === 0 ? (
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
