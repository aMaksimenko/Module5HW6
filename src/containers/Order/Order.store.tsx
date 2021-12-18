import { makeAutoObservable } from 'mobx'
import { inject, injectable } from 'inversify'
import { types } from 'ioc'
import { IProductService } from 'services/ProductService'
import CartStore from 'stores/CartStore'
import { Product } from 'models/Product'

@injectable()
export default class OrderStore {
  @inject(types.CartStore)
  private readonly _cartStore!: CartStore
  @inject(types.IProductService)
  private readonly _productService!: IProductService
  public products: Product[] = []

  constructor() {
    makeAutoObservable(this)
  }

  private readonly setProducts = (products: Product[]) => {
    this.products = products
  }

  public readonly fetchOrder = async () => {
    if (!this._cartStore.orderIds.size) {
      return null
    }
    try {
      const res = await this._productService.getItemsByIds(Array.from(this._cartStore.orderIds))
      const items = res.data.productCollection.items
      if (!!items.length) {
        this.setProducts(items)
      }
    } catch (e) {
      console.error(e)
    }
  }

  public readonly removeItem = (orderId: string) => {
    const indexToRemove = this.products.findIndex(p => p.sys.id === orderId)

    this.products.splice(indexToRemove, 1)
    this._cartStore.removeItem(orderId)
  }
}
