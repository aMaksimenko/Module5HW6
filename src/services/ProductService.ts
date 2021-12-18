import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { types } from 'ioc'
import { IContentfulService } from 'services/ContentfulService'
import { getProductById, getProducts, getProductsByIds } from 'queries/products'

type getItemsByPageProps = {
  page: number
  itemsPerPage: number
}

export interface IProductService {
  getItemsByPage: ({ page, itemsPerPage }: getItemsByPageProps) => Promise<any>
  getItemById: (id: string) => Promise<any>
  getItemsByIds: (ids: string[]) => Promise<any>
}

@injectable()
export default class ProductService implements IProductService {
  @inject(types.IContentfulService)
  private readonly _contentfulService!: IContentfulService

  public readonly getItemsByPage = ({ page, itemsPerPage }: getItemsByPageProps) => this._contentfulService.sendAsync({
    query: getProducts({ page, itemsPerPage })
  })

  public readonly getItemById = (id: string) => this._contentfulService.sendAsync({
    query: getProductById(id)
  })

  public readonly getItemsByIds = (ids: string[]) => this._contentfulService.sendAsync({
    query: getProductsByIds(JSON.stringify(ids))
  })
}


