import './App.css'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar } from './components'
import {
  AddMovie,
  DeleteMovie,
  GetMovieAll,
  Home,
  EditMovie,
  GetMovieId,
  SearchMovie,
  Login
} from './pages'

function App () {
  const [accessToken, setAccessToken] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAccessToken(token)
    }
    // setAccessToken('TOKEN')
    const usr = localStorage.getItem('user')
    if (usr) {
      setUser(usr)
    }
  })
  return (
    <Router>
      <Navbar token={accessToken} />
      <Switch>
        <Route exact path='/'>
          <Home user={user} />
        </Route>
        <Route path='/add_movie'>
          <AddMovie />
        </Route>
        <Route path='/delete_movie'>
          <DeleteMovie />
        </Route>
        <Route path='/edit_movie'>
          <EditMovie />
        </Route>
        <Route path='/get_movie_all'>
          <GetMovieAll />
        </Route>
        <Route path='/get_movie_id'>
          <GetMovieId />
        </Route>
        <Route path='/search_movie'>
          <SearchMovie />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
