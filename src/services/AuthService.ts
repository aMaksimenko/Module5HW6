import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { types } from 'ioc'
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

@injectable()
export default class AuthService implements IAuthService {
  @inject(types.IContentfulService)
  private readonly _contentfulService!: IContentfulService

  public readonly login = ({ email, password }: getItemsByPageProps) => this._contentfulService.sendAsync({
    query: login({ email, password })
  })

  public readonly getUserById = (id: string) => this._contentfulService.sendAsync({
    query: getUserById(id)
  })
}


