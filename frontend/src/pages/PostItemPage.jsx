import ItemForm from '../components/ItemForm.jsx'


function PostItemPage() {
  function handleNewItem(item) {}

  return (
    <ItemForm onSave={handleNewItem} />
  )
}

export default PostItemPage
