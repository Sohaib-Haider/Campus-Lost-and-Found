import ItemCard from '../components/ItemCard.jsx'


function BoardPage({ items }) {
  const activeItems = items
    .filter((item) => !item.returned)
    .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt))

  return (
    <>
      <h1>Item Board</h1>

      <div className="item-grid">
        {activeItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </>
  )
}

export default BoardPage
