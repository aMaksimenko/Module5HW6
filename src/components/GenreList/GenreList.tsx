import React from 'react'
import { Chip } from '@mui/material'

const GenreList = ({ items }: { items: string[] }) => {
  return (
    <>
      {items.map((item, index) => (
        <Chip variant="outlined" key={index} label={item} size="small" sx={{ mr: 1 }} />
      ))}
    </>
  )
}

export default GenreList
