import { useParams, Link, useNavigate } from 'react-router-dom'
import ItemForm from '../components/ItemForm.jsx'


function EditItemPage({ items, currentUser, onEditItem }) {
  const { id } = useParams()
  const navigate = useNavigate()


  const item = items.find((currentItem) => currentItem.id === id)


  if (!item) {
    return (
      <>
        <h1>Item not found</h1>
        <p>We could not find an item with that ID.</p>
        <p><Link to="/">Back to the board</Link></p>
      </>
    )
  }


  if (item.ownerId !== currentUser.id) {
    return (
      <>
        <h1>Not your item</h1>
        <p>You can only edit your own posts.</p>
        <p><Link to="/">Back to the board</Link></p>
      </>
    )
  }


  function handleSave(updatedItem) {
    const savedItem = {
      ...updatedItem,
      id: item.id,
      ownerId: item.ownerId,
      createdAt: item.createdAt,
      returned: item.returned,
    }

    onEditItem(savedItem)
    navigate(`/items/${item.id}`)
  }


  return (
    <ItemForm item={item} onSave={handleSave} />
  )
}

export default EditItemPage
