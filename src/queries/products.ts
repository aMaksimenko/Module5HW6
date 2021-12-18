type productsQueryProps = {
  itemsPerPage: number
  page: number
}

export const getProducts = ({ page, itemsPerPage }: productsQueryProps) => `
 {
  productCollection(limit: ${itemsPerPage}, skip:${itemsPerPage * (page - 1)}) {
    total
    items {
      sys {
        id
      }
      title
      cover {
        title
        url
      }
    }
  }
}
`

export const getProductById = (id: string) => `
{
  product(id: "${id}") {
    sys {
      id
    }
    title
    cover {
      title
      url
    }
    genre
    imdb
    year
  }
}
`

export const getProductsByIds = (ids: string) => `
{
  productCollection(
    where: {
      sys: {
        id_in: ${ids}
      }
    }
  ) {
    items {
      sys {
        id
      }
      title
      cover {
        title
        url
      }
      genre
      imdb
      year
    }
  }
}
`

// 3bmTVWRwywlxPGwT1lSTFz
// 5xtkw88jLyan84AOVrK6CZ
