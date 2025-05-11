import Header from './components/Header'
import Body from './components/Body'
import { createBrowserRouter } from 'react-router-dom'
import About from './components/About'
import Contact from './components/Contact'
import Error from './components/Error'


function App() {

  return (
    <div className='app'>
      <Header />
      <Body />
    </div>
  )
}

const appRouter =
  createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <Error />
    },
    {
      path: "/about",
      element: <About />
    },
    {
      path: "/contact",
      element: <Contact />
    }
  ])

export default appRouter
