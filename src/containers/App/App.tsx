import React, { useEffect } from 'react'
import AppRoutes from 'routes/App'
import { types, useInjection } from 'ioc'
import AuthStore from 'stores/AuthStore'
import CartStore from 'stores/CartStore'

const App = () => {
  const authStore = useInjection<AuthStore>(types.AuthStore)
  const cartStore = useInjection<CartStore>(types.CartStore)

  useEffect(() => {
    const initApp = async () => {
      await authStore.getUserById()
      cartStore.restoreOrderFromStorage()
    }
    initApp()
  }, [authStore, cartStore])

  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
