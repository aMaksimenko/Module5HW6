import * as React from 'react'
import { FC } from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { Button, CardActionArea, CardActions } from '@mui/material'
import { Product as ProductType } from 'models/Product'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { useNavigate } from 'react-router-dom'
import { types, useInjection } from 'ioc'
import CartStore from 'stores/CartStore'
import { observer } from 'mobx-react-lite'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline'

const ProductCard: FC<ProductCardProps> = observer(({ cover, sys }) => {
  const navigate = useNavigate()
  const cartStore = useInjection<CartStore>(types.CartStore)
  const isAdded = cartStore.orderIds.has(sys.id)

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/landing/${sys.id}`)}>
        <CardMedia
          component="img"
          height="300"
          image={cover.url}
          alt={cover.title}
        />
      </CardActionArea>
      <CardActions disableSpacing>
        <Button
          fullWidth
          size="small"
          variant="outlined"
          startIcon={isAdded ? <DoneOutlineIcon /> : <AddShoppingCartIcon />}
          onClick={() => cartStore.addItem(sys.id)}
          disabled={isAdded}
        >
          {isAdded ? 'In cart ' : 'Buy'}
        </Button>
      </CardActions>
    </Card>
  )
})

type ProductCardProps = ProductType & { onClick: () => void }

export default ProductCard
