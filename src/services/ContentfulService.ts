type sendAsyncProps = {
  query: string
}

export interface IContentfulService {
  sendAsync: ({ query }: sendAsyncProps) => Promise<any>
}

export default class ContentfulService implements IContentfulService {
  private readonly token = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
  private readonly spaceId = process.env.REACT_APP_CONTENTFUL_SPACE_ID
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
        Authorization: `Bearer ${this.token}`
      },
      body: JSON.stringify({ query })
    }
    return await fetch(`${this.baseUrl}${this.spaceId}`, requestOptions).then(this.handleResponse)
  }
}



