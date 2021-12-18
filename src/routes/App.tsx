import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateOutlet from './PrivateOutlet'
import Layout from 'containers/Layout'

const Home = React.lazy(() => import('pages/Home'))
const Landing = React.lazy(() => import('pages/Landing'))
const Login = React.lazy(() => import('pages/Login'))
const Order = React.lazy(() => import('pages/Order'))

const App = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/landing/:id" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order" element={<PrivateOutlet />}>
            <Route index element={<Order />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
