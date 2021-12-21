import {
  AuthService,
  ContentfulService,
  IAuthService,
  IContentfulService,
  IProductService,
  ProductService
} from 'services'
import AuthStore from './AuthStore'
import CartStore from './CartStore'

class RootStore {
  contentfulService: IContentfulService
  authService: IAuthService
  productService: IProductService
  authStore: AuthStore
  cartStore: CartStore

  constructor() {
    this.contentfulService = new ContentfulService()
    this.productService = new ProductService(this.contentfulService)
    this.authService = new AuthService(this.contentfulService)
    this.authStore = new AuthStore(this.authService)
    this.cartStore = new CartStore(this.authStore)
  }
}

const rootStore = new RootStore()

export default rootStore
