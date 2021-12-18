import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { types, useInjection } from 'ioc'
import AuthStore from 'stores/AuthStore'
import { observer } from 'mobx-react-lite'

const PrivateOutlet = observer(() => {
  const authStore = useInjection<AuthStore>(types.AuthStore)

  return !!authStore.user ? <Outlet /> : <Navigate to="/login" />
})

export default PrivateOutlet
