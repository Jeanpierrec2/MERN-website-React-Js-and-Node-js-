import React,{ useEffect,useState } from 'react'
import { Container, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'
import useStyles from './styles'

import Posts from '../Posts/Posts'
import Form from '../Form/Form'

function Home() {
  const [currentId, setCurrentId] = useState(null)
  const classes = useStyles()
  const dispatch = useDispatch()
  const [changeDelete,setChangeDelete] = useState(false)

  useEffect(() => {
    dispatch(getPosts())
    setChangeDelete(false)
  },[currentId,dispatch,setCurrentId,setChangeDelete,changeDelete])


  return (
    <Grow in>
        <Container>
          <Grid container className={classes.mainContainer} justify='space-between' alignItems='stretch' spacing={3} >
            <Grid item xs={12} sm={7} >
              <Posts setCurrentId={setCurrentId} setChangeDelete={setChangeDelete} changeDelete={changeDelete} />
            </Grid>
            <Grid item xs={12} sm={4} >
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
    </Grow>
  )
}

export default Home