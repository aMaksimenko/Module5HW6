import { inject, injectable } from 'inversify'
import { makeAutoObservable } from 'mobx'
import { User } from 'models/User'
import { IAuthService } from 'services/AuthService'
import { types } from 'ioc'

@injectable()
export default class AuthStore {
  @inject(types.IAuthService)
  private readonly _authService!: IAuthService
  private readonly _storageField: string = "user_id"
  public user: User | null = null

  constructor() {
    makeAutoObservable(this)
  }

  public readonly getUserById = async () => {
    const userId = localStorage.getItem(this._storageField)
    if (!userId) {
      return null
    }
    const res = await this._authService.getUserById(userId)
    const data = res.data.user

    if (!!data) {
      this.setUser(data)
    }
  }

  public readonly setUser = (val: User) => {
    this.user = val
    localStorage.setItem(this._storageField, val.sys.id)
  }

  public readonly removeUser = () => {
    this.user = null
    localStorage.removeItem(this._storageField)
  }
}
