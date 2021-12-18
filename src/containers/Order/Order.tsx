import React, { useEffect } from 'react'
import {
  Avatar,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper
} from '@mui/material'
import { types, useInjection } from 'ioc'
import DeleteIcon from '@mui/icons-material/Delete'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import OrderStore from './Order.store'

const Order = observer(() => {
  const orderStore = useInjection<OrderStore>(types.OrderStore)
  const navigate = useNavigate()

  useEffect(() => {
    orderStore.fetchOrder()
  }, [orderStore])

  if (!orderStore.products.length) {
    return null
  }

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper>
            <List>
              {orderStore.products?.map((item) => (
                  <ListItem
                    key={item.sys.id}
                    secondaryAction={
                      <IconButton edge="end" onClick={() => orderStore.removeItem(item.sys.id)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemButton onClick={() => navigate(`/landing/${item.sys.id}`)}>
                      <ListItemAvatar>
                        <Avatar src={item.cover.url} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                      />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
})

export default Order
