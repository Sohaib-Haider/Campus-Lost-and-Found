import { useEffect, useState, useRef } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { request } from './api/api.js'
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


function App() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [boardItems, setBoardItems] = useState([])
  const [myItems, setMyItems] = useState([])
  const [item, setItem] = useState(null)
  const [itemLoading, setItemLoading] = useState(false)
  const [itemError, setItemError] = useState(null)
  const boardRequestId = useRef(0)


  useEffect(() => {
    async function loadSession() {
      const token = localStorage.getItem('lostFoundToken')


      if (token) {
        try {
          const data = await request('/api/auth/me', { token })


          setCurrentUser(data.user)
        } catch {
          localStorage.removeItem('lostFoundToken')
        }
      }


      setLoading(false)
    }


    loadSession()
  }, [])


  async function handleRegister(formData) {
    const data = await request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(formData),
    })


    localStorage.setItem('lostFoundToken', data.token)
    setCurrentUser(data.user)
    navigate('/')
  }


  async function handleLogin(formData) {
    const data = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(formData),
    })


    localStorage.setItem('lostFoundToken', data.token)
    setCurrentUser(data.user)
    navigate('/')
  }


  function handleLogout() {
    localStorage.removeItem('lostFoundToken')
    setCurrentUser(null)
    setBoardItems([])
    setMyItems([])
    setItem(null)
    navigate('/login')
  }


  async function loadBoardItems(filters) {
    boardRequestId.current += 1
    const myRequestId = boardRequestId.current


    const params = new URLSearchParams()

    if (filters.searchText) {
      params.append('search', filters.searchText)
    }

    if (filters.category) {
      params.append('category', filters.category)
    }

    if (filters.type) {
      params.append('type', filters.type)
    }

    if (filters.location) {
      params.append('location', filters.location)
    }


    const data = await request(`/api/items?${params}`)

    if (myRequestId === boardRequestId.current) {
      setBoardItems(data.items)
    }
  }


  async function loadMyItems() {
    const token = localStorage.getItem('lostFoundToken')
    const data = await request('/api/items/mine', { token })


    setMyItems(data.items)
  }


  async function loadItem(id) {
    setItemLoading(true)
    setItemError(null)
    setItem(null)


    try {
      const data = await request(`/api/items/${id}`)


      setItem(data.item)
    } catch (error) {
      if (error.status === 404) {
        setItemError('Item not found.')
      } else {
        setItemError('Could not load the item right now.')
      }
    }


    setItemLoading(false)
  }


  async function handleAddItem(formData) {
    const token = localStorage.getItem('lostFoundToken')
    const data = await request('/api/items', {
      method: 'POST',
      body: JSON.stringify(formData),
      token,
    })


    await loadBoardItems()
    navigate(`/items/${data.item.id}`)
  }


  async function handleEditItem(updatedItem, id) {
    const token = localStorage.getItem('lostFoundToken')
    await request(`/api/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedItem),
      token,
    })


    await loadMyItems()
    navigate(`/items/${id}`)
  }


  async function handleDeleteItem(id) {
    const token = localStorage.getItem('lostFoundToken')
    await request(`/api/items/${id}`, {
      method: 'DELETE',
      token,
    })


    setBoardItems(boardItems.filter((currentItem) => currentItem.id !== id))
    setMyItems(myItems.filter((currentItem) => currentItem.id !== id))
    navigate('/')
  }


  async function handleReturnItem(id) {
    const token = localStorage.getItem('lostFoundToken')
    await request(`/api/items/${id}/returned`, {
      method: 'PATCH',
      token,
    })


    setBoardItems(boardItems.map((currentItem) => currentItem.id === id ? { ...currentItem, returned: true } : currentItem))
    setMyItems(myItems.map((currentItem) => currentItem.id === id ? { ...currentItem, returned: true } : currentItem))
  }


  if (loading) {
    return (
      <>
        <PageLayout currentUser={null} onLogout={handleLogout} />
        <p className="empty-message" role="status">Checking your session...</p>
      </>
    )
  }


  return (
    <BrowserRouter>
      <PageLayout currentUser={currentUser} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<BoardPage items={boardItems} onLoad={loadBoardItems} />} />
          <Route path="/items/:id" element={<ItemDetailsPage item={item} itemLoading={itemLoading} itemError={itemError} loadItem={loadItem} currentUser={currentUser} onDeleteItem={handleDeleteItem} onReturnItem={handleReturnItem} />} />
          <Route path="/register" element={<RegisterPage onRegister={handleRegister} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/post-item" element={<ProtectedRoute currentUser={currentUser}><PostItemPage onAddItem={handleAddItem} /></ProtectedRoute>} />
          <Route path="/my-posts" element={<ProtectedRoute currentUser={currentUser}><MyPostsPage items={myItems} onLoad={loadMyItems} currentUser={currentUser} onDeleteItem={handleDeleteItem} onReturnItem={handleReturnItem} /></ProtectedRoute>} />
          <Route path="/items/:id/edit" element={<ProtectedRoute currentUser={currentUser}><EditItemPage item={item} itemLoading={itemLoading} currentUser={currentUser} onEditItem={handleEditItem} loadItem={loadItem} /></ProtectedRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  )


}


export default App
