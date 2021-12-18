import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { types, useInjection } from 'ioc'
import ProductStore from './Product.store'
import { observer } from 'mobx-react-lite'
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import GenreList from 'components/GenreList'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import CartStore from 'stores/CartStore'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline'

const Product = observer(() => {
  const params = useParams()
  const store = useInjection<ProductStore>(types.ProductStore)
  const cartStore = useInjection<CartStore>(types.CartStore)

  useEffect(() => {
    if (params.id) {
      store.getProductAsync(params.id)
    }
  }, [params, store])

  if (!store.product) {
    return null
  }

  const { title, cover, imdb, year, genre, sys } = store.product
  const isAdded = cartStore.orderIds.has(sys.id)

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <img src={cover.url} alt={cover.title} style={{ width: '100%' }} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h4" fontWeight={700} mb={6}>
            {title}
          </Typography>
          <Stack spacing={1} alignItems="flex-start" mb={4}>
            <Box>IMDB: <strong>{imdb}</strong></Box>
            <Box>Year: <strong>{year}</strong></Box>
            <Box>
              Genre: <GenreList items={genre} />
            </Box>
          </Stack>
          <Button
            variant="outlined"
            startIcon={isAdded ? <DoneOutlineIcon /> : <AddShoppingCartIcon />}
            onClick={() => cartStore.addItem(sys.id)}
            disabled={isAdded}
          >
            {isAdded ? 'In cart ' : 'Buy'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
})

export default Product
