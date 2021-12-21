import { makeAutoObservable } from 'mobx'
import { IProductService } from 'services/ProductService'
import { Product } from 'models/Product'
import rootStore from 'stores'

export default class ProductsStore {
  private readonly _productService: IProductService = rootStore.productService
  public product: Product | null = null

  constructor() {
    makeAutoObservable(this)
  }

  getProductAsync = async (id: string) => {
    try {
      const res = await this._productService.getItemById(id)
      this.setProduct(res.data.product)
    } catch (e) {
      console.error(e)
    }
  }

  setProduct = (val: Product) => {
    this.product = val
  }
}
