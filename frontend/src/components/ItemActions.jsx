import { useState } from 'react'


function ItemActions({ item, onDeleteItem, onReturnItem, onDeleted }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)


  async function runAction(action) {
    setBusy(true)
    setError(null)


    try {
      await action()
    } catch (actionError) {
      setError(actionError.message)
      setBusy(false)
    }
  }


  function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return
    }

    runAction(async () => {
      await onDeleteItem(item.id)

      if (onDeleted) {
        onDeleted()
      }
    })
  }


  function handleReturn() {
    runAction(async () => {
      await onReturnItem(item.id)
      setBusy(false)
    })
  }


  return (
    <>
      {error && <p className="field-error" role="alert">{error}</p>}

      <div className="item-actions">
        <button type="button" disabled={busy} onClick={handleDelete}>Delete</button>

        {!item.returned && (
          <button type="button" disabled={busy} onClick={handleReturn}>Mark as returned</button>
        )}
      </div>
    </>
  )
}


export default ItemActions
