import ItemForm from '../components/ItemForm.jsx'


function PostItemPage({ onAddItem }) {
  return (
    <ItemForm onSave={onAddItem} />
  )
}


export default PostItemPage
