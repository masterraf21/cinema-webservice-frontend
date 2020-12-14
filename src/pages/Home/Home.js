import React from 'react'
import PropTypes from 'prop-types'
import styles from './Home.module.scss'
const Home = ({ user }) => {
  const api = process.env.REACT_APP_API_URL

  return (
    <div className={styles.container}>
      Hello {user ? user.name : 'Anonymous'}
      {api}
    </div>
  )
}

Home.defaultProps = {}

Home.propTypes = {
  user: PropTypes.object
}

export default Home
