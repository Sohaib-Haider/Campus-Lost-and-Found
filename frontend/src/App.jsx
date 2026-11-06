import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import sampleItems from './data/sampleItems.js'
import PageLayout from './components/PageLayout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import BoardPage from './pages/BoardPage.jsx'
import ItemDetailsPage from './pages/ItemDetailsPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import PostItemPage from './pages/PostItemPage.jsx'
import MyPostsPage from './pages/MyPostsPage.jsx'
import EditItemPage from './pages/EditItemPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function readSaved(key, fallback) {
  try {
    const savedText = localStorage.getItem(key)

    if (savedText === null) {
      return fallback
    }

    return JSON.parse(savedText)
  } catch {
    return fallback
  }
}

function App() {
  const [items, setItems] = useState(() => {
    const savedItems = readSaved('lostFoundItems', sampleItems)

    return Array.isArray(savedItems) ? savedItems : sampleItems
  })
  const [currentUser, setCurrentUser] = useState(() => readSaved('lostFoundUser', null))

  useEffect(() => {
    try {
      localStorage.setItem('lostFoundItems', JSON.stringify(items))
    } catch {
      return
    }
  }, [items])

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('lostFoundUser', JSON.stringify({
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
        }))
      } else {
        localStorage.removeItem('lostFoundUser')
      }
    } catch {
      return
    }
  }, [currentUser])

  function handleAddItem(newItem) {
    const itemWithOwner = {
      ...newItem,
      ownerId: currentUser.id,
    }

    setItems((currentItems) => [itemWithOwner, ...currentItems])
  }

  function handleEditItem(updatedItem) {
    const item = items.find((currentItem) => currentItem.id === updatedItem.id)

    if (!item || item.ownerId !== currentUser.id) {
      return
    }

    setItems((currentItems) =>
      currentItems.map((currentItem) =>
        currentItem.id === updatedItem.id ? updatedItem : currentItem
      )
    )
  }

  function handleDeleteItem(id) {
    const item = items.find((currentItem) => currentItem.id === id)

    if (!item || item.ownerId !== currentUser.id) {
      return
    }

    setItems((currentItems) => currentItems.filter((currentItem) => currentItem.id !== id))
  }

  function handleReturnItem(id) {
    const item = items.find((currentItem) => currentItem.id === id)

    if (!item || item.ownerId !== currentUser.id || item.returned) {
      return
    }

    setItems((currentItems) =>
      currentItems.map((currentItem) =>
        currentItem.id === id ? { ...currentItem, returned: true } : currentItem
      )
    )
  }

  function handleLogout() {
    setCurrentUser(null)
  }

  return (
    <BrowserRouter>
      <PageLayout currentUser={currentUser} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<BoardPage items={items} />} />
          <Route path="/items/:id" element={<ItemDetailsPage items={items} currentUser={currentUser} onDeleteItem={handleDeleteItem} onReturnItem={handleReturnItem} />} />
          <Route path="/register" element={<RegisterPage onRegister={setCurrentUser} />} />
          <Route path="/login" element={<LoginPage onLogin={setCurrentUser} />} />
          <Route
            path="/post-item"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <PostItemPage currentUser={currentUser} onAddItem={handleAddItem} />
              </ProtectedRoute>
            }
          />
          <Route path="/my-posts"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <MyPostsPage items={items} currentUser={currentUser} onDeleteItem={handleDeleteItem} onReturnItem={handleReturnItem} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/items/:id/edit"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <EditItemPage items={items} currentUser={currentUser} onEditItem={handleEditItem} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  )
}

export default App
