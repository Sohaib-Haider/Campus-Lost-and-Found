import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import sampleItems from './data/sampleItems.js'
import PageLayout from './components/PageLayout.jsx'
import BoardPage from './pages/BoardPage.jsx'
import ItemDetailsPage from './pages/ItemDetailsPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import PostItemPage from './pages/PostItemPage.jsx'
import MyPostsPage from './pages/MyPostsPage.jsx'
import EditItemPage from './pages/EditItemPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'


function App() {
  const [items, setItems] = useState(sampleItems)
  const [currentUser, setCurrentUser] = useState(null)

  function handleLogout() {
    setCurrentUser(null)
  }

  return (
    <BrowserRouter>
      <PageLayout currentUser={currentUser} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<BoardPage items={items} />} />
          <Route path="/items/:id" element={<ItemDetailsPage items={items} />} />
          <Route path="/register" element={<RegisterPage onRegister={setCurrentUser} />} />
          <Route path="/login" element={<LoginPage onLogin={setCurrentUser} />} />
          <Route path="/post-item" element={<PostItemPage />} />
          <Route path="/my-posts" element={<MyPostsPage />} />
          <Route path="/items/:id/edit" element={<EditItemPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  )
}


export default App
