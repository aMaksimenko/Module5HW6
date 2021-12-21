import { IContentfulService } from 'services/ContentfulService'
import { getUserById, login } from 'queries/auth'

type getItemsByPageProps = {
  email: string
  password: string
}

export interface IAuthService {
  login: ({ email, password }: getItemsByPageProps) => Promise<any>
  getUserById: (id: string) => Promise<any>
}

export default class AuthService implements IAuthService {
  private readonly _contentfulService!: IContentfulService

  constructor(contentfulService: IContentfulService) {
    this._contentfulService = contentfulService
  }

  public readonly login = ({ email, password }: getItemsByPageProps) => this._contentfulService.sendAsync({
    query: login({ email, password })
  })

  public readonly getUserById = (id: string) => this._contentfulService.sendAsync({
    query: getUserById(id)
  })
}


