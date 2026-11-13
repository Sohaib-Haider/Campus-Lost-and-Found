import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ItemForm from '../components/ItemForm.jsx'


function EditItemPage({ item, itemLoading, currentUser, onEditItem, loadItem }) {
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


  if (!currentUser || !item) {
    return (
      <>
        <p><Link to="/">&larr; Back to the board</Link></p>
        <h1>Item not found</h1>
        <p>We could not find an item with that ID.</p>
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


  function handleSave(updatedItem) {
    onEditItem(updatedItem, id)
  }


  return (
    <ItemForm item={item} onSave={handleSave} />
  )


}


export default EditItemPage
