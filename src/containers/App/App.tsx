import React, { useEffect } from 'react'
import AppRoutes from 'routes/App'
import rootStore from 'stores'
import { observer } from 'mobx-react-lite'

const App = observer(() => {
  const { authStore, cartStore } = rootStore

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
})

export default App
