import { Container } from 'inversify'
import types from './types'
import ContentfulService, { IContentfulService } from 'services/ContentfulService'
import ProductService, { IProductService } from 'services/ProductService'
import AuthService, { IAuthService } from 'services/AuthService'
import ProductsStore from 'containers/Products/Products.store'
import ProductStore from 'containers/Product/Product.store'
import LoginStore from 'containers/Login/Login.store'
import AuthStore from 'stores/AuthStore'
import CartStore from 'stores/CartStore'
import OrderStore from 'containers/Order/Order.store'

const container = new Container()

container.bind<IContentfulService>(types.IContentfulService).to(ContentfulService).inSingletonScope()
container.bind<IProductService>(types.IProductService).to(ProductService).inSingletonScope()
container.bind<IAuthService>(types.IAuthService).to(AuthService).inSingletonScope()
container.bind<AuthStore>(types.AuthStore).to(AuthStore).inSingletonScope()
container.bind<CartStore>(types.CartStore).to(CartStore).inSingletonScope()
container.bind<ProductsStore>(types.ProductsStore).to(ProductsStore).inTransientScope()
container.bind<ProductStore>(types.ProductStore).to(ProductStore).inTransientScope()
container.bind<LoginStore>(types.LoginStore).to(LoginStore).inTransientScope()
container.bind<OrderStore>(types.OrderStore).to(OrderStore).inTransientScope()

export default container
