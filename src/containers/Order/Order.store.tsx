import { makeAutoObservable } from 'mobx'
import { IProductService } from 'services/ProductService'
import CartStore from 'stores/CartStore'
import { Product } from 'models/Product'
import rootStore from 'stores'

export default class OrderStore {
  private readonly _cartStore: CartStore = rootStore.cartStore
  private readonly _productService: IProductService = rootStore.productService
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
