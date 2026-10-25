import Header from './Header.jsx'


function PageLayout({ children }) {
  return (
    <>
      <Header />

      <main className="page-content">{children}</main>
    </>
  )
}

export default PageLayout
