import React from 'react'
import {
  TextField,
  TableCell,
  TableRow,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  tableCellRoot: {
    borderBottom: 'none',
    padding: '8px',
  }
})

const CustomFormField = ({ label, ...more }) => {
  const classes = useStyles()

  return (
    <TableRow>
      <TableCell className={classes.tableCellRoot}>
        {label}
      </TableCell>
      <TableCell className={classes.tableCellRoot}>
        <TextField {...more} />
      </TableCell>
    </TableRow>
  )
}

export default CustomFormField