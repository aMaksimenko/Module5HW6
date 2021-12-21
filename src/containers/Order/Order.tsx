import React, { useEffect, useMemo } from 'react'
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
import DeleteIcon from '@mui/icons-material/Delete'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import OrderStore from './Order.store'

const Order = observer(() => {
  const store = useMemo(() => new OrderStore(), [])
  const navigate = useNavigate()

  useEffect(() => {
    store.fetchOrder()
  }, [store])

  if (!store.products.length) {
    return null
  }

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper>
            <List>
              {store.products?.map((item) => (
                  <ListItem
                    key={item.sys.id}
                    secondaryAction={
                      <IconButton edge="end" onClick={() => store.removeItem(item.sys.id)}>
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
