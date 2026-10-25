import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BoardPage from './pages/BoardPage.jsx'
import ItemDetailsPage from './pages/ItemDetailsPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import PostItemPage from './pages/PostItemPage.jsx'
import MyPostsPage from './pages/MyPostsPage.jsx'
import EditItemPage from './pages/EditItemPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'


function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<BoardPage />} />
          <Route path="/items/:id" element={<ItemDetailsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/post-item" element={<PostItemPage />} />
          <Route path="/my-posts" element={<MyPostsPage />} />
          <Route path="/items/:id/edit" element={<EditItemPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}


export default App
