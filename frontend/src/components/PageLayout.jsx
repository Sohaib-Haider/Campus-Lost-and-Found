import Header from './Header.jsx'


function PageLayout({ children, currentUser, onLogout }) {
  return (
    <>
      <Header currentUser={currentUser} onLogout={onLogout} />

      <main className="page-content">{children}</main>
    </>
  )
}

export default PageLayout
