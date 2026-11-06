import ItemForm from '../components/ItemForm.jsx'
import { useNavigate } from 'react-router-dom'


function PostItemPage({ currentUser, onAddItem }) {
  const navigate = useNavigate()


  function handleNewItem(item) {
    onAddItem(item)
    navigate(`/items/${item.id}`)
  }


  return (
    <ItemForm onSave={handleNewItem} />
  )
}

export default PostItemPage
