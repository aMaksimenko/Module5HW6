import { injectable } from 'inversify'

type sendAsyncProps = {
  query: string
}

export interface IContentfulService {
  sendAsync: ({ query }: sendAsyncProps) => Promise<any>
}

@injectable()
export default class ContentfulService implements IContentfulService {
  private readonly baseUrl = process.env.REACT_APP_CONTENTFUL_BASE_URL

  private readonly handleResponse = (response: Response) => {
    // if (!response.ok) {
    //   const message = await response.json()
    //   throw Error(message.error || 'Request error')
    // }
    return response.json()
  }

  public readonly sendAsync = async ({ query }: sendAsyncProps) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN}`
      },
      body: JSON.stringify({ query })
    }
    return await fetch(`${this.baseUrl}${process.env.REACT_APP_CONTENTFUL_SPACE_ID}`, requestOptions).then(this.handleResponse)
  }
}



