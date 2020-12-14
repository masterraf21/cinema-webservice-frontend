import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './Home.module.scss'
const Home = ({ user }) => {
  const api = process.env.REACT_APP_API_URL
  const [name, setName] = useState('')

  useEffect(() => {
    if (user) {
      setName(user.name)
    } else {
      setName('Anonymous')
    }
  })
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>Hello Stranger</div>
      </div>
    </>
  )
}

Home.defaultProps = {}

Home.propTypes = {
  user: PropTypes.object
}

export default Home
