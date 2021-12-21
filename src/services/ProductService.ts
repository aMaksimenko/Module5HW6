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

export default class ProductService implements IProductService {
  private readonly _contentfulService!: IContentfulService

  constructor(contentfulService: IContentfulService) {
    this._contentfulService = contentfulService
  }

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


