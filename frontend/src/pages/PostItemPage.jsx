import ItemForm from '../components/ItemForm.jsx'


function PostItemPage({ onAddItem }) {


  function handleNewItem(formData) {
    onAddItem(formData)
  }


  return (
    <ItemForm onSave={handleNewItem} />
  )


}


export default PostItemPage
