import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import rootStore from 'stores'

const PrivateOutlet = observer(() => {
  const { authStore } = rootStore

  return !!authStore.user ? <Outlet /> : <Navigate to="/login" />
})

export default PrivateOutlet
