import { makeAutoObservable } from 'mobx'
import { inject, injectable } from 'inversify'
import { types } from 'ioc'
import AuthStore from 'stores/AuthStore'
import history from 'routes/history'

@injectable()
export default class CartStore {
  @inject(types.AuthStore)
  private readonly _authStore!: AuthStore
  private readonly _storageField: string = 'orders'
  public orderIds: Set<string> = new Set([])

  constructor() {
    makeAutoObservable(this)
  }

  private readonly getParsedStorage = () => {
    const storageVal = localStorage.getItem(this._storageField)
    if (!storageVal || !this._authStore.user) {
      return new Set([])
    }
    return JSON.parse(storageVal)
  }

  private readonly setStored = (data: Set<string>) => {
    const stored = this.getParsedStorage()
    const nextData = {
      ...stored,
      [this._authStore.user!.sys.id]: Array.from(data)
    }
    localStorage.setItem(this._storageField, JSON.stringify(nextData))
  }

  private readonly getStored = (): Set<string> => {
    const stored = this.getParsedStorage()
    return new Set(stored[this._authStore.user!.sys.id] || [])
  }

  private readonly setOrderIds = (orderIds: Set<string>) => {
    this.orderIds = orderIds
    this.setStored(orderIds)
  }

  public readonly restoreOrderFromStorage = () => {
    if (!this._authStore.user) {
      return null
    }
    const orderIds = this.getStored()
    if (orderIds.size) {
      this.setOrderIds(orderIds)
    }
  }

  public readonly addItem = (productId: string) => {
    if (!this._authStore.user) {
      history.push('/login')
      return null
    }
    const orderIds = this.getStored()

    orderIds.add(productId)
    this.setOrderIds(orderIds)
  }

  public readonly removeItem = (productId: string) => {
    if (!this._authStore.user) {
      history.push('/login')
      return null
    }
    const orderIds = this.getStored()

    orderIds.delete(productId)
    this.setOrderIds(orderIds)
  }

  public readonly clear = () => {
    this.orderIds = new Set([])
  }
}
