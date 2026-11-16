import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ItemForm from '../components/ItemForm.jsx'


function EditItemPage({ item, itemLoading, itemError, currentUser, onEditItem, loadItem }) {
  const { id } = useParams()


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


  if (item.ownerId !== currentUser.id) {
    return (
      <>
        <p><Link to="/">&larr; Back to the board</Link></p>
        <h1>Not your item</h1>
        <p>You can only edit your own posts.</p>
        <Link to="/">Back to the board</Link>
      </>
    )
  }


  return (
    <ItemForm item={item} onSave={(updatedItem) => onEditItem(updatedItem, id)} />
  )


}


export default EditItemPage
