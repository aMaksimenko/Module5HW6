import { makeAutoObservable } from 'mobx'
import { IProductService } from 'services/ProductService'
import React from 'react'
import rootStore from 'stores'

export default class ProductsStore {
  private readonly _productService: IProductService = rootStore.productService
  private readonly itemsPerPage: number = 6
  public products: any[] = []
  public page: number = 1
  public pageCount: number = 0

  constructor() {
    makeAutoObservable(this)
  }

  getProductsAsync = async () => {
    try {
      const res = await this._productService.getItemsByPage({
        page: this.page,
        itemsPerPage: this.itemsPerPage
      })

      this.setProducts(res.data.productCollection.items)
      this.setPageCount(Math.ceil(res.data.productCollection.total / this.itemsPerPage))
    } catch (e) {
      console.error(e)
    }
  }

  setProducts = (data: []) => {
    this.products = data
  }

  setPage = (event: React.ChangeEvent<unknown>, val: number) => {
    this.page = val
  }

  setPageCount = (val: number) => {
    this.pageCount = val
  }
}
