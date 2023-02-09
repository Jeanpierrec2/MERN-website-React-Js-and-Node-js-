import React,{ useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { GoogleLogin,GoogleOAuthProvider } from '@react-oauth/google' 
import { useDispatch } from 'react-redux'
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'

import useStyles from './styles'
import Input from './Input'
import Icon from './Icon'

function Auth() {

  const initialState = {
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:''
  }

  const [isSignUp,setIsSignUp] = useState(false)
  const [showPassword,setShowPassword] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const classes = useStyles()
  
  const handleSubmit = (e) => {
    e.preventDefault()

    if (isSignUp) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const switchMode = () => {
    setIsSignUp((prev) => !prev)
    setShowPassword(false)
  }

  const googleSuccess = async (res) => {
    const token = res.credential
    const profileObj = jwt_decode(token)

    try {
      dispatch({ type:'AUTH',data:{ token,profileObj } })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const googleError = (error) => {
    console.log(error)
  }

  return (
    <GoogleOAuthProvider clientId='691731489401-n42egdjunpq1s7ea1piire5l5f4t30jc.apps.googleusercontent.com' >
      <Container component="main" maxWidth="xs" >
        <Paper className={classes.paper} elevation={3} >
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
          <form className={classes.form} onSubmit={handleSubmit} >
            <Grid container spacing={2} >
              {isSignUp && (
                  <>
                      <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                      <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                  </>
                )}
              <Input name='email' label='Email adderess' handleChange={handleChange} type='email' />
              <Input name='password' label='password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
              { isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' /> }
            </Grid>
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            <GoogleLogin
              onSuccess={googleSuccess}
              onError={googleError}
            />;
            <Grid container justify='flex-end' >
                <Button onClick={switchMode}>
                  { isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
                </Button>
            </Grid>
          </form>
        </Paper>
      </Container>
    </GoogleOAuthProvider>
  )
}

export default Auth