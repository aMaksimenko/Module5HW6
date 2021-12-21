import { makeAutoObservable } from 'mobx'
import { ChangeEvent, FormEvent } from 'react'
import { IAuthService } from 'services/AuthService'
import rootStore, { AuthStore, CartStore } from 'stores'

export default class LoginStore {
  private readonly _authService: IAuthService = rootStore.authService
  private readonly _authStore: AuthStore = rootStore.authStore
  private readonly _cartStore: CartStore = rootStore.cartStore
  public state: { [key: string]: string } = { email: '', password: '' }

  constructor() {
    makeAutoObservable(this)
  }

  public readonly onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    this.state[ev.target.name] = ev.target.value
  }

  public readonly onSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    const res = await this._authService.login({
      email: this.state.email,
      password: this.state.password
    })
    const data = res.data.userCollection.items[0]

    if (!!data) {
      this._authStore.setUser(data)
      this._cartStore.restoreOrderFromStorage()
    } else {

    }
  }

  public readonly fillWithData = (data: { email: string, password: string }) => {
    this.state = data
  }
}
