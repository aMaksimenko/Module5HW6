import React, { useEffect } from 'react'
import { types, useInjection } from 'ioc'
import ProductsStore from './Products.store'
import { observer } from 'mobx-react-lite'
import ProductCard from './components/ProductCard'
import { Box, Container, Grid, Pagination } from '@mui/material'

const Products = observer(() => {
  const store = useInjection<ProductsStore>(types.ProductsStore)

  useEffect(() => {
    store.getProductsAsync()
  }, [store, store.page])

  return (
    <Container>
      <Grid container spacing={4} justifyContent="center" mb={4}>
        {store.products.map((item) => (
          <Grid key={item.sys.id} item lg={2} md={3} xs={6}>
            <ProductCard {...item} />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Pagination count={store.pageCount} page={store.page} onChange={store.setPage} />
      </Box>
    </Container>
  )
})

export default Products
