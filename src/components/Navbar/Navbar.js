import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../index'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'

const Navbar = ({ token }) => {
  const handleLogout = () => {
    alert('Logout')
  }
  const routes = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Add Movie',
      path: '/add_movie'
    },
    {
      name: 'Delete Movie',
      path: '/delete_movie'
    },
    {
      name: 'Edit Movie',
      path: '/edit_movie'
    },
    {
      name: 'Get All Movie',
      path: '/get_movie_all'
    },
    {
      name: 'Get Movie by Id',
      path: '/get_movie_id'
    },
    {
      name: 'Search Movie',
      path: '/search_movie'
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.title}>Cinema</div>
      <div className={styles.linkContainer}>
        {token ? (
          <Fragment>
            {routes.map((route, index) => (
              <Link key={index} to={route.path} className={styles.link}>
                {route.name}
              </Link>
            ))}
            <Button
              className={styles.logout}
              bgColor='red'
              textColor='white'
              onClick={() => handleLogout()}
              title='Log Out'
            />
          </Fragment>
        ) : (
          <Fragment>
            {routes.map((route, index) => (
              <Link key={index} to={route.path} className={styles.link}>
                {route.name}
              </Link>
            ))}
            <Link key={routes.length} to={'/login'} className={styles.login}>
              Log In
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  )
}

Navbar.propTypes = {
  token: PropTypes.string
}
export default Navbar
