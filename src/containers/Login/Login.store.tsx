import { inject, injectable } from 'inversify'
import { makeAutoObservable } from 'mobx'
import { ChangeEvent, FormEvent } from 'react'
import { types } from 'ioc'
import { IAuthService } from 'services/AuthService'
import AuthStore from 'stores/AuthStore'
import CartStore from 'stores/CartStore'

@injectable()
export default class LoginStore {
  @inject(types.IAuthService)
  private readonly _authService!: IAuthService
  @inject(types.AuthStore)
  private readonly _authStore!: AuthStore
  @inject(types.CartStore)
  private readonly _cartStore!: CartStore
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
