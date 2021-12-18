type loginProps = {
  email: string
  password: string
}

export const login = ({ email, password }: loginProps) => `
{
  userCollection(where: {AND: [{email: "${email}"}, {password: "${password}"}]}) {
    items {
      email
      firstName
      lastName
      sys {
        id
      }
    }
  }
}
`

export const getUserById = (id: string) => `
{
  user(id: "${id}") {
    email
    firstName
    lastName
    sys {
      id
    }
  }
}
`
